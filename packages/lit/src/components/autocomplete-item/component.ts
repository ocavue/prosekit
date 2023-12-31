import { ContextConsumer } from '@lit/context'
import { type PropertyDeclarations, type PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { autocompleteListContext } from '../autocomplete-list/context'
import { LightElement } from '../block-element'

export const propNames = ['value', 'onSelect'] as const

export interface AutocompleteItemProps {
  value?: string
  onSelect: VoidFunction
}

/**
 * Command menu item. Becomes active on pointer enter or through keyboard
 * navigation. Preferably pass a `value`, otherwise the value will be inferred
 * from the rendered item's `textContent`.
 */
export class AutocompleteItem
  extends LightElement
  implements Partial<AutocompleteItemProps>
{
  private listContext = new ContextConsumer(this, {
    context: autocompleteListContext,
    subscribe: true,
  })

  /**
   * @hidden
   */
  static properties = {
    value: { type: String, reflect: true, attribute: 'data-value' },
    selected: { type: Boolean, reflect: true, attribute: 'data-selected' },
    onSelect: { attribute: false },
  } satisfies PropertyDeclarations

  value = ''
  selected = false
  onSelect?: VoidFunction

  public get content(): string {
    const text = this.value || this.textContent || ''
    return text.trim().toLowerCase()
  }

  connectedCallback() {
    super.connectedCallback()
    this.role = 'option'
  }

  protected willUpdate(): void {
    const content = this.content
    const score = this.listContext.value?.scores.get(content) || 0
    const hidden = score <= 0

    this.selected = !hidden && content === this.listContext.value?.selectedValue
    this.setHidden(hidden)
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    this.ariaSelected = String(this.selected)
    if (
      this.selected &&
      changedProperties.has('selected') &&
      !changedProperties.get('selected') &&
      this.listContext.value?.selectedReason === 'keyboard'
    ) {
      this.scrollIntoView({ block: 'nearest' })
    }
  }
}

defineCustomElement('prosekit-autocomplete-item', AutocompleteItem)
