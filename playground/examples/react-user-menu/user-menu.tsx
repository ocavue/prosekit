import type { MentionAttrs } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/autocomplete-popover'

import type { EditorExtension } from './extension'
import { users } from './user-data'

export default function UserMenu() {
  const editor = useEditor<EditorExtension>()

  const handleUserInsert = (id: number, username: string) => {
    const attrs: MentionAttrs = {
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    }
    const node = editor.nodes.mention(attrs)
    editor.commands.insertNode({ node })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover
      editor={editor}
      regex={/@\w*$/}
      className="AUTOCOMPLETE_MENU"
    >
      <AutocompleteList editor={editor}>
        <AutocompleteEmpty className="AUTOCOMPLETE_MENU_ITEM">
          No User match
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="AUTOCOMPLETE_MENU_ITEM"
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            {user.name}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
