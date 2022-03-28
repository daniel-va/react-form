import { Locale } from './locale'

export interface Validator<T, V> {
  (value: V, record: T): true | string
}

export type Validators<T> = {
  [K in keyof T]: Array<Validator<T, T[K]>>
}


export const makeValidate = ({ messages }: Locale) => ({
  notNull: <T, V extends unknown | null | undefined>(
    options: { message?: string } = {}
  ): Validator<T, V> => (value) => {
    const {
      message = messages.mustNotBeNull,
    } = options
    if (value == null) {
      return message
    }
    return true
  },
  notEmpty: <T, V extends { length: number } | null | undefined>(
    options: { message?: string, allowNull?: boolean } = {}
  ): Validator<T, V> => (value) => {
    const message = options.message ?? messages.mustNotBeEmpty
    const allowNull = options.allowNull ?? false
    if (value == null) {
      return allowNull || message
    }
    if (value.length === 0) {
      return message
    }
    return true
  },
  notBlank: <T, V extends string | null | undefined>(
    options: { message?: string, allowNull?: boolean } = {}
  ): Validator<T, V> => (value) => {
    const message = options.message ?? messages.mustNotBeBlank
    const allowNull = options.allowNull ?? false

    if (value == null) {
      return allowNull || message
    }
    return value.trim().length !== 0 || message
  },
  match: <T, V extends string | null | undefined>(
    pattern: RegExp, options: { message?: string } = {}
  ): Validator<T, V> => (value) => {
    const {
      message = messages.isInvalid,
    } = options
    if (value != null && !pattern.test(value as string)) {
      return message
    }
    return true
  },
  minLength: <T, V extends { length: number } | null | undefined>(
    min: number, options: { message?: string } = {}
  ): Validator<T, V> => (value) => {
    const {
      message = messages.isTooShort(min),
    } = options
    if (value != null && value.length < min) {
      return message
    }
    return true
  },
  maxLength: <T, V extends { length: number } | null | undefined>(
    max: number, options: { message?: string } = {}
  ): Validator<T, V> => (value) => {
    const {
      message = messages.isTooLong(max),
    } = options
    if (value != null && value.length < max) {
      return message
    }
    return true
  },
})
