import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/solid/autocomplete'

import type { EditorExtension } from './extension'

export default function SlashMenu() {
  const editor = useEditor<EditorExtension>()

  const handleHeadingInsert = (level: number) => {
    editor().commands.insertHeading({ level })
  }

  const handleHeadingConvert = (level: number) => {
    editor().commands.setHeading({ level })
  }

  return (
    <AutocompletePopover
      editor={editor()}
      regex={/\/.*$/iu}
      class="AUTOCOMPLETE_MENU"
    >
      <AutocompleteList editor={editor()}>
        <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
          No Command match
        </AutocompleteEmpty>

        <AutocompleteItem
          class="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingInsert(1)}
        >
          Insert Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingInsert(2)}
        >
          Insert Heading 2
        </AutocompleteItem>
        <AutocompleteItem
          class="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingConvert(1)}
        >
          Turn into Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingConvert(2)}
        >
          Turn into Heading 2
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
