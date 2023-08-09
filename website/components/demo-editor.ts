import { clsx } from 'clsx'
import { defineClientComponent } from 'vitepress'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

import 'prosekit-example-vue-lib/style.css'

const Editor = defineClientComponent(async () => {
  const mod = await import('prosekit-example-vue-lib')
  return mod.Editor
})

export const DemoEditor = defineComponent(() => {
  const { isDark } = useData()

  return () =>
    h(
      'div',
      {
        class: clsx(
          'w-full flex flex-col items-center p-4',
          isDark.value ? 'dark' : null,
        ),
      },
      h('div', { class: 'max-w-full w-[500px] h-[400px]' }, h(Editor)),
    )
})
