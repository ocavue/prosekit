import {
  Editor,
  ProseKitError,
  type Extension,
  defineUpdateHandler,
} from '@prosekit/core'
import { useContext, createEffect, createSignal } from 'solid-js'

import { editorContext } from '../contexts/editor-context'

export function useEditor<E extends Extension = any>(options?: {
  update?: boolean
}): () => Editor<E> {
  const update = options?.update ?? false

  const value = useContext(editorContext)
  if (!value) {
    throw new ProseKitError(
      'useEditor must be used within the ProseKit component',
    )
  }

  const editor = value.editor as Editor<E>
  const [depend, forceUpdate] = useForceUpdate()

  createEffect(() => {
    if (update) {
      return editor.use(defineUpdateHandler(forceUpdate))
    }
  }, [editor, update, forceUpdate])

  return () => {
    depend()
    return editor
  }
}

function useForceUpdate() {
  return createSignal(undefined, { equals: false })
}
