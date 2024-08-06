import { useQuery } from '@tanstack/react-query'
import { cloneDeep } from 'lodash'
import { useMemo, useState } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import User from 'shared/schema/database/user'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const queryKey = 'audittrails'
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
    `,
  params: {
    filter: 'AuditTrailFilter',
    orderBy: 'AuditTrailOrder',
    freeWord: 'AuditTrailFreeWord',
    pagination: 'PaginationInput',
  },
})

type AuditTrailsJob = {
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
}[]

const useAuditTrails = (recordId: string, module: string) => {
  const [filter, setFilter] = useState<Record<string, any>>({})
  const [freeWord, setFreeWord] = useState<Record<string, string>>({})

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey, filter, freeWord],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(GetAllAuditTrails, {
        filter: {
          recordId,
          module,
          ...filter,
        },
        freeWord: {
          ...freeWord,
        },
      }),
  })

  const { auditTrails_history, totalPage } = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const totalPage = Math.ceil(
        (response?.[GetAllAuditTrails.operation]?.pagination?.total ?? 0) / 10
      )
      const sortData: AuditTrailsJob =
        response?.[GetAllAuditTrails.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      return {
        totalPage,
        auditTrails_history: sortData,
      }
    }
    return {
      auditTrails_history: [],
      totalPage: 10,
    }
  }, [data, GetAllAuditTrails.operation])

  const handleFilter = (key: string, value: any) => {
    const cloneFilter = cloneDeep(filter)
    cloneFilter[key] = value
    setFilter(cloneFilter)
  }

  const handleFreeWord = (key: string, value: any) => {
    const cloneFreeWord = cloneDeep(freeWord)
    cloneFreeWord[key] = value

    setFreeWord(cloneFreeWord)
  }

  const handleMultipleFilter = (record: BaseRecord) => {
    setFilter((prev) => ({ ...prev, ...record }))
  }

  return {
    ...otherValue,
    auditrails_history: auditTrails_history,
    totalPage,
    handleFilter,
    handleFreeWord,
    handleMultipleFilter,
  }
}

export default useAuditTrails
