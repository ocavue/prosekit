import { DropdownMenuTrigger as RadixDropdownMenuTrigger } from 'radix-vue'
import { defineComponent } from 'vue'

export const DropdownMenuTrigger = defineComponent((props, { slots }) => {
  return () => (
    <RadixDropdownMenuTrigger class="flex items-center justify-between space-x-1 rounded px-3 py-2 text-sm transition hover:bg-[--vp-c-default-soft] [*&_]:selection:bg-transparent">
      {slots.default?.()}
      <span class="i-ci-chevron-down h-4 w-4 opacity-50" />
    </RadixDropdownMenuTrigger>
  )
})