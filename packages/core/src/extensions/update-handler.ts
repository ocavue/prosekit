import { EditorState, PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { Facet } from '../facets/facet'
import { voidFunction } from '../types/void-function'
import { isNotNull } from '../utils/is-not-null'

import { pluginFacet, type PluginPayload } from './plugin'

export type UpdateHandler = (options: {
  view: EditorView
  prevState: EditorState
}) => void

/**
 * @internal
 */
export function defineUpdateHandler(options: { update?: VoidFunction }) {
  const updateHandler = options?.update ?? voidFunction
  return updateHandlerFacet.extension([updateHandler])
}

const updateHandlerFacet = Facet.define<UpdateHandler, PluginPayload>({
  converter: () => {
    let updateHandlers: UpdateHandler[] = []

    const plugin = new ProseMirrorPlugin({
      key: pluginKey,
      view: () => {
        return {
          update: (view, prevState) => {
            updateHandlers.forEach((fn) => fn({ view, prevState }))
          },
        }
      },
    })

    const pluginFunc = () => [plugin]

    return {
      create: (handlers: UpdateHandler[]) => {
        updateHandlers = handlers.filter(isNotNull)
        return pluginFunc
      },
      update: (handlers: UpdateHandler[]) => {
        updateHandlers = handlers.filter(isNotNull)
        return null
      },
    }
  },
  next: pluginFacet,
  singleton: true,
})

const pluginKey = new PluginKey('prosekit-event-handler')