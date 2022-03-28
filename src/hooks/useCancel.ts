import { useEffect } from 'react'
import { FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

export const useCancel = <T>(fields: FormStateFields<T>, callback: () => (void | Promise<void>), deps: unknown[] = []) => {
  const form = extractFormState(fields)
  useEffect(() => {
    form.cancelListeners.push(callback)
    return () => {
      const i = form.cancelListeners.indexOf(callback)
      form.cancelListeners.slice(i, 1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
