import { createEditor, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineBasicExtension } from './index'

describe('defineBasicExtension', () => {
  it('can add nodes and marks', () => {
    const extension = union([defineBasicExtension()])
    const editor = createEditor({ extension })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes).sort()
    const marks = Object.keys(schema.marks).sort()

    expect(nodes).toContain('heading')
    expect(nodes).toContain('list')
    expect(nodes).toContain('paragraph')
    expect(nodes).toContain('text')
    expect(nodes).toContain('doc')

    expect(marks).toContain('italic')
  })
})
