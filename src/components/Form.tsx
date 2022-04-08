import React, { ReactNode, useCallback } from 'react'
import { FormRootState, FormStateFields } from '../data/states'
import { extractFormState } from '../hooks/useForm'
import FormContext from './FormContext'

interface Props<T> {
  state: FormStateFields<T>
  children: ReactNode
}

const Form = <T,>({ state, children }: Props<T>): JSX.Element => {
  const form = extractFormState(state)
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    form.submit()
  }, [form])
  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider
        value={{ state: form as FormRootState<unknown> }}
      >
        {children}
      </FormContext.Provider>
    </form>
  )
}
export default Form
