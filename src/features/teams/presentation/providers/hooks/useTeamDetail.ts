import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { Team } from 'features/teams/domain/interfaces'

const useTeamDetail = (id: String) => {
  const { getTeamDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => fetchGraphQL<BaseRecord>(getTeamDetail.query, {
      id,
    }),
  })

  const teamDetail: Team =
    data?.[getTeamDetail.operation]?.data ?? {}

  return {
    ...otherValue,
    teamDetail,
  }
}

export default useTeamDetail
