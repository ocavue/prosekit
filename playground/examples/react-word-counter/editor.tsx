import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import WordCounter from './word-counter'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultHTML: 'Start typing and observe the word count update below.',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
          <WordCounter />
        </div>
        ƒ
      </div>
    </ProseKit>
  )
}
