<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import { BlockDragHandle, BlockPopover } from 'prosekit/vue/block-handle'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

const handleAdd = () => {
  editor.value.commands.insertNode({ type: 'paragraph' })
}
</script>

<template>
  <BlockPopover :class="Themes.BLOCK_HANDLE_POPOVER">
    <div
      @click="handleAdd"
      @pointerdown.prevent
      :class="Themes.BLOCK_HANDLE_BUTTON"
    >
      <div :class="Themes.ICON_PLUS"></div>
    </div>
    <BlockDragHandle :class="Themes.BLOCK_HANDLE_DRAG_HANDLE">
      <div :class="Themes.ICON_DRAG_HANDLE"></div>
    </BlockDragHandle>
  </BlockPopover>
</template>
