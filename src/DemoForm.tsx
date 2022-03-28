import React from 'react'
import FormField from './components/FormField'
import { useForm } from './hooks/useForm'
import { useValidate } from './hooks/useValidate'

const DemoForm = () => {
  const form = useForm<Person>(() => ({
    name: '',
    age: 0,
  }))

  useValidate(form, (validate) => ({
    name: [
      validate.notBlank(),
    ],
    age: [
      (age) => age > 0 || 'muss grösser als 0 sein',
    ],
  }))

  return (
    <form>
      <FormField field={form.name}>{({ errors, ...props }) => (
        <div>
          <input {...props} type="text" onChange={(e) => props.onChange(e.target.value)} />
          {errors.join('<br>')}
        </div>
      )}</FormField>

      <FormField field={form.age}>{({ errors, ...props }) => (
        <div>
          <input {...props} type="number" onChange={(e) => props.onChange(e.target.valueAsNumber)} />
          {errors.join('<br>')}
        </div>
      )}</FormField>
    </form>
  )
}
export default DemoForm

interface Person {
  name: string
  age: number
}
