import {
  defineCommands,
  defineNodeSpec,
  insertNode,
  union,
} from '@prosekit/core'

export interface ImageAttrs {
  src?: string | null
}

export function defineImageSpec() {
  return defineNodeSpec({
    name: 'image',
    attrs: {
      src: { default: null },
    },
    group: 'block',
    defining: true,
    draggable: true,
    parseDOM: [
      {
        tag: 'img[src]',
        getAttrs: (element): ImageAttrs => {
          if (typeof element === 'string') {
            return { src: null }
          }

          const src = element.getAttribute('src') || null
          return { src }
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as ImageAttrs
      return ['img', attrs]
    },
  })
}

export function defineImageCommands() {
  return defineCommands({
    insertImage: (attrs?: ImageAttrs) => {
      return insertNode({ type: 'image', attrs })
    },
  })
}

/**
 * @public
 */
export function defineImage() {
  return union([defineImageSpec(), defineImageCommands()])
}
