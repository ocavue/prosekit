import { union } from '@prosekit/core'

import { defineCodeBlockCommands } from './code-block-commands'
import {
  defineCodeBlockHighlight,
  type HighlightParser,
} from './code-block-highlight'
import {
  defineCodeBlockEnterRule,
  defineCodeBlockInputRule,
} from './code-block-input-rule'
import { defineCodeBlockSpec } from './code-block-spec'
import type { CodeBlockAttrs } from './code-block-types'

export {
  defineCodeBlockCommands,
  defineCodeBlockHighlight,
  defineCodeBlockInputRule,
  defineCodeBlockEnterRule,
  defineCodeBlockSpec,
  type CodeBlockAttrs,
  type HighlightParser,
}

/**
 * Adds `codeBlock` nodes to the editor. This includes the following extensions:
 *
 * - {@link defineCodeBlockSpec}
 * - {@link defineCodeBlockInputRule}
 * - {@link defineCodeBlockEnterRule}
 * - {@link defineCodeBlockCommands}.
 *
 * @public
 */
export function defineCodeBlock() {
  return union([
    defineCodeBlockSpec(),
    defineCodeBlockInputRule(),
    defineCodeBlockEnterRule(),
    defineCodeBlockCommands(),
  ])
}
