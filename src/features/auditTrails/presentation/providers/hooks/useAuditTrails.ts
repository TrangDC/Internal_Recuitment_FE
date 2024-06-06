import { useQuery } from '@tanstack/react-query'
import { Member } from 'features/teams/domain/interfaces'
import { cloneDeep } from 'lodash'
import { useState } from 'react'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const queryKey = 'audittrails'
const GetAllAuditTrails = buildQuery({
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
  createdInfo: Member
  recordId: string
  module: string
  actionType: string
  note: string
  record_changes: string
  createdAt: string
  updatedAt: string
}[]

const useAuditTrails = (recordId: string, module: string) => {
  const [filter, setFilter] = useState<Record<string, any>>({});
  const [freeWord, setFreeWord]= useState<Record<string, string>>({});

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey, filter, freeWord],
    queryFn: async () =>
      fetchGraphQL<BaseRecord>(GetAllAuditTrails.query, {
        filter: {
          recordId,
          module,
          ...filter,
        },
        freeWord: {
          ...freeWord,
        }
      }),
  })

  const auditrails_history: AuditTrailsJob =
    data?.[GetAllAuditTrails.operation]?.edges?.map(
      (item: any) => item?.node
    ) ?? []

  const totalPage = Math.ceil(
    (data?.[GetAllAuditTrails.operation]?.pagination?.total ?? 0) / 10
  )

  const handleFilter = (key: string, value: any) => {
   const cloneFilter = cloneDeep(filter);
   cloneFilter[key] = value;
   setFilter(cloneFilter);
  }

  const handleFreeWord = (key: string, value: any) => {
    const cloneFreeWord = cloneDeep(freeWord);
    cloneFreeWord[key] = value;
 
    setFreeWord(cloneFreeWord);
   }

  return {
    ...otherValue,
    auditrails_history: auditrails_history,
    totalPage,
    handleFilter,
    handleFreeWord,
  }
}

export default useAuditTrails
