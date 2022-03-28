
export interface Locale {
  messages: {
    mustNotBeNull: string,
    mustNotBeEmpty: string,
    mustNotBeBlank: string,
    isInvalid: string,
    isTooShort: (min: number) => string,
    isTooLong: (max: number) => string,
  }
}

export const localeEN: Locale = {
  messages: {
    mustNotBeNull: 'must not be empty',
    mustNotBeEmpty: 'must not be empty',
    mustNotBeBlank: 'must not be blank',
    isInvalid: 'is invalid',
    isTooShort: (min: number) => `must have at least ${min} letters`,
    isTooLong: (max: number) => `must have at most ${max} letters`,
  },
}

export const localeDE: Locale = {
  messages: {
    mustNotBeNull: 'darf nicht leer sein',
    mustNotBeEmpty: 'darf nicht leer sein',
    mustNotBeBlank: 'darf nicht leer sein',
    isInvalid: 'ist ungültig',
    isTooShort: (min: number) => `muss mindestens ${min} Zeichen lang sein`,
    isTooLong: (max: number) => `darf höchstens ${max} Zeichen lang sein`,
  },
}
