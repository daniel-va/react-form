import { createContext } from 'react'
import { FormState } from '../data/states'

interface FormContextState {
  state: FormState<unknown> | null
}

const FormContext = createContext<FormContextState>({
  state: null,
})
export default FormContext
