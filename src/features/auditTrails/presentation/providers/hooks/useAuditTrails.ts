import { useInfiniteQuery } from '@tanstack/react-query'
import { cloneDeep } from 'lodash'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { CustomGraphQLResponse } from 'shared/interfaces/response'
import User from 'shared/schema/database/user'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { FilterAuditTrails, FreeWordAuditTrails } from '../context'
import { ModuleAuditTrails } from '../../page-sections/HistoryLog'

const queryKey = MODLUE_QUERY_KEY.AUDIT_TRAILS
const GetAllAuditTrails = GraphQLClientService.buildQuery({
  operation: 'GetAllAuditTrails',
  options: {
    type: 'query',
  },
  node: `
    edges {
        node {
            id
            recordId
            module
            actionType
            note
            createdInfo {
                id
                name
                work_email
            }
            record_changes
            createdAt
            updatedAt
        }
    } 
    pagination {
      page
      perPage
      total
    }
    `,
  params: {
    filter: 'AuditTrailFilter',
    orderBy: 'AuditTrailOrder',
    freeWord: 'AuditTrailFreeWord',
    pagination: 'PaginationInput',
  },
})
const PER_PAGE = 10

export type AuditTrailsJob = {
  id: string
  createdBy: string
  createdInfo: User
  recordId: string
  module: string
  actionType: string
  note: string
  record_changes: string
  createdAt: string
  updatedAt: string
}

interface IAuditTrailsProps {
  recordId: string
  module: ModuleAuditTrails
  variable: {
    filter: FilterAuditTrails,
    freeWord: FreeWordAuditTrails,
  }
}

const useAuditTrails = ({module, recordId, variable}: IAuditTrailsProps) => {
  const fetchAuditTrails = async ({ pageParam }: { pageParam: number }) => {
    return GraphQLClientService.fetchGraphQL(GetAllAuditTrails, {
      filter: {
        recordId,
        module,
        ...variable.filter,
      },
      freeWord: {
        ...variable.freeWord,
      },
      pagination: {
        page: pageParam,
        perPage: PER_PAGE,
      },
    })
  }

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey, variable.filter, variable.freeWord],
    queryFn: fetchAuditTrails,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
  })

  function handleGetRightData(rightData: CustomGraphQLResponse | undefined) {
    const cloneData = cloneDeep(rightData)
    if (cloneData && isRight(cloneData)) {
      const response = unwrapEither(cloneData)
      const totalRecords =
        response?.[GetAllAuditTrails.operation]?.pagination?.total
      const sortData: AuditTrailsJob[] =
        response?.[GetAllAuditTrails.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      return {
        totalRecords,
        auditTrails_history: sortData,
      }
    }
    return {
      auditTrails_history: [],
      totalRecords: 0,
    }
  }

  const { auditTrails_history, totalRecord } = useMemo(() => {
    const pages = data?.pages ?? []
    let totalRecord = 0;

    const listRecord = pages.flatMap((item) => {
      const { totalRecords, auditTrails_history } = handleGetRightData(item)
      if(!totalRecord) totalRecord = totalRecords;
      return auditTrails_history
    })
    
    return {
      auditTrails_history: listRecord,
      totalRecord,
    }
  }, [data])

  return {
    auditTrails_history: auditTrails_history,
    totalRecord,
    fetchNextPage
  }
}

export default useAuditTrails
