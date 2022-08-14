import { Validator } from '@daniel-va/validate'
import { useEffect } from 'react'
import { FormStateFields } from '../data/states'
import { extractFormState } from './useForm'

export const useValidate = <T>(fields: FormStateFields<T>, validator: Validator<T>) => {
  useEffect(function initializeValidators() {
    extractFormState(fields).validator = validator
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validator])
}

