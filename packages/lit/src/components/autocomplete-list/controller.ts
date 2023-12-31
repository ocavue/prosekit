import {
  Editor,
  type Keymap,
  defineKeymap,
  withPriority,
  Priority,
} from '@prosekit/core'
import { type ReactiveController, type ReactiveControllerHost } from 'lit'

export class AutocompleteListController implements ReactiveController {
  private editor: Editor | null = null
  private cleanup: VoidFunction | null = null

  constructor(
    private host: ReactiveControllerHost,
    private keymap: Keymap,
  ) {
    this.host.addController(this)
  }

  setEditor(editor: Editor) {
    if (this.editor !== editor) {
      this.editor = editor
      this.defineExtension()
    }
  }

  hostDisconnected() {
    this.cleanup?.()
    this.cleanup = null
  }

  private defineExtension() {
    this.cleanup?.()
    this.cleanup = null

    if (!this.editor || !this.keymap) {
      return
    }

    const extension = withPriority(defineKeymap(this.keymap), Priority.highest)
    this.cleanup = this.editor.use(extension)
  }
}
