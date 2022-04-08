import { Updater } from './update'
import { Validator } from './validate'

/**
 * `FormState` allows access to internal state of a form.
 */
export interface FormState {
  /**
   * Shows if the current value counts as valid.
   * Only valid forms can't be submitted.
   * An invalid form has at least one field with an invalid value.
   */
  isValid: boolean

  /**
   * Shows if the forms current value differs from its default value.
   */
  hasChanged: boolean

  /**
   * Resets the form fields and calls the {@link cancelListeners cancel listeners}.
   * Note that validators and listeners do not get unregistered on cancel.
   */
  cancel(): void

  /**
   * Submits the form by calling the {@link submitListeners submit listeners}.
   * The form is reset in the same way that {@link cancel} does afterwards.
   * <p>
   *   Note that submitting an invalid form will not have any effect.
   * </p>
   */
  submit(): void

  /**
   * Rerun validators.
   */
  validate(): void
}

/**
 * `FormRootState` represents the root state of a form.
 */
export interface FormRootState<T> extends FormState {
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
   * The state of all form fields.
   */
  fields: FormStateFields<T>

  /**
   * Callbacks to invoke when the form is submitted.
   *
   * Listeners can be `null` when they have been unregistered already.
   */
  submitListeners: Array<((value: T) => (void | Promise<void>)) | null>

  /**
   * Callbacks to invoke when the form is cancelled.
   *
   * Listeners can be `null` when they have been unregistered already.
   */
  cancelListeners: Array<(() => (void | Promise<void>)) | null>
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

  isValid: boolean

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
