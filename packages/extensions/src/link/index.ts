import {
  defineCommands,
  addMark,
  defineMarkSpec,
  union,
  toggleMark,
} from '@prosekit/core'

/**
 * @public
 */
export interface LinkAttrs {
  href: string
}

export function defineLinkSpec() {
  return defineMarkSpec({
    name: 'link',
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs: (dom) => {
          return {
            href: (dom as HTMLElement).getAttribute('href'),
          }
        },
      },
    ],
    attrs: {
      href: {},
    },
    toDOM(node) {
      const { href } = node.attrs as LinkAttrs
      return ['a', { href }, 0]
    },
  })
}

export function defineLinkCommands() {
  return defineCommands({
    addLink: (attrs: LinkAttrs) => addMark({ type: 'link', attrs }),
    toggleLink: (attrs: LinkAttrs) => toggleMark({ type: 'link', attrs }),
  })
}

/**
 * @public
 */
export function defineLink() {
  return union([defineLinkSpec(), defineLinkCommands()])
}
