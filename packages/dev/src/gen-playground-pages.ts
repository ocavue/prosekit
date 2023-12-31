import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import stringHash from '@sindresorhus/string-hash'

import { readExampleMeta } from './example-meta'
import { vfs } from './virtual-file-system'

export async function genPlaygroundPages() {
  const meta = await readExampleMeta()

  const exampleNames: string[] = meta.examples.map((example) => example.name)

  await vfs.updateText(
    'playground/pages/[example].astro',
    getPageContent(exampleNames),
  )
}

function getPageContent(names: string[]): string {
  const importLines: string[] = []
  const pathLines: string[] = []
  const htmlLines: string[] = []

  names.forEach((name) => {
    const id = stringHash(name)
    const framework = name.split('-')[0]

    const ext = {
      react: 'tsx',
      preact: 'tsx',
      solid: 'tsx',
      svelte: 'svelte',
      vue: 'vue',
    }[framework]

    if (!ext) {
      return null
    }

    importLines.push(`import E${id} from '../examples/${name}/editor.${ext}'`)
    pathLines.push(`  { params: { example: '${name}' } },`)
    htmlLines.push(
      `  {example === '${name}' && <E${id} client:only="${framework}" />}`,
    )
  })

  const lines = [
    `---`,
    `// This file is generated from ${currentFilename}`,
    `import BaseLayout from '../layouts/base-layout.astro'`,
    ...importLines,
    `export const getStaticPaths = () => [`,
    ...pathLines,
    `]`,
    `const { example } = Astro.params`,
    `---\n`,
    `<BaseLayout>`,
    ...htmlLines,
    `</BaseLayout>`,
  ]

  return lines.join('\n') + '\n'
}

const currentFilename = basename(fileURLToPath(import.meta.url))
