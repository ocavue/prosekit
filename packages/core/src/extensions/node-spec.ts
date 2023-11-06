import type { NodeSpec, SchemaSpec } from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import { Facet } from '../facets/facet'
import { schemaFacet } from '../facets/schema'
import type { Extension } from '../types/extension'

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
export function defineNodeSpec<NodeName extends string>(
  options: NodeSpecOptions<NodeName>,
): Extension<{ NODES: NodeName }> {
  return nodeSpecFacet.extension([options]) as Extension<{ NODES: NodeName }>
}

const nodeSpecFacet = Facet.define<NodeSpecOptions, SchemaSpec>({
  convert: (options: NodeSpecOptions[]): SchemaSpec => {
    const nodes: Record<string, NodeSpec> = {}
    let topNodeName: string | undefined = undefined

    for (const { name, topNode, ...spec } of options) {
      if (nodes[name]) {
        throw new ProseKitError(`Node type ${name} has already been defined`)
      }

      if (topNodeName && !topNode) {
        topNodeName = name
      }

      nodes[name] = spec
    }

    return { nodes, topNode: topNodeName }
  },
  next: schemaFacet,
})
