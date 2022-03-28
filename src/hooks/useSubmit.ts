import { useEffect } from 'react'
import { FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

export const useSubmit = <T>(fields: FormStateFields<T>, callback: (value: T) => (void | Promise<void>), deps: unknown[] = []) => {
  const form = extractFormState(fields)
  useEffect(() => {
    form.submitListeners.push(callback)
    return () => {
      const i = form.submitListeners.indexOf(callback)
      form.submitListeners.slice(i, 1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
