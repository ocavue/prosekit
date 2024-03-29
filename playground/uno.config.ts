import {
  defineConfig,
  presetIcons,
  presetWind,
  transformerDirectives,
  type UserConfig,
} from 'unocss'

import { shortcuts } from '../config/unocss-shortcut.mjs'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons()],
  content: {
    filesystem: [
      './examples/**/*.{vue,tsx,jsx,ts,js,svelte}',
      './layouts/**/*.{astro,ts}',
    ],
    pipeline: {
      include: /\.(vue|svelte|[jt]sx?|mdx?|astro|html)($|\?)/,
    },
  },
  transformers: [transformerDirectives()],
  configDeps: ['../config/unocss-shortcut.mjs'],
  shortcuts,
})

export default config
