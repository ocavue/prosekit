import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { AutocompleteItem } from 'prosekit/lit/autocomplete-item'
import { AutocompleteList } from 'prosekit/lit/autocomplete-list'
import { AutocompletePopover } from 'prosekit/lit/autocomplete-popover'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  ])
}

const editor = createEditor({ extension: defineExtension() })

function createPopover() {
  const popover = new AutocompletePopover()
  popover.editor = editor
  popover.regex = /\/(\w*)$/
  popover.append(createList())
  return popover
}

function createList() {
  const list = new AutocompleteList()
  list.editor = editor
  list.append(
    createItem('Insert Heading 1', () => handleHeadingConvert(1)),
    createItem('Insert Heading 2', () => handleHeadingConvert(2)),
    createItem('Insert Heading 3', () => handleHeadingConvert(3)),
  )
  list.className = 'AUTOCOMPLETE_MENU'
  return list
}

/**
 * @param {string} text
 * @param {function} callback
 */
function createItem(text, callback) {
  const item = new AutocompleteItem()
  item.append(text)
  item.onSelect = callback
  item.className = 'AUTOCOMPLETE_MENU_ITEM'
  return item
}

/**
 * @param {number} level
 */
function handleHeadingConvert(level) {
  const nodeType = editor.schema.nodes.heading
  const attrs = { level }
  editor.commands.setBlockType({ nodeType, attrs })
}

function main() {
  let root = document.querySelector('.editor-root')
  if (!root) {
    root = document
      .querySelector('main')
      .appendChild(document.createElement('div'))
    root.classList.add('example-root')
  }
  root.innerHTML = ''

  const viewport = root.appendChild(document.createElement('div'))
  viewport.className = 'EDITOR_VIEWPORT'

  const doc = viewport.appendChild(document.createElement('div'))
  doc.className = 'EDITOR_DOCUMENT'

  const content = doc.appendChild(document.createElement('div'))
  content.className = 'EDITOR_CONTENT'

  editor.mount(content)

  doc.appendChild(createPopover())
}

main()
