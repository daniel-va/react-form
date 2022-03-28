
export const privateKey = Symbol('form/private')

export interface Updater<T> {
  (update: Update<T>): void
}

type Update<T> = T | UpdateFn<T>

interface UpdateFn<T> {
  (value: T): T
}

export const applyUpdate = <T>(value: T, update: Update<T>): T => (
  typeof update === 'function'
    ? (update as UpdateFn<T>)(value)
    : update
)
