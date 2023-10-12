import { createContext } from '@lit/context'

export interface AutocompletePopoverContext {
  active: boolean
  query: string
  handleDismiss: VoidFunction
  handleSubmit: VoidFunction
}

export const commandPopoverContext = createContext<AutocompletePopoverContext>(
  'prosekit-autocomplete-popover-context',
)
