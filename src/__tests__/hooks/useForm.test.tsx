import React from 'react'
import { FormStateFields } from '../../data/states'
import { useForm } from '../../hooks/useForm'
import renderer from 'react-test-renderer'

describe('useForm', () => {
  test('should work', async () => {
    let form!: FormStateFields<TestData>
    renderer.create(<TestComponent onForm={(it) => form = it} />)
    expect(form.name.value).toBe('')
    expect(form.value.value).toBe(0)
    expect(form.nested.value).toBe(nested)
  })
})

interface TestData {
  name: string
  value: number
  nested: typeof nested
}

const nested = { field: 'nested' }

interface Props {
  onForm?: (form: FormStateFields<TestData>) => void
}

const TestComponent: React.FC<Props> = ({ onForm: setForm }) => {
  const form = useForm<TestData>(() => ({
    name: '',
    value: 0,
    nested,
  }))
  setForm && setForm(form)

  return (
    <div>{JSON.stringify(form)}</div>
  )
}
