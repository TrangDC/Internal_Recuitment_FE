import { ApolloError, OperationVariables, useQuery } from '@apollo/client'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { IbuildQueryReturn } from 'services/graphql-services'

interface IuseCustomTable {
  buildQuery: IbuildQueryReturn
  variables: OperationVariables
}

interface IPagination {
  page: number
  perPage: number
}

export interface IuseCustomTableReturn {
  loading: boolean
  error?: ApolloError
  sortData: []
  handleChangePage: (page: number) => void
  pagination: IPagination
  totalPage: number
}

const useCustomTable = ({
  buildQuery,
  variables,
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
  const { loading, error, data } = useQuery(buildQuery.query, {
    variables: {
      ...variables,
      pagination: {
        page: pagination.page,
        perPage: pagination.perPage,
      },
    },
  })

  const sortData =
    data?.[buildQuery.operation]?.edges?.map((item: any) => item?.node) ?? []

  const totalPage = Math.ceil(
    (data?.[buildQuery.operation]?.pagination?.total ?? 0) / 10
  )

  function handleChangePage(page: number) {
    params.set('page', page.toString())
    navigate(`${location.pathname}?page=${page}&perPage=${10}`, {
      replace: true,
      state: { current: initialPage },
    })
    setPagination((prev) => ({ ...prev, page: page }))
  }

  return {
    loading,
    error,
    sortData,
    handleChangePage,
    pagination,
    totalPage,
  }
}

export default useCustomTable
