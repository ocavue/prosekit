import { defineNodeSpec, union } from '@prosekit/core'

export interface MentionAttrs {
  id: string
  kind: string
  value: string
}

/**
 * @public
 */
export function defineMentionSpec() {
  return defineNodeSpec({
    name: 'mention',
    atom: true,
    group: 'inline',
    attrs: {
      id: {},
      value: {},
      kind: { default: '' },
    },
    inline: true,
    leafText: (node) => (node.attrs as MentionAttrs).value.toString(),
    parseDOM: [
      {
        tag: `span[data-mention]`,
        getAttrs: (dom): MentionAttrs => ({
          id: (dom as HTMLElement).getAttribute('data-id') || '',
          kind: (dom as HTMLElement).getAttribute('data-mention') || '',
          value: (dom as HTMLElement).textContent || '',
        }),
      },
    ],
    toDOM(node) {
      return [
        'span',
        {
          'data-id': (node.attrs as MentionAttrs).id.toString(),
          'data-mention': (node.attrs as MentionAttrs).kind.toString(),
        },
        (node.attrs as MentionAttrs).value.toString(),
      ]
    },
  })
}

/**
 * @public
 */
export function defineMention() {
  return union([defineMentionSpec()])
}
