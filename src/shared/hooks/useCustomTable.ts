import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { IbuildQueryReturn, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
interface IuseCustomTable {
  buildQuery: IbuildQueryReturn
  variables: any
  queryKey: string
}

interface IPagination {
  page: number
  perPage: number
}

export interface IuseCustomTableReturn {
  isLoading: boolean
  error: Error | null
  sortData: []
  handleChangePage: (page: number) => void
  pagination: IPagination
  totalPage: number
  refetch: () => void
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

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [queryKey, pagination.page, pagination.perPage],
    queryFn: async () =>
      fetchGraphQL<BaseRecord>(buildQuery.query, {
        ...variables,
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
  return {
    isLoading,
    error,
    sortData,
    handleChangePage,
    pagination,
    totalPage,
    refetch,
  }
}

export default useCustomTable
