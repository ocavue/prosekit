import path from 'node:path'

import type { Package } from '@manypkg/get-packages'
import { sortedUniq } from 'lodash-es'

import { asyncFrom } from './async-from'
import { vfs } from './virtual-file-system'

export async function genSizeLimitJson() {
  const pkg = await vfs.getPackageByName('prosekit')
  const sizeLimitConfig = await asyncFrom(iterateExports(pkg))
  await vfs.updateJSON('.size-limit.json', sizeLimitConfig)
}

async function* iterateExports(pkg: Package) {
  const exports: Record<string, string | Record<string, string>> =
    (pkg.packageJson as any)?.publishConfig?.exports ?? {}

  for (const [entryName, entry] of Object.entries(exports)) {
    // size-limit cannot handle .svelte files
    if (entryName.includes('svelte')) {
      continue
    }

    // The root package is empty
    if (entryName === '.') {
      continue
    }

    const subPackageName = path
      .join('@prosekit', entryName)
      .split('/')
      .slice(0, 2)
      .join('/')

    const subPackage = await vfs.getPackageByName(subPackageName)
    const ignored: string[] = sortedUniq([
      // Ignore peer dependencies
      ...Object.keys(subPackage.packageJson.peerDependencies ?? {}),
    ])

    const entryPath = typeof entry === 'string' ? entry : entry.default

    yield {
      name: path.normalize(path.join('prosekit', entryName)),
      path: path.normalize(path.join('packages/prosekit', entryPath)),
      ignore: ignored,
    }
  }
}
