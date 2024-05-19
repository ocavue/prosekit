import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Colors } from './colors'
import { replaceShortcuts } from './utils/replace'

function cn(...args: Array<string | undefined | null | false>): string {
  return twMerge(replaceShortcuts(clsx(...args), Colors))
}

const FLOATING_MENU = cn(
  'z-10 box-border rounded-lg border border-border bg-background shadow-lg',
)

const PRESENCE_ANIMATE = cn(
  'will-change-transform',

  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:zoom-in-95',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:animate-duration-150',
  'data-[state=closed]:animate-duration-200',
)

const POPOVER_ANIMATE = cn(
  PRESENCE_ANIMATE,
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=bottom]:slide-out-to-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=left]:slide-out-to-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=right]:slide-out-to-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
  'data-[side=top]:slide-out-to-bottom-2',
)

const FLOATING_MENU_ITEM = cn(
  'box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary',
)

const BUTTON_BASE = cn(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
)

const BUTTON_VARIANT_PRIMARY =
  'bg-primary text-primary-foreground hover:bg-primary/90'
// const BUTTON_VARIANT_SECONDARY =
// ;('bg-secondary text-secondary-foreground hover:bg-secondary/80')

const BUTTON_SIZE_DEFAULT = 'h-10 px-4 py-2'
const BUTTON_SIZE_SM = 'h-9 px-3'
// const BUTTON_SIZE_LG = 'h-1 px-8'
// const BUTTON_SIZE_ICON = 'h-10 w-10'

const INPUT = cn(
  'flex h-10 rounded-md w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition',
  // border
  'border box-border border-border border-solid',
  // ring
  'ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
  // outline
  'outline-none focus-visible:outline-none',
  // file
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // disabled
  'disabled:cursor-not-allowed disabled:opacity-50',
)

// The outermost container of the editor. It limits the height of the editor.
export const EDITOR_VIEWPORT = cn(
  'box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700',
)

// Use this class if you have floating menus. We want to scroll menus along with the document.
export const EDITOR_DOCUMENT = cn('relative flex min-h-full w-full flex-col')

// Use this class for the contenteditable element.
export const EDITOR_CONTENT = cn(
  // SolidJS will override the class name which removes the ProseMirror class, so we add it back.
  'ProseMirror',
  'relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0',
  '[&_span[data-mention="user"]]:text-blue-500',
  '[&_span[data-mention="tag"]]:text-violet-500',
  '[&_pre]:text-white [&_pre]:bg-zinc-800',
)

export const INLINE_MENU_MAIN = cn(
  FLOATING_MENU,
  'relative flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1',
)

export const INLINE_MENU_LINK = cn(
  FLOATING_MENU,
  'relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch',
)

export const INLINE_MENU_LINK_INPUT = cn(INPUT)

export const INLINE_MENU_LINK_REMOVE_BUTTON = cn(
  BUTTON_BASE,
  BUTTON_VARIANT_PRIMARY,
  BUTTON_SIZE_SM,
)

export const AUTOCOMPLETE_MENU = cn(
  'relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1',
  FLOATING_MENU,
)

export const AUTOCOMPLETE_MENU_ITEM = cn(
  'relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5',
  FLOATING_MENU_ITEM,
)

export const LANGUAGE_WRAPPER = cn(
  'relative left-2 top-3 h-0 select-none overflow-visible',
)

export const LANGUAGE_SELECT = cn(
  'outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white',

  // Only visible when hovering the code block
  'opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80',
)

export const TOOLBAR = cn(
  'z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background',
  'border-border border-solid border-l-0 border-r-0 border-t-0 border-b',
)

export const TOGGLE_BUTTON = cn(
  'outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none',
  'disabled:opacity-50 hover:disabled:opacity-50',
  'bg-transparent hover:bg-secondary data-[state=on]:bg-accent/60',
)

export const IMAGE_UPLOAD_CARD = cn(
  'flex flex-col gap-y-4 p-6 text-sm w-sm',
  FLOATING_MENU,
  POPOVER_ANIMATE,
)

export const IMAGE_UPLOAD_INPUT = cn(INPUT)

export const IMAGE_UPLOAD_BUTTON = cn(
  BUTTON_BASE,
  BUTTON_VARIANT_PRIMARY,
  BUTTON_SIZE_DEFAULT,
  'w-full',
)

export const IMAGE_RESIZEALE = cn('relative block max-h-[600px] max-w-full')

export const IMAGE_RESIZEALE_IMAGE = cn('h-full w-full object-contain')

export const IMAGE_RESIZEALE_HANDLE = cn(
  'absolute bottom-0 right-0 rounded mb-1.5 mr-1.5 p-0.5 transition bg-gray-900/30 active:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5',
  // Only visible when hovering the image block
  'opacity-0 hover:opacity-100 [prosekit-resizable:hover_&]:opacity-100 [prosekit-resizable[data-resizing]_&]:opacity-100',
)

export const DROP_CURSOR = cn('transition-all bg-blue-500')

export const BLOCK_HANDLE = cn(
  'flex items-center box-border justify-center my-[0.5em] h-[1.5em] w-[1.2em] hover:bg-secondary rounded text-muted-foreground/50 transition',
  PRESENCE_ANIMATE,
)

export const TOOLTIP_TRIGGER = cn('block')
export const TOOLTIP_CONTENT = cn(
  'z-50 overflow-hidden rounded-md border border-solid bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-sm',
  POPOVER_ANIMATE,
)

export const ICON_ITALIC = cn('i-lucide-italic h-5 w-5')
export const ICON_BOLD = cn('i-lucide-bold h-5 w-5')
export const ICON_UNDERLINE = cn('i-lucide-underline h-5 w-5')
export const ICON_STRIKE = cn('i-lucide-strikethrough h-5 w-5')
export const ICON_CODE = cn('i-lucide-code h-5 w-5')
export const ICON_H1 = cn('i-lucide-heading-1 h-5 w-5')
export const ICON_H2 = cn('i-lucide-heading-2 h-5 w-5')
export const ICON_H3 = cn('i-lucide-heading-3 h-5 w-5')
export const ICON_H4 = cn('i-lucide-heading-4 h-5 w-5')
export const ICON_H5 = cn('i-lucide-heading-5 h-5 w-5')
export const ICON_H6 = cn('i-lucide-heading-6 h-5 w-5')
export const ICON_UNDO = cn('i-lucide-undo-2 h-5 w-5')
export const ICON_REDO = cn('i-lucide-redo-2 h-5 w-5')
export const ICON_IMAGE = cn('i-lucide-image h-5 w-5')
export const ICON_LINK = cn('i-lucide-link h-5 w-5')
export const ICON_LIST_BULLET = cn('i-lucide-list h-5 w-5')
export const ICON_LIST_ORDERED = cn('i-lucide-list-ordered h-5 w-5')
export const ICON_LIST_TASK = cn('i-lucide-list-checks h-5 w-5')
export const ICON_LIST_TOGGLE = cn('i-lucide-list-collapse h-5 w-5')
export const ICON_LIST_INDENT = cn('i-lucide-indent-increase h-5 w-5')
export const ICON_LIST_DEDENT = cn('i-lucide-indent-decrease h-5 w-5')
export const ICON_CODE_BLOCK = cn('i-lucide-square-code h-5 w-5')
export const ICON_CORNER_HANDLE = cn('i-lucide-arrow-down-right h-4 w-4')
export const ICON_DRAG_HANDLE = cn('i-lucide-grip-vertical h-5 w-5')