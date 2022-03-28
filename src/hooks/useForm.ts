import { useEffect, useMemo, useRef, useState } from 'react'
import { FormState, FormStateFields } from '../data/states'
import { applyUpdate } from '../data/update'

export function useForm<T>(makeDefaultValue: () => T): FormStateFields<T>
export function useForm<T>(base: T | null | undefined, makeDefaultValue: () => T): FormStateFields<T>
export function useForm<T>(base: T | null | undefined, makeDefaultValue?: () => T): FormStateFields<T> {
  const defaultValue = useDefaultValue(base, makeDefaultValue)

  const [_, setUpdateValue] = useState({})
  const forceUpdate = () => setUpdateValue({})

  const formRef = useRef<FormState<T>>(null as unknown as FormState<T>)
  if (formRef.current === null) {
    formRef.current = {
      currentValue: defaultValue,
      defaultValue,
      fields: createInitialFields(defaultValue, () => formRef.current, forceUpdate),
      isValid: false,

      get hasChanged() {
        return formRef.current.currentValue !== formRef.current.defaultValue
      },

      submitListeners: [],
      cancelListeners: [],

      reset() {
        const { current: form } = formRef
        form.currentValue = form.defaultValue
        for (const key of Object.keys(form.fields)) {
          const field = form.fields[key]
          field.errors = []
          field.hasChanged = false
        }
        form.isValid = false
        forceUpdate()
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

const createInitialFields = <T>(defaultValue: T, getForm: () => FormState<T>, forceUpdate: () => void): FormStateFields<T> => {
  const fields = {} as FormStateFields<T>
  for (const key of Object.keys(defaultValue)) {
    fields[key] = {
      get value() {
        return getForm().currentValue[key]
      },
      setValue(update) {
        const { currentValue, fields } = getForm()
        const newValue = applyUpdate(currentValue[key], update)
        if (currentValue[key] === newValue) {
          return
        }
        currentValue[key] = newValue
        fields[key].hasChanged = true
        runValidators(currentValue, fields)
        forceUpdate()
      },
      hasChanged: false,
      errors: [],
      validators: [],
    }
  }
  return fields
}

const runValidators =  <T>(currentValue: T, fields: FormStateFields<T>) => {
  for (const key of Object.keys(fields)) {
    const errors = []
    const field = fields[key]
    for (const validate of field.validators) {
      const result = validate(field.value, currentValue)
      if (result !== true) {
        errors.push(result)
      }
    }
    field.errors = errors
  }
}
