import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { BaseRecord } from 'shared/interfaces'
import { ISearchData } from './useSearchList'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
interface IuseCustomTable {
  buildQuery: IBuildQueryReturn
  search?: ISearchData
  filters?: BaseRecord
  queryKey: string
  perPage?: number
  orderBy?: ISorting
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
  totalPage: number
  refetch: () => void
  variables: {
    pagination: IPagination
    sortBy: ISorting
  }
}

const useCustomTable = ({
  buildQuery,
  filters,
  perPage = 10,
  search,
  queryKey,
  orderBy,
}: IuseCustomTable): IuseCustomTableReturn => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const initialPage = params.get('page') ? Number(params.get('page')) : 1
  const initialPerPage = params.get('perPage')
    ? Number(params.get('perPage'))
    : perPage
  const [pagination, setPagination] = useState<IPagination>({
    page: initialPage,
    perPage: initialPerPage,
  })
  const [sorting, setSorting] = useState<ISorting>(
    orderBy || {
      direction: 'DESC',
      field: 'created_at',
    }
  )
  const { isLoading, error, data, refetch } = useQuery({
    // gcTime: 0,
    queryKey: [
      queryKey,
      pagination.page,
      pagination.perPage,
      sorting,
      filters,
      search,
    ],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(buildQuery.query, {
        orderBy: {
          ...sorting,
        },
        filter: filters,
        freeWord: search,
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
        },
      }),
  })

  const { sortData, totalPage } = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const totalPage = Math.ceil(
        (response?.[buildQuery.operation]?.pagination?.total ?? 0) / perPage
      )
      const sortData =
        response?.[buildQuery.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      return {
        totalPage,
        sortData,
      }
    }
    return {
      sortData: [],
      totalPage: perPage,
    }
  }, [data, buildQuery.operation, perPage])

  function handleChangePage(page: number) {
    navigate(`${location.pathname}?page=${page}&perPage=${10}`, {
      replace: true,
      state: { current: initialPage },
    })
    setPagination((prev) => ({ ...prev, page: page }))
  }

  function handleSorTable(id: string) {
    const sortDefault = orderBy?.field ? orderBy?.field : 'created_at'
    //@ts-ignore
    setSorting((prev) => {
      if (id === prev.field) {
        const isDescending = prev.direction === 'DESC'
        const fieldSort = isDescending ? orderBy?.field || sortDefault : id

        let directionSort =
          fieldSort === sortDefault
            ? prev.field === sortDefault
              ? prev.direction === 'ASC'
                ? 'DESC'
                : 'ASC'
              : 'DESC'
            : prev.direction === 'ASC'
              ? 'DESC'
              : 'ASC'

        return {
          direction: directionSort,
          field: fieldSort,
        }
      }

      return {
        direction: 'ASC',
        field: id,
      }
    })
  }

  return {
    isLoading,
    error,
    sortData,
    handleChangePage,
    handleSorTable,
    totalPage,
    refetch,
    variables: {
      pagination: pagination,
      sortBy: sorting,
    },
  }
}

export default useCustomTable
