import { useEffect, useMemo } from 'react'
import { FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

export const useSubmit = <T>(fields: FormStateFields<T>, callback: (value: T) => (void | Promise<void>)) => {
  const form = extractFormState(fields)
  const i = useMemo(() => form.submitListeners.length, [form])
  form.submitListeners[i] = callback
  useEffect(() => () => {
    form.submitListeners[i] = null
  }, [form, i])
}
