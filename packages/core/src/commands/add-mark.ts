import { MarkType, type Attrs } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'

import { type CommandCreator } from '../types/command'
import { getMarkType } from '../utils/get-mark-type'

/**
 * Returns a command that adds the given mark with the given attributes.
 *
 * @public
 */
export function addMark(options: {
  /**
   * The type of the mark to add.
   */
  type: string | MarkType

  /**
   * The attributes of the mark to add.
   */
  attrs?: Attrs | null

  /**
   * The start position of the document. By default it will be the start position of current selection.
   */
  from?: number

  /**
   * The end position of the document. By default it will be the end position of current selection.
   */
  to?: number
}): Command {
  return (state, dispatch) => {
    const mark = getMarkType(state.schema, options.type).create(options.attrs)
    const from = options.from ?? state.selection.from
    const to = options.to ?? state.selection.to
    if (from > to) {
      return false
    }
    dispatch?.(state.tr.addMark(from, to, mark))
    return true
  }
}

addMark satisfies CommandCreator
