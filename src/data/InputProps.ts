/**
 * Properties which a React input component has to support in order
 * to work seamlessly with this library.
 *
 * It is expected that every such input supports nullable types.
 */
export interface InputProps<T> {
  value: T | null
  onChange?: (value: T | null) => void
  errors?: string[]
}
