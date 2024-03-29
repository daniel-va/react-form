import { createValidator, validate } from '@daniel-va/validate'
import React from 'react'
import Form from './components/Form'
import FormField from './components/FormField'
import { useCancel } from './hooks/useCancel'
import { useForm } from './hooks/useForm'
import { useFormState } from './hooks/useFormState'
import { useSubmit } from './hooks/useSubmit'
import { useValidate } from './hooks/useValidate'

const DemoForm: React.FC = () => {
  const form = useForm<Person>(() => ({
    name: '',
    age: 0,
    mood: null,
  }))

  useValidate(form, createValidator<Person>({
    name: [
      validate.notBlank(),
    ],
    age: [
      (age) => age >= 0 || 'darf nicht negativ sein',
    ],
    mood: [
      validate.notNull(),
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
      <FormField field={form.name}>{({ value, onChange, errors }) => (
        <div>
          <input value={value ?? ''} type="text" onChange={(e) => onChange(e.target.value)} />
          <div>
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        </div>
      )}</FormField>

      <FormField field={form.age}>{({ value, onChange, errors }) => (
        <div>
          <input value={value ?? 0} type="number" onChange={(e) => onChange(e.target.valueAsNumber)} />
          <div>
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        </div>
      )}</FormField>

      <FormField field={form.mood}>{({ value, onChange, errors }) => (
        <div>
          <div>
            {value ?? 'null'}
          </div>
          <input value={value ?? ''} type="string" onChange={(e) => onChange(e.target.value.length === 0 ? null : e.target.value)} />
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
  mood: string | null
}

const Buttons = () => {
  const form = useFormState()
  return (
    <div>
      <button type="button" onClick={form.submit} disabled={!form.isValid}>Bestätigen</button>
      <button type="button" onClick={form.cancel}>Abbrechen</button>
    </div>
  )
}
