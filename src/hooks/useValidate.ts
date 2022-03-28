import { useContext, useEffect, useMemo } from 'react'
import { FormConfigContext } from '../components/FormConfig'
import { FormStateFields } from '../data/states'
import { makeValidate, Validators } from '../data/validate'
import { extractFormState } from './useForm'

export const useValidate = <T>(fields: FormStateFields<T>, makeValidators: (validate: ReturnType<typeof makeValidate>) => Validators<T>) => {
  const { locale } = useContext(FormConfigContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validators = useMemo(() => makeValidators(makeValidate(locale)), [locale])

  useEffect(function initializeValidators() {
    for (const key of Object.keys(fields)) {
      const field = fields[key]
      field.validators = validators[key]
    }
    extractFormState(fields).validate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators])
}

