import { useQuery } from '@tanstack/react-query'
import { Job } from 'features/jobs/domain/interfaces'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const queryKey = 'job'
const getJobByTeamId = buildQuery({
  operation: 'GetAllHiringJobs',
  options: {
    type: 'query',
  },
  node: `
      edges {
        node {
          id
          name
        }
      }
      pagination {
        page
        perPage
        total
      }
    `,
  params: {
    pagination: 'PaginationInput',
    filter: 'HiringJobFilter',
    orderBy: 'HiringJobOrder',
    freeWord: 'HiringJobFreeWord',
  },
})

const useSelectJobByTeam = () => {
  const [filter, setFilter] = useState<{team_ids: string[]}>({team_ids: []})

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey, filter],
    queryFn: async () =>
      fetchGraphQL<BaseRecord>(getJobByTeamId.query, {
        filter: {
          ...filter,
        },
      }),
  })

  const jobs: Job[] =
    data?.[getJobByTeamId.operation]?.edges?.map((item: any) => item?.node) ??
    []
  const totalPage = Math.ceil(
    (data?.[getJobByTeamId.operation]?.pagination?.total ?? 0) / 10
  )

  function changeJobByTeamId(ids: string[]) {
    setFilter({ team_ids: ids })
  }

  return {
    ...otherValue,
    jobs: !isEmpty(filter.team_ids) ? jobs : [],
    totalPage,
    changeJobByTeamId,
  }
}

export default useSelectJobByTeam
