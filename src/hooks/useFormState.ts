import { useContext, useMemo } from 'react'
import FormContext from '../components/FormContext'
import { FormState, FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

export const useFormState = <T>(fields?: FormStateFields<T>): FormState => {
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
      get hasChanged() {
        return state.hasChanged
      },
      get isSubmitting() {
        return state.isSubmitting
      },
      get isCancelling() {
        return state.isCancelling
      },
      submit: state.submit,
      cancel: state.cancel,
      validate: state.cancel,
      reset: state.reset,
    }
  }, [context, fields])
}
