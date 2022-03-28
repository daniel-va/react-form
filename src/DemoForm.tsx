import React from 'react'
import Form from './components/Form'
import FormField from './components/FormField'
import { useCancel } from './hooks/useCancel'
import { useForm } from './hooks/useForm'
import { useFormActions } from './hooks/useFormActions'
import { useSubmit } from './hooks/useSubmit'
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
      (age) => age >= 0 || 'darf nicht negativ sein',
    ],
  }))

  useSubmit(form, (data) => {
    console.log('submit', data)
  })

  useCancel(form, () => {
    console.log('cancel')
  })

  return (
    <Form state={form}>
      <FormField field={form.name}>{({ errors, ...props }) => (
        <div>
          <input {...props} type="text" onChange={(e) => props.onChange(e.target.value)} />
          <div>
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        </div>
      )}</FormField>

      <FormField field={form.age}>{({ errors, ...props }) => (
        <div>
          <input {...props} type="number" onChange={(e) => props.onChange(e.target.valueAsNumber)} />
          <div>
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        </div>
      )}</FormField>
      <Buttons />
    </Form>
  )
}
export default DemoForm

interface Person {
  name: string
  age: number
}

const Buttons = () => {
  const { isValid, submit, cancel } = useFormActions()
  return (
    <div>
      <button type="button" onClick={submit} disabled={!isValid}>Bestätigen</button>
      <button type="button" onClick={cancel}>Abbrechen</button>
    </div>
  )
}
