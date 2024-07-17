import { useMemo } from 'react'
import { ActionPermission } from '../interfaces/permissionStructure'

function useGetCountChecked(state: ActionPermission[]) {
  const countChecked = useMemo(() => {
    const count = state.reduce((a: number, c) => {
      const number = c.for_all || c.for_owner || c.for_team ? 1 : 0
      return number + a
    }, 0)
    return count
  }, state)

  return countChecked
}

export default useGetCountChecked
