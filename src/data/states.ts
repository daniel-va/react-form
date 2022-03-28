import { Updater } from './update'
import { Validator } from './validate'

/**
 * `FormState` represents the root state of a form.
 */
export interface FormState<T> {
  /**
   * The forms current value.
   * It tracks changes, and is the single source of truth for input fields.
   */
  currentValue: T

  /**
   * The forms default value.
   * {@link currentValue} will be initialized to this value,
   * and also be reset to it when the form gets submitted or cancelled.
   */
  defaultValue: T

  /**
   * Shows if the current value counts as valid.
   * Only valid forms can't be submitted.
   * An invalid form has at least one field with an invalid value.
   */
  isValid: boolean

  /**
   * Shows if the {@link value} differs from the forms {@link FormState.defaultValue default value}.
   */
  hasChanged: boolean

  /**
   * The state of all form fields.
   */
  fields: FormStateFields<T>

  /**
   * Callbacks to invoke when the form is submitted.
   */
  submitListeners: Array<(value: T) => (void | Promise<void>)>

  /**
   * Callbacks to invoke when the form is cancelled.
   */
  cancelListeners: Array<() => (void | Promise<void>)>

  /**
   * Resets the form to its initial state.
   * Note that validators and listeners do not get unregistered on reset.
   */
  reset(): void
}

/**
 * `FormStateFields` contains the state of the form values' fields.
 */
export type FormStateFields<T> = {
  [K in keyof T]: FormFieldState<T, K>
}


export interface FormFieldState<T, K extends keyof T> {
  /**
   * The fields current value.
   */
  readonly value: T[K]

  /**
   * Updates the fields {@link value}.
   */
  setValue: Updater<T[K]>

  /**
   * Shows if the {@link value} has been modified since the form has been initialized.
   */
  hasChanged: boolean

  /**
   * The fields errors.
   * This value being empty indicates that the field is valid.
   */
  errors: string[]

  /**
   * The validators for this field.
   * Run whenever any form value changes.
   */
  validators: Validator<T, T[K]>[]
}