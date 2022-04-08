import { createContext } from 'react'
import { FormRootState } from '../data/states'

interface FormContextState {
  state: FormRootState<unknown> | null
}

const FormContext = createContext<FormContextState>({
  state: null,
})
export default FormContext
