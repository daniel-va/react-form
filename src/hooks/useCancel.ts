import { useEffect, useMemo } from 'react'
import { FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

export const useCancel = <T>(fields: FormStateFields<T>, callback: () => (void | Promise<void>)) => {
  const form = extractFormState(fields)
  const i = useMemo(() => form.cancelListeners.length, [form])
  form.cancelListeners[i] = callback
  useEffect(() => () => {
    form.cancelListeners[i] = null
  }, [form, i])
}
