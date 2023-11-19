import {
  Priority,
  defineCommands,
  defineInputRule,
  defineKeymap,
  defineNodeSpec,
  definePlugin,
  insertNode,
  union,
  withPriority,
} from '@prosekit/core'
import {
  createDedentListCommand,
  createIndentListCommand,
  createListPlugins,
  createListSpec,
  createMoveListCommand,
  createSplitListCommand,
  createToggleCollapsedCommand,
  createToggleListCommand,
  createUnwrapListCommand,
  createWrapInListCommand,
  listInputRules,
  listKeymap,
  type ListAttributes,
} from 'prosemirror-flat-list'

export function defineListSpec() {
  return defineNodeSpec({ ...createListSpec(), name: 'list' })
}

export function defineListPlugins() {
  return definePlugin(({ schema }) => createListPlugins({ schema }))
}

/**
 * Returns a extension that adds key bindings for list.
 *
 * @public
 */
export function defineListKeymap() {
  return defineKeymap(listKeymap)
}

export function defineListInputRules() {
  return defineInputRule(() => listInputRules)
}

export function defineListCommands() {
  return defineCommands({
    dedentList: createDedentListCommand,
    indentList: createIndentListCommand,
    moveList: createMoveListCommand,
    splitList: createSplitListCommand,
    toggleCollapsed: createToggleCollapsedCommand,
    toggleList: createToggleListCommand,
    unwrapList: createUnwrapListCommand,
    wrapInList: createWrapInListCommand,
    insertList: (attrs?: ListAttributes) => {
      return insertNode({ type: 'list', attrs })
    },
  })
}

/**
 * @public
 */
export function defineList() {
  return union([
    defineListSpec(),
    defineListPlugins(),
    // Use a high priority to override the default key bindings.
    withPriority(defineListKeymap(), Priority.high),
    defineListInputRules(),
    defineListCommands(),
  ])
}
