<script lang="ts">
import { writable } from 'svelte/store'
import Toggle from './toggle.svelte'
import { useSubmitKeymap } from './use-submit-keymap'

export let onSubmit: (hotkey: string) => void

const hotkey = writable<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, onSubmit)
</script>

<div class="TOOLBAR">
  <div class="TOOLBAR">
    <Toggle
      pressed={$hotkey === 'Shift-Enter'}
      onClick={() => ($hotkey = 'Shift-Enter')}
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift + Enter</kbd>
    </Toggle>

    <Toggle pressed={$hotkey === 'Enter'} onClick={() => ($hotkey = 'Enter')}>
      <span class="mr-1">Submit with</span>
      <kbd>Enter</kbd>
    </Toggle>
  </div>
</div>
