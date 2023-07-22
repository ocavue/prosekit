import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { defineExtension } from 'prosekit/core'
import { addPlaceholder } from 'prosekit/extensions/placeholder'
import { AutocompleteItem } from 'prosekit/lit/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/lit/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/lit/components/autocomplete-popover'

const container = document.querySelector('.example-editor')
if (!(container instanceof HTMLElement)) {
  throw new TypeError('Could not find container element')
}

export function addExampleExtension() {
  return defineExtension([
    addBasicExtension(),
    addPlaceholder({ placeholder: 'Press / for commands...' }),
  ])
}

const editor = createEditor({ extension: addExampleExtension() })

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
  list.className = 'example-slash-menu'
  return list
}

function createItem(text, callback) {
  const item = new AutocompleteItem()
  item.append(text)
  item.onSelect = callback
  item.className = 'example-slash-menu-item'
  return item
}

function handleHeadingConvert(level) {
  const nodeType = editor.schema.nodes.heading
  const attrs = { level }
  editor.commands.setBlockType({ nodeType, attrs })
}

editor.mount(container)
document.body.append(createPopover())
