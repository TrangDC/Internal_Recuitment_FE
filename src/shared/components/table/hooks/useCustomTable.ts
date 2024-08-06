import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { BaseRecord } from 'shared/interfaces'
import { ISearchData } from './useSearchList'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { isEmpty } from 'lodash'
interface IuseCustomTable {
  buildQuery: IBuildQueryReturn
  search?: ISearchData
  filters?: BaseRecord
  queryKey: string
  perPage?: number
  orderBy?: ISorting
}

export interface IPagination {
  page: number
  perPage: number
  orderBy: ISorting
  state: 'INIT' | 'RUNNING'
}

interface ISorting {
  direction: 'ASC' | 'DESC'
  field: string
}

export interface IuseCustomTableReturn {
  isLoading: boolean
  error: Error | null
  sortData: any[]
  handleChangePage: (page: number) => void
  handleChangePerPage: (perPage: number) => void
  handleSorTable: (id: string) => void
  totalPage: number
  totalRecord: number
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
  const [pagination, setPagination] = useState<IPagination>({
    orderBy: orderBy || {
      direction: 'DESC',
      field: 'created_at',
    },
    page: 1,
    perPage: 10,
    state: 'INIT',
  })

  const customKey = {
    pagination,
    filters,
    search,
  }
  const { isLoading, error, data, refetch } = useQuery({
    gcTime: 0,
    queryKey: [queryKey, customKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(buildQuery, {
        orderBy: {
          ...pagination.orderBy,
        },
        filter: filters,
        freeWord: search,
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
        },
      }),
  })

  const { sortData, totalPage, totalRecord } = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const total = response?.[buildQuery.operation]?.pagination?.total ?? 0
      const totalPage = Math.ceil(total / pagination.perPage)
      const sortData =
        response?.[buildQuery.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return {
        totalPage,
        sortData,
        totalRecord: total,
      }
    }
    return {
      sortData: [],
      totalPage: perPage,
      totalRecord: 0,
    }
  }, [data, buildQuery.operation, pagination])

  function handleChangePage(page: number) {
    setPagination((prev) => ({ ...prev, page: page }))
  }

  function handleChangePerPage(perPage: number) {
    setPagination((prev) => ({
      ...prev,
      perPage: perPage,
    }))
  }

  // function changeUrl(page: number, perPage: number) {
  //   const newUrl = `${location.pathname}?page=${page}&perPage=${perPage}`
  //   window.history.replaceState(undefined, '', newUrl)
  // }

  function handleSorTable(id: string) {
    const sortDefault = orderBy?.field ? orderBy?.field : 'created_at'
    setPagination((prev) => {
      if (id === prev.orderBy.field) {
        const isDescending = prev.orderBy.direction === 'DESC'
        const fieldSort = isDescending ? orderBy?.field || sortDefault : id
        let directionSort =
          fieldSort === sortDefault
            ? prev.orderBy.field === sortDefault
              ? prev.orderBy.direction === 'ASC'
                ? 'DESC'
                : 'ASC'
              : 'DESC'
            : prev.orderBy.direction === 'ASC'
              ? 'DESC'
              : 'ASC'

        const sortBy = {
          direction: directionSort,
          field: fieldSort,
        } as ISorting
        return {
          ...prev,
          orderBy: sortBy,
        }
      }

      return {
        ...prev,
        orderBy: {
          direction: 'ASC',
          field: id,
        },
      }
    })
  }

  useEffect(() => {
    if (isEmpty(sortData) && pagination.page > 1 && !isLoading) {
      handleChangePage(pagination.page - 1)
    }
  }, [sortData, pagination, isLoading])

  // useUpdateStateTableByUrl({
  //   setPagination,
  // })

  return {
    isLoading,
    error,
    sortData,
    handleChangePage,
    handleSorTable,
    totalPage,
    handleChangePerPage,
    refetch,
    totalRecord,
    variables: {
      pagination: pagination,
      sortBy: pagination.orderBy,
    },
  }
}

export default useCustomTable
