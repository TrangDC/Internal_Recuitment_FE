import { useFormContext } from 'react-hook-form'
import { getKeyName } from '../utils/utils'

export const defaultValue = {
  for_all: false,
  for_owner: false,
  for_team: false,
}

function useResetValue() {
  const { setValue } = useFormContext()
  function resetValue(ids: (string | undefined)[]) {
    ids.forEach((id) => {
      if (id) setValue(getKeyName(id), defaultValue)
    })
  }
  return {
    resetValue,
  }
}

export default useResetValue
