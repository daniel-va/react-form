import { useContext, useMemo } from 'react'
import FormContext from '../components/FormContext'
import { FormActions, FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormActions = (fields?: FormStateFields<any>): FormActions => {
  const context = useContext(FormContext)
  return useMemo(() => {
    const state = fields === undefined
      ? context.state
      : extractFormState(fields)
    if (state === null) {
      throw new Error('hook can only be used in a form context')
    }
    return {
      get isValid() {
        return state.isValid
      },
      submit: state.submit,
      cancel: state.cancel,
      validate: state.validate,
    }
  }, [context, fields])
}
