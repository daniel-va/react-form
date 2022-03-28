import React, { createContext } from 'react'
import { Locale, localeEN } from '../data/locale'

interface FormConfig {
  locale: Locale
}

const defaultState: FormConfig = {
  locale: localeEN,
}

export const FormConfigContext = createContext<FormConfig>({ ...defaultState })

interface Props {
  value: Partial<FormConfig>
}

export const FormConfigProvider: React.FC<Props> = ({ value, children }) => {
  return (
    <FormConfigContext.Provider value={{ ...defaultState, ...value }}>
      {children}
    </FormConfigContext.Provider>
  )
}



