import { AutocompleterItemSpec } from '../types'

export const handleFilterData = (
  actions: AutocompleterItemSpec[],
  pattern: string
) => {
  const filterByPattern = actions.filter((receiver) => {
    if (receiver.type === 'separator') return true

    return receiver?.text?.toLocaleLowerCase().includes(pattern.toLocaleLowerCase())
  })

  return filterByPattern.length > 2 ? filterByPattern : []
}
