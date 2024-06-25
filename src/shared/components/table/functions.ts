import { InterfaceGenerate, ValueTypes } from './interface'

export function createSchemaFilter<T extends Record<string, ValueTypes>>(
  keys: T
): InterfaceGenerate<T> {
  const transformedKeys = {} as InterfaceGenerate<T>
  Object.keys(keys).forEach((key) => {
    if (keys[key] === 'string[]') {
      ;(transformedKeys as any)[key] = [] as string[]
    } else {
      ;(transformedKeys as any)[key] = '' as string
    }
  })
  return transformedKeys
}
