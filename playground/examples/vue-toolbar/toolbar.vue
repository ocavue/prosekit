<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import Toggle from './toggle.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :pressed="false"
      :disabled="!editor.commands.undo.canApply()"
      :onClick="() => editor.commands.undo()"
    >
      <div className="ICON_UNDO" />
    </Toggle>

    <Toggle
      :pressed="false"
      :disabled="!editor.commands.redo.canApply()"
      :onClick="() => editor.commands.redo()"
    >
      <div className="ICON_REDO" />
    </Toggle>

    <Toggle
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      :onClick="() => editor.commands.toggleBold()"
    >
      <div class="ICON_BOLD"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      :onClick="() => editor.commands.toggleItalic()"
    >
      <div class="ICON_ITALIC"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 1 })"
      :onClick="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="ICON_H1"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 2 })"
      :onClick="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="ICON_H2"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 3 })"
      :onClick="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="ICON_H3"></div>
    </Toggle>
  </div>
</template>
