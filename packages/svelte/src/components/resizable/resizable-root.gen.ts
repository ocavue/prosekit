import type { ResizableRootProps } from '@prosekit/primitives/resizable'    
import type { SvelteComponent } from 'svelte'

import Component from './resizable-root.gen.svelte'

export const ResizableRoot = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<ResizableRootProps> & {class?: number}>
