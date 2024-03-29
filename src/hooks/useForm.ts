import { useEffect, useMemo, useRef, useState } from 'react'
import { FormRootState, FormStateFields } from '../data/states'
import { applyUpdate } from '../data/update'

export function useForm<T>(makeDefaultValue: () => T): FormStateFields<T>
export function useForm<T>(base: T | null | undefined, makeDefaultValue: () => T): FormStateFields<T>
export function useForm<T>(base?: T | null, makeDefaultValue?: () => T): FormStateFields<T> {
  const defaultValue = useDefaultValue(base, makeDefaultValue)

  const [_, setUpdateValue] = useState({})

  const formRef = useRef<FormRootState<T>>(null as unknown as FormRootState<T>)
  if (formRef.current === null) {
    const forceUpdate = () => setUpdateValue({})
    formRef.current = {
      currentValue: defaultValue,
      defaultValue,
      fields: createInitialFields(defaultValue, () => formRef.current, forceUpdate),
      isValid: false,
      isSubmitting: false,
      isCancelling: false,

      get hasChanged() {
        return formRef.current.currentValue !== formRef.current.defaultValue
      },

      submitListeners: [],
      cancelListeners: [],

      submit() {
        const { current: form } = formRef
        if (!form.isValid) {
          return
        }
        form.isSubmitting = true
        forceUpdate()
        form.submitListeners.forEach((listen) => listen !== null && listen(form.currentValue))
        form.isSubmitting = false
        resetForm(form)
        forceUpdate()
      },

      cancel() {
        const { current: form } = formRef
        form.isCancelling = true
        resetForm(form)
        forceUpdate()
        form.cancelListeners.forEach((listen) => listen !== null && listen())
        form.isCancelling = false
        forceUpdate()
      },

      validator: null,
      validate() {
        const { current: form } = formRef
        const isValid = runValidators(form)
        if (!isValid || !form.isValid) {
          form.isValid = isValid
          forceUpdate()
        }
      },

      reset() {
        resetForm(formRef.current)
      },
    }
  }

  useEffect(function replaceDefaultValue() {
    formRef.current.defaultValue = defaultValue
    if (!formRef.current.hasChanged) {
      formRef.current.currentValue = defaultValue
    }
  }, [defaultValue])

  return formRef.current.fields
}

const useDefaultValue = <T>(base: T | null | undefined | (() => T), makeDefaultValue?: () => T): T => (
  useMemo(() => {
    if (typeof base === 'function') {
      return (base as (() => T))()
    }
    if (base == null) {
      if (makeDefaultValue === undefined) {
        throw new Error('missing default value')
      }
      return makeDefaultValue()
    }
    return base
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof base === 'function' ? null : base])
)

const createInitialFields = <T>(defaultValue: T, getForm: () => FormRootState<T>, forceUpdate: () => void): FormStateFields<T> => {
  const fields = {
    get [privateKey]() {
      return getForm()
    },
  } as unknown as FormStateFields<T>
  for (const key of Object.keys(defaultValue)) {
    fields[key] = {
      get value() {
        return getForm().currentValue[key]
      },
      isValid: true,
      setValue(update) {
        const form = getForm()
        const newValue = applyUpdate(form.currentValue[key], update)
        if (form.currentValue[key] === newValue) {
          return
        }
        form.currentValue = {
          ...form.currentValue,
          [key]: newValue,
        }
        fields[key].hasChanged = true
        getForm().isValid = runValidators(form)
        forceUpdate()
      },
      hasChanged: false,
      errors: [],
    }
  }
  return fields
}

const runValidators =  <T>(form: FormRootState<T>): boolean => {
  if (form.validator === null) {
    return true
  }
  const result = form.validator(form.currentValue)
  for (const field of Object.keys(result.fields)) {
    const fieldResult = result.fields[field]
    if ('fields' in fieldResult) {
      throw new Error(`unexpected NestedValidatorResult for field '${field}'`)
    }
    form.fields[field].isValid = fieldResult.isValid
    form.fields[field].errors = fieldResult.errors
  }
  return result.isValid
}

const privateKey = Symbol('form/private')

export const extractFormState = <T>(fields: FormStateFields<T>): FormRootState<T> => (
  fields[privateKey] as FormRootState<T>
)

const resetForm = <T>(form: FormRootState<T>) => {
  form.currentValue = form.defaultValue
  for (const key of Object.keys(form.fields)) {
    const field = form.fields[key]
    field.errors = []
    field.hasChanged = false
  }
  form.isValid = runValidators(form)
}
