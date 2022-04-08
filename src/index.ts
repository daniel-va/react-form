
export { default as Form } from 'src/components/Form'
export { default as FormField } from 'src/components/FormField'
export { FormConfigProvider } from 'src/components/FormConfig'

export type { InputProps } from 'src/data/InputProps'
export type { FormState, FormStateFields, FormFieldState } from 'src/data/states'
export type { Validator, Validators } from 'src/data/validate'
export * from 'src/data/locale'

export { useForm } from 'src/hooks/useForm'
export { useFormState } from 'src/hooks/useFormState'
export { useValidate } from 'src/hooks/useValidate'
export { useSubmit } from 'src/hooks/useSubmit'
export { useCancel } from 'src/hooks/useCancel'

/**
 * Utility method to initialise non-nullable values with `null`.
 * <p>
 *   This is mainly meant to be used in forms, where <code>null</code> as a default value
 *   makes sense, but the actual type of the field does not allow it.
 * </p>
 * <p>
 *   Make sure to use a validator that disallows <code>null</code> values to ensure
 *   that your final form data will remain type safe.
 * </p>
 */
export const nullValue = <T>(): T => null as unknown as T

// export { default as DemoForm } from './DemoForm'
//
// export { default as React } from 'react'
// export { default as ReactDOM } from 'react-dom'
