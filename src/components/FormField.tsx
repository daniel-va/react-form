import React, { ReactNode, useMemo } from 'react'
import { InputProps } from '../data/InputProps'
import { FormFieldState } from '../data/states'

interface Props<T, K extends keyof T> {
  field: FormFieldState<T, K>

  children: (props: ChildProps<T, K>) => ReactNode
}

const FormField = <T, K extends keyof T>({
  field,
  children,
}: Props<T, K>): JSX.Element => {
  const inputProps: ChildProps<T, K> = useMemo(() => ({
    value: field.value,
    errors: field.hasChanged ? field.errors : [],
    onChange: (value) => field.setValue(value as T[K]),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [field.value, field.hasChanged, field.errors, field.setValue])
  return (
    <React.Fragment>
      {useMemo(() => children(inputProps), [inputProps, children])}
    </React.Fragment>
  )
}
export default FormField

type ChildProps<T, K extends keyof T> = Required<InputProps<T[K]>>
