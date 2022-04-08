import React, { ReactNode, useCallback } from 'react'
import { FormState, FormStateFields } from '../data/states'
import { extractFormState } from '../hooks/useForm'
import FormContext from './FormContext'

interface Props<T> {
  state: FormStateFields<T>
  children: ReactNode
}

const Form = <T,>({ state, children }: Props<T>): JSX.Element => {
  const form = extractFormState(state) as FormState<unknown>
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    form.submit()
  }, [form])
  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider
        value={{ state: form }}
      >
        {children}
      </FormContext.Provider>
    </form>
  )
}
export default Form
