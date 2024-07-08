import { useMemo } from 'react'
import { isArray } from 'lodash'
import {
  ConditionValue,
  FilterCommonProp,
  TooltipFilterProps,
} from '../../interface'
import { Box } from '@mui/material'

function ControllerFilterWrapper<T, Key extends keyof T>({
  Node,
  keyName,
  control,
}: Omit<TooltipFilterProps<T, Key>, 'title'>) {
  const { filter } = control

  const value = useMemo((): string | string[] => {
    const filterValue = filter?.[keyName]
    if (!filterValue) return ''
    if (isArray(filterValue)) return filterValue.map((o) => o.value)
    return filterValue.value
  }, [filter, keyName])

  const nodeParams: FilterCommonProp<T[Key]> = {
    value,
    onFilter,
  }

  function onFilter(value: ConditionValue<T[Key]> | null) {
    control.onFilter({ keyName: keyName, value })
  }

  return (
    <Box>{Node(nodeParams)}</Box>
  )
}

export default ControllerFilterWrapper
