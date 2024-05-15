import { useQuery } from '@tanstack/react-query'
import { Team } from 'features/teams/domain/interfaces'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const queryKey = 'team'
const getAllTeam = buildQuery({
  operation: 'GetAllTeams',
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
    filter: 'TeamFilter',
    orderBy: 'TeamOrderBy!',
    freeWord: 'TeamFreeWord',
  },
})

const useSelectTeam = () => {
  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      fetchGraphQL<BaseRecord>(getAllTeam.query, {
        orderBy: { direction: 'DESC', field: 'created_at' },
      }),
  })

  const teams: Team[] =
    data?.[getAllTeam.operation]?.edges?.map((item: any) => item?.node) ?? []
  const totalPage = Math.ceil(
    (data?.[getAllTeam.operation]?.pagination?.total ?? 0) / 10
  )

  return {
    ...otherValue,
    teams,
    totalPage,
  }
}

export default useSelectTeam
