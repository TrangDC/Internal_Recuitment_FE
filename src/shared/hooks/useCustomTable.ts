import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { IbuildQueryReturn, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { removeNonExistInObj } from 'shared/utils/utils'
interface IuseCustomTable {
  buildQuery: IbuildQueryReturn
  variables: any
  queryKey: string
}

interface IPagination {
  page: number
  perPage: number
}

interface ISorting {
  direction: 'ASC' | 'DESC'
  field: string
}

export interface IuseCustomTableReturn {
  isLoading: boolean
  error: Error | null
  sortData: []
  handleChangePage: (page: number) => void
  handleSorTable: (id: string) => void
  handleFreeWord: (key: string, value: string) => void
  handleFilter: (key: string, value: any) => void
  totalPage: number
  refetch: () => void
  variables: {
    pagination: IPagination,
    sortBy: ISorting,
  }
}

const useCustomTable = ({
  buildQuery,
  variables,
  queryKey,
}: IuseCustomTable): IuseCustomTableReturn => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const initialPage = params.get('page') ? Number(params.get('page')) : 1
  const initialPerPage = params.get('perPage')
    ? Number(params.get('perPage'))
    : 10
  const [pagination, setPagination] = useState<IPagination>({
    page: initialPage,
    perPage: initialPerPage,
  })
  const [sorting, setSorting] = useState<ISorting>(variables?.sorting || {
    direction: 'DESC',
    field: 'created_at',
  })
  const [freeWord, setFreeWord] = useState<Record<string, any>>(variables?.freeWord || {});
  const [filter, setFilter] = useState<Record<string, any>>(variables?.filter || {});
  console.log("🚀 ~ filter:", filter)

  const { isLoading, error, data, refetch } = useQuery({
    // gcTime: 0,
    queryKey: [queryKey, pagination.page, pagination.perPage, sorting, freeWord, filter],
    queryFn: async () =>
      fetchGraphQL<BaseRecord>(buildQuery.query, {
        ...variables,
        orderBy: {
          ...sorting,
        },
        freeWord: {
          ...freeWord,
        },
        filter: {
          ...filter,
        },
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
        },
      }),
  })
  const sortData =
    data?.[buildQuery.operation]?.edges?.map((item: any) => item?.node) ?? []
  const totalPage = Math.ceil(
    (data?.[buildQuery.operation]?.pagination?.total ?? 0) / 10
  )

  function handleChangePage(page: number) {
    navigate(`${location.pathname}?page=${page}&perPage=${10}`, {
      replace: true,
      state: { current: initialPage },
    })
    setPagination((prev) => ({ ...prev, page: page }))
  }

  function handleSorTable(id: string) {
    setSorting((prev) => ({
      direction:
        id !== prev.field ? 'DESC' : prev.direction === 'DESC' ? 'ASC' : 'DESC',
      field: id ? id : 'created_at',
    }))
  }

  function handleFreeWord(key: string, value: string) {
    setFreeWord((prev) => ({...prev, [key]: value}))
  }

  function handleFilter(key: string, value: string) {
    setFilter((prev) => (removeNonExistInObj({...prev, [key]: value})))
  }

  return {
    isLoading,
    error,
    sortData,
    handleChangePage,
    handleSorTable,
    handleFreeWord,
    handleFilter,
    totalPage,
    refetch,
    variables: {
      pagination: pagination,
      sortBy: sorting,
    }
  }
}

export default useCustomTable
