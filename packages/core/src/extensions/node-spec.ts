import type { DOMOutputSpec, NodeSpec, SchemaSpec } from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import { Facet } from '../facets/facet'
import { schemaFacet } from '../facets/schema'
import type { Extension } from '../types/extension'
import { isElement } from '../utils/is-element'
import { isNotNull } from '../utils/is-not-null'

/**
 * @public
 */
export interface NodeSpecOptions<NodeName extends string = string>
  extends NodeSpec {
  name: NodeName
  topNode?: boolean
}

/**
 * @public
 */
export interface NodeAttrOptions {
  /**
   * The name of the node type.
   */
  type: string

  /**
   * The name of the attribute.
   */
  attr: string

  /**
   * The default value for this attribute, to use when no explicit value is
   * provided. Attributes that have no default must be provided whenever a node
   * of a type that has them is created.
   */
  default?: any

  /**
   * Returns the attribute key and value to be set on the DOM node.
   */
  toDOM?: (value: any) => [key: string, value: string] | null | void

  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => any
}

/**
 * Defines a node type.
 *
 * @public
 */
export function defineNodeSpec<NodeName extends string>(
  options: NodeSpecOptions<NodeName>,
): Extension<{ NODES: NodeName }> {
  const payload: NodeSpecPayload = [options, undefined]
  return nodeSpecFacet.extension([payload]) as Extension<{ NODES: NodeName }>
}

/**
 * Defines an attribute for a node type.
 *
 * @public
 */
export function defineNodeAttr(options: NodeAttrOptions): Extension {
  const payload: NodeSpecPayload = [undefined, options]
  return nodeSpecFacet.extension([payload])
}

type NodeSpecPayload = [
  NodeSpecOptions | undefined,
  NodeAttrOptions | undefined,
]

const nodeSpecFacet = Facet.define<NodeSpecPayload, SchemaSpec>({
  convert: (payloads: NodeSpecPayload[]): SchemaSpec => {
    const nodes: Record<string, NodeSpec> = {}
    let topNodeName: string | undefined = undefined

    const specPayloads = payloads.map((input) => input[0]).filter(isNotNull)
    const attrPayloads = payloads.map((input) => input[1]).filter(isNotNull)

    for (const { name, topNode, ...spec } of specPayloads) {
      if (nodes[name]) {
        throw new ProseKitError(`Node type ${name} has already been defined`)
      }

      if (topNode) {
        topNodeName = name
      }

      nodes[name] = spec
    }

    for (const {
      type,
      attr,
      default: defaultValue,
      toDOM,
      parseDOM,
    } of attrPayloads) {
      const spec = nodes[type]

      if (!spec) {
        throw new ProseKitError(
          `Node type ${type} must be defined before defining attributes`,
        )
      }

      if (!spec.attrs) {
        spec.attrs = {}
      }
      spec.attrs[attr] = { default: defaultValue as unknown }

      if (toDOM && spec.toDOM) {
        const existingToDom = spec.toDOM
        spec.toDOM = (node): DOMOutputSpec => {
          const dom = existingToDom(node)

          if (!dom) {
            return dom
          }

          const attrDOM = toDOM(node.attrs[attr])
          if (!attrDOM) {
            return dom
          }

          const [key, value] = attrDOM

          if (!key) {
            return dom
          }

          if (Array.isArray(dom)) {
            if (typeof dom[1] === 'object') {
              return [dom[0], { ...dom[1], [key]: value }, ...dom.slice(2)]
            } else {
              return [dom[0], { [key]: value }, ...dom.slice(1)]
            }
          } else if (isElement(dom)) {
            dom.setAttribute(key, value)
          } else if (
            typeof dom === 'object' &&
            'dom' in dom &&
            isElement(dom.dom)
          ) {
            dom.dom.setAttribute(key, value)
          }

          return dom
        }
      }

      if (parseDOM && spec.parseDOM) {
        for (const rule of spec.parseDOM) {
          const existingGetAttrs = rule.getAttrs
          const existingAttrs = rule.attrs

          rule.getAttrs = (dom) => {
            const attrs = existingGetAttrs?.(dom) ?? existingAttrs

            if (attrs === false || !dom || !isElement(dom)) {
              return attrs ?? null
            }

            const value = parseDOM(dom) as unknown
            return {
              ...attrs,
              [attr]: value,
            }
          }
        }
      }
    }

    return { nodes, topNode: topNodeName }
  },
  next: schemaFacet,
  singleton: true,
})
