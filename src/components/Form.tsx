import React from 'react'
import { ReactNode } from 'react'
import { FormState, FormStateFields } from '../data/states'
import { extractFormState } from '../hooks/useForm'
import FormContext from './FormContext'

interface Props<T> {
  state: FormStateFields<T>
  children: ReactNode
}

const Form = <T,>({ state, children }: Props<T>): JSX.Element => {
  return (
    <form>
      <FormContext.Provider
        value={{ state: extractFormState(state) as FormState<unknown> }}
      >
        {children}
      </FormContext.Provider>
    </form>
  )
}
export default Form
