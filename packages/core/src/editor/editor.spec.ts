import { describe, it, expect } from 'vitest'

import { defineDoc } from '../extensions/doc'
import { defineParagraph } from '../extensions/paragraph'
import { defineText } from '../extensions/text'

import { createEditor } from './editor'

describe('createEditor', () => {
  it('can mount the editor', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const extension = [defineDoc(), defineText(), defineParagraph()]
    const editor = createEditor({ extension: { extension } })
    editor.mount(div)
    expect(div.outerHTML).toMatchInlineSnapshot(
      '"<div contenteditable=\\"true\\" translate=\\"no\\" class=\\"ProseMirror\\"><p><br class=\\"ProseMirror-trailingBreak\\"></p></div>"',
    )
  })
})
