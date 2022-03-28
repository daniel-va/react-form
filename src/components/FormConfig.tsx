import React, { createContext } from 'react'
import { Locale, localeEN } from '../data/locale'

interface GlobalFormState {
  locale: Locale
}

const defaultState: GlobalFormState = {
  locale: localeEN,
}

export const GlobalFormContext = createContext<GlobalFormState>({ ...defaultState })

interface Props {
  value: Partial<GlobalFormState>
}

export const FormConfigProvider: React.FC<Props> = ({ value, children }) => {
  return (
    <GlobalFormContext.Provider value={{ ...defaultState, ...value }}>
      {children}
    </GlobalFormContext.Provider>
  )
}



