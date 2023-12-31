import { isNodeSelection, isTextSelection } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { isInCodeBlock } from '../../utils/is-in-code-block'

export function getVirtualSelectionElement(view: EditorView) {
  if (typeof window === 'undefined' || view.isDestroyed) {
    return
  }

  const selection = view.state.selection

  if (
    !selection.empty &&
    !isInCodeBlock(selection) &&
    (isTextSelection(selection) || isNodeSelection(selection))
  ) {
    return getDomRange()
  }
}

function getDomRange() {
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed) {
    return
  }

  const range =
    typeof selection.rangeCount === 'number' &&
    selection.rangeCount > 0 &&
    selection.getRangeAt(0)

  if (!range) {
    return
  }

  return range
}
