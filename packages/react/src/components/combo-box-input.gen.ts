import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxInput as ComboBoxInputElement, type ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import React from 'react'

export type ComboBoxInputProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxInputElementProps>

const ComboBoxInputInner = createComponent({
  tagName: 'prosekit-combo-box-input',
  elementClass: ComboBoxInputElement,
  react: React,
  displayName: 'ComboBoxInputInner',
})

export const ComboBoxInput: ForwardRefExoticComponent<
  PropsWithoutRef<ComboBoxInputProps> & RefAttributes<ComboBoxInputElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxInputInner, { ...props, ref })
})

ComboBoxInput.displayName = 'ComboBoxInput'
