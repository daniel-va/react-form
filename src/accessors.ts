import { FormStateFields } from './data/states'
import { extractFormState } from './hooks/useForm'

export const isValid = <T>(form: FormStateFields<T>): boolean => (
  extractFormState(form).isValid
)

export const submitForm = <T>(form: FormStateFields<T>): void => {
  extractFormState(form).submit()
}

export const cancelForm = <T>(form: FormStateFields<T>): void => {
  extractFormState(form).cancel()
}
