<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/autocomplete-item'
import { AutocompletePopover } from 'prosekit/svelte/autocomplete-popover'
import { AutocompleteEmpty } from 'prosekit/svelte/autocomplete-empty'
import { AutocompleteList } from 'prosekit/svelte/autocomplete-list'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

const handleHeadingInsert = (level: number) => {
  $editor.commands.insertHeading({ level })
}

const handleHeadingConvert = (level: number) => {
  $editor.commands.setHeading({ level })
}
</script>

<AutocompletePopover
  editor={$editor}
  regex={/\/.*$/iu}
  class="AUTOCOMPLETE_MENU"
>
  <AutocompleteList editor={$editor}>
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
