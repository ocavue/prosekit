# List

The `list` node is used to represent a list item. It is built on top of [prosemirror-flat-list](https://github.com/ocavue/prosemirror-flat-list).

<!-- @include: @/examples/list.md -->

## Usage

```ts
import 'prosekit/extensions/list/style.css'

import { defineList } from 'prosekit/extensions/list'

const extension = defineList()
```

## Commands

### `dedentList`

Decreases the indentation of selected list nodes.

```ts
editor.commands.dedentList()
```

### `indentList`

Increases the indentation of selected list.

```ts
editor.commands.indentList()
```

### `moveList`

Moves up or down selected list nodes.

```ts
editor.commands.moveList('down')
```

### `splitList`

Split the current list node.

```ts
editor.commands.splitList()
```

### `toggleCollapsed`

Toggle the `collapsed` attribute of the list node.

```ts
editor.commands.toggleCollapsed()
```

### `toggleList`

Wraps the selection in a list with the given type and attributes, or change the list kind if the selection is already in another kind of list, or unwrap the selected list if otherwise.

```ts
editor.commands.toggleList({ kind: 'task', checked: true })
```

### `unwrapList`

Unwraps the list around the selection.

```ts
editor.commands.unwrapList()
```

### `wrapInList`

Wraps the selection in a list with the given type and attributes.

```ts
editor.commands.wrapInList({ kind: 'bullet' })
```

## Input Rules

Input `1.` followed by a space to convert to an ordered list item.

Input `-` or `*` followed by a space to convert to an unordered list item.

Input `[x]` or `[]` followed by a space to convert to an task list item.

Input `>>` followed by a space to convert to an toggle list item.

## API Reference

- [prosekit/extensions/list](/references/extensions/list)
