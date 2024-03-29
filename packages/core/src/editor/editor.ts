import { Schema } from '@prosekit/pm/model'
import { EditorState, Plugin, type EditorStateConfig } from '@prosekit/pm/state'
import { EditorView, type DirectEditorProps } from '@prosekit/pm/view'

import { ProseKitError } from '../error'
import { defineDefaultState } from '../extensions/default-state'
import {
  updateExtension,
  type Converters,
  type Payloads,
} from '../facets/flatten'
import { type CommandApplier, type CommandCreator } from '../types/command'
import type {
  Extension,
  ExtractCommandAppliers,
  ExtractMarks,
  ExtractNodes,
} from '../types/extension'
import type { NodeJSON, SelectionJSON } from '../types/model'

import {
  createMarkBuilder,
  createNodeBuilder,
  type MarkBuilder,
  type NodeBuilder,
} from './builder'
import { union } from './union'

/**
 * @public
 */
export interface EditorOptions<E extends Extension> {
  /**
   * The extension to use when creating the editor.
   */
  extension: E

  /**
   * A JSON object representing the starting document to use when creating the
   * editor.
   */
  defaultDoc?: NodeJSON

  /**
   * A HTML element or a HTML string representing the starting document to use
   * when creating the editor.
   */
  defaultHTML?: string | HTMLElement

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.
   */
  defaultSelection?: SelectionJSON
}

/**
 * @public
 */
export function createEditor<E extends Extension>(
  options: EditorOptions<E>,
): Editor<E> {
  const { defaultDoc, defaultHTML, defaultSelection } = options
  let extension: E = options.extension
  if (defaultDoc || defaultHTML) {
    extension = union([
      extension,
      defineDefaultState({
        defaultDoc,
        defaultHTML,
        defaultSelection,
      }),
    ]) as E
  }
  return Editor.create(new EditorInstance(extension)) as Editor<E>
}

/**
 * @internal
 */
class EditorInstance {
  view: EditorView | null = null
  cachedState: EditorState
  schema: Schema
  commandAppliers: Record<string, CommandApplier> = {}

  private payloads: Payloads = []
  private converters: Converters = []
  private directEditorProps: DirectEditorProps
  readonly nodeBuilders: Record<string, NodeBuilder>
  readonly markBuilders: Record<string, MarkBuilder>

  constructor(extension: Extension) {
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)

    const { schemaInput, stateInput, viewInput, commandInput } =
      updateExtension(this.payloads, this.converters, extension, 'add')

    if (!schemaInput) {
      throw new ProseKitError('Schema must be defined')
    }
    const schema = new Schema(schemaInput)

    const stateConfig: EditorStateConfig = stateInput
      ? stateInput({ schema })
      : { schema }
    const state = EditorState.create(stateConfig)
    this.cachedState = state

    if (commandInput) {
      for (const [name, commandCreator] of Object.entries(commandInput)) {
        this.defineCommand(name, commandCreator)
      }
    }

    this.directEditorProps = { state, ...viewInput }
    this.schema = this.directEditorProps.state.schema

    const getState = () => this.getState()

    this.nodeBuilders = Object.fromEntries(
      Object.values(this.schema.nodes).map((type) => [
        type.name,
        createNodeBuilder(getState, type),
      ]),
    )
    this.markBuilders = Object.fromEntries(
      Object.values(this.schema.marks).map((type) => [
        type.name,
        createMarkBuilder(getState, type),
      ]),
    )
  }

  public getState() {
    if (this.view) {
      this.cachedState = this.view.state
    }
    return this.cachedState
  }

  public updateExtension(extension: Extension, mode: 'add' | 'remove'): void {
    const { schemaInput, stateInput, viewInput, commandInput } =
      updateExtension(this.payloads, this.converters, extension, mode)

    if (schemaInput) {
      throw new ProseKitError('Schema cannot be changed')
    }

    if (viewInput) {
      throw new ProseKitError('View cannot be changed')
    }

    const plugins = stateInput?.({ schema: this.schema })?.plugins
    if (plugins && plugins.length > 0) {
      if (!this.view) {
        throw new ProseKitError(
          'Unexpected inner state: EditorInstance.view is not defined',
        )
      }

      const state = this.view.state.reconfigure({ plugins })
      this.view.updateState(state)
    }

    if (commandInput) {
      const names = Object.keys(commandInput)
      for (const name of names) {
        this.defineCommand(name, commandInput[name])
      }
    }
  }

  public mount(place: HTMLElement) {
    if (this.view) {
      throw new ProseKitError('Editor is already mounted')
    }
    if (!place) {
      throw new ProseKitError("Can't mount editor without a place")
    }

    this.view = new EditorView({ mount: place }, this.directEditorProps)
  }

  public unmount() {
    if (!this.view) {
      throw new ProseKitError('Editor is not mounted yet')
    }

    this.view.destroy()
    this.view = null
  }

  public get assertView(): EditorView {
    if (!this.view) {
      throw new ProseKitError('Editor is not mounted')
    }
    return this.view
  }

  public definePlugins(plugins: readonly Plugin[]): void {
    const view = this.assertView
    const state = view.state
    const newPlugins = [...plugins, ...state.plugins]
    const newState = state.reconfigure({ plugins: newPlugins })
    view.setProps({ state: newState })
  }

  public removePlugins(plugins: readonly Plugin[]): void {
    const view = this.view
    if (!view) return

    const state = view.state
    const newPlugins = state.plugins.filter((p) => !plugins.includes(p))
    const newState = state.reconfigure({ plugins: newPlugins })
    view.setProps({ state: newState })
  }

  public defineCommand<Args extends any[] = any[]>(
    name: string,
    commandCreator: CommandCreator<Args>,
  ): void {
    const applier: CommandApplier<Args> = (...args: Args) => {
      const view = this.view
      if (!view) {
        return false
      }

      const command = commandCreator(...args)
      return command(view.state, view.dispatch.bind(view), view)
    }

    applier.canApply = (...args: Args) => {
      const view = this.view
      if (!view) {
        return false
      }

      const command = commandCreator(...args)
      return command(view.state, undefined, view)
    }

    this.commandAppliers[name] = applier as CommandApplier
  }

  public removeCommand(name: string) {
    delete this.commandAppliers[name]
  }
}

/**
 * @public
 */
export class Editor<E extends Extension = any> {
  private instance: EditorInstance

  private constructor(instance: EditorInstance) {
    this.instance = instance
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)
    this.use = this.use.bind(this)
  }

  private afterMounted: Array<VoidFunction> = []

  /**
   * @internal
   */
  static create(instance: any) {
    if (!(instance instanceof EditorInstance)) {
      throw new TypeError('Invalid EditorInstance')
    }
    return new Editor(instance)
  }

  /**
   * Whether the editor is mounted.
   */
  get mounted(): boolean {
    return !!this.instance.view
  }

  /**
   * The editor view.
   */
  get view(): EditorView {
    return this.instance.assertView
  }

  /**
   * The editor schema.
   */
  get schema(): Schema<ExtractNodes<E>, ExtractMarks<E>> {
    return this.instance.schema
  }

  get commands(): ExtractCommandAppliers<E> {
    return this.instance.commandAppliers as ExtractCommandAppliers<E>
  }

  /**
   * Whether the editor is focused.
   */
  get focused(): boolean {
    return this.instance.view?.hasFocus() ?? false
  }

  /**
   * Mount the editor to the given HTML element.
   * Pass `null` or `undefined` to unmount the editor.
   */
  mount(place: HTMLElement | null | undefined): void {
    if (!place) {
      return this.unmount()
    }
    this.instance.mount(place)
    this.afterMounted.forEach((callback) => callback())
  }

  /**
   * Unmount the editor. This is equivalent to `mount(null)`.
   */
  unmount(): void {
    if (this.mounted) {
      this.instance.unmount()
    }
  }

  /**
   * Focus the editor.
   */
  focus(): void {
    this.instance.view?.focus()
  }

  /**
   * Blur the editor.
   */
  blur(): void {
    this.instance.view?.dom.blur()
  }

  use(extension: Extension): VoidFunction {
    if (!this.mounted) {
      let lazyRemove: VoidFunction | null = null

      const lazyCreate = () => {
        lazyRemove = this.use(extension)
      }

      this.afterMounted.push(lazyCreate)

      return () => {
        lazyRemove?.()
      }
    }

    this.instance.updateExtension(extension, 'add')
    return () => this.instance.updateExtension(extension, 'remove')
  }

  get state(): EditorState {
    return this.instance.getState()
  }

  get nodes(): Record<ExtractNodes<E>, NodeBuilder> {
    return this.instance.nodeBuilders
  }
  get marks(): Record<ExtractMarks<E>, MarkBuilder> {
    return this.instance.markBuilders
  }
}
