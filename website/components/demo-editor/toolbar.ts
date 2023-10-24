import { defineComponent, h, ref } from 'vue'

import { ImageUploadPopover } from './image-upload-popver'
import { ToggleButton } from './toggle-button'
import { useExampleEditorRef } from './use-example-editor'

export const Toolbar = defineComponent(() => {
  const editor = useExampleEditorRef()

  const imagePopoverOpen = ref(false)

  return () =>
    h('div', { class: 'TOOLBAR' }, [
      h(
        ToggleButton,
        {
          available: editor.value.commands.undo.canApply(),
          onChange: () => editor.value.commands.undo(),
        },
        h('div', { class: 'ICON_UNDO' }),
      ),
      h(
        ToggleButton,
        {
          available: editor.value.commands.redo.canApply(),
          onChange: () => editor.value.commands.redo(),
        },
        h('div', { class: 'ICON_REDO' }),
      ),
      h(
        ToggleButton,
        {
          active: editor.value.marks.italic.isActive(),
          available: editor.value.commands.toggleItalic.canApply(),
          onChange: () => editor.value.commands.toggleItalic(),
        },
        h('div', { class: 'ICON_ITALIC' }),
      ),
      h(
        ToggleButton,
        {
          active: editor.value.marks.bold.isActive(),
          available: editor.value.commands.toggleBold.canApply(),
          onChange: () => editor.value.commands.toggleBold(),
        },
        h('div', { class: 'ICON_BOLD' }),
      ),
      h(
        ToggleButton,
        {
          active: editor.value.nodes.heading.isActive({ level: 1 }),
          available: editor.value.commands.toggleHeading.canApply({ level: 1 }),
          onChange: () => editor.value.commands.toggleHeading({ level: 1 }),
        },
        h('div', { class: 'ICON_H1' }),
      ),
      h(
        ToggleButton,
        {
          active: editor.value.nodes.heading.isActive({ level: 2 }),
          available: editor.value.commands.toggleHeading.canApply({ level: 2 }),
          onChange: () => editor.value.commands.toggleHeading({ level: 2 }),
        },
        h('div', { class: 'ICON_H2' }),
      ),
      h(
        ToggleButton,
        {
          active: editor.value.nodes.heading.isActive({ level: 3 }),
          available: editor.value.commands.toggleHeading.canApply({ level: 3 }),
          onChange: () => editor.value.commands.toggleHeading({ level: 3 }),
        },
        h('div', { class: 'ICON_H3' }),
      ),
      h(
        ImageUploadPopover,
        {
          open: imagePopoverOpen.value,
          onClose: () => {
            imagePopoverOpen.value = false
          },
        },
        h(
          ToggleButton,
          {
            active: false,
            available: true,
            onChange: () => {
              imagePopoverOpen.value = !imagePopoverOpen.value
            },
          },
          h('div', { class: 'ICON_IMAGE' }),
        ),
      ),
    ])
})
