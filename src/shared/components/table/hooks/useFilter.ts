import { useMemo, useState } from 'react'
import {
  ListFiltersData,
  ParamDelete,
  ParamFilter,
  UseFilter,
  UseFilterReturn,
} from '../interface'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import _, { isArray } from 'lodash'

function useFilter<T>(props: UseFilter<T>): UseFilterReturn<T> {
  const { defaultFilter, formatDataWithValue, cacheData } = props
  const [filter, setFilter] = useState<ListFiltersData<T> | undefined>(
    cacheData
  )

  function onFilter(params: ParamFilter<T>) {
    if (!params.value) {
      handleDeleteKey(params.keyName.toString())
    } else {
      const { value, keyName } = params
      setFilter((prev) => {
        if (!prev)
          return {
            [keyName]: value,
          } as unknown as ListFiltersData<T>
        return {
          ...prev,
          [keyName]: value,
        }
      })
    }
  }

  const dataWithValue = useMemo(() => {
    const result = _.mapValues(filter, (value) => {
      if (IOption.instanceOf(value)) return value.value
      if (isArray(value) && value.length > 0) {
        return value.map((option) => option.value)
      }
      return ''
    })
    return result
  }, [filter])

  function onDelete(params: ParamDelete<T>) {
    const { value, keyName } = params
    const deleteFilter = filter?.[keyName]
    if (isArray(deleteFilter) && filter) {
      const removeData = deleteFilter.filter((item) => item.value !== value)
      if (removeData.length === 0) {
        handleDeleteKey(keyName.toString())
      } else {
        const newFilter = { ..._.set(filter, keyName, removeData) }
        setFilter(newFilter)
      }
    } else {
      handleDeleteKey(keyName.toString())
    }
  }

  function handleDeleteKey(key: string) {
    const newFilter = _.omit(filter, key) as ListFiltersData<T>
    setFilter(newFilter)
  }

  const dataFilterWithValue = formatDataWithValue
    ? formatDataWithValue(filter)
    : {
        ...defaultFilter,
        ...dataWithValue,
      }

  console.log('dataFilterWithValue', dataFilterWithValue)
  return {
    dataFilterWithValue,
    controlFilter: {
      onFilter,
      filter,
      onDelete,
    },
  }
}

export default useFilter
