import {
  ProseKitError,
  type Editor,
  type Extension,
  defineUpdateHandler,
} from '@prosekit/core'
import { getContext, hasContext, onDestroy, onMount, setContext } from 'svelte'
import { readonly, writable, type Readable } from 'svelte/store'

export interface EditorContext {
  editor: Editor
}

const key = 'prosekit-svelte-editor-context'

export function setEditorContext(editor: Editor): void {
  if (!editor) {
    throw new ProseKitError('editor should not be empty')
  }
  const context: EditorContext = { editor }
  setContext(key, context)
}

export function getEditorContext(): EditorContext {
  if (!hasContext(key)) {
    throw new ProseKitError(
      'Editor context not found. You must call this function inside the ProseKit component',
    )
  }
  return getContext(key)
}

export function getEditor<E extends Extension = any>(options?: {
  update?: boolean
}): Readable<Editor<E>> {
  const update = options?.update ?? false
  const editor = getEditorContext().editor as Editor<E>

  const editorStore = writable(editor)

  if (update) {
    onMount(() => {
      const forceUpdate = () => {
        editorStore.set(editor)
      }
      const dispose = editor.use(defineUpdateHandler(forceUpdate))
      onDestroy(dispose)
    })
  }

  return readonly(editorStore)
}
