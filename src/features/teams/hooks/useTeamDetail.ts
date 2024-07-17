import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { Team } from 'features/teams/domain/interfaces'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useTeamDetail = (id: String) => {
  const { getTeamDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getTeamDetail.query, {
        id,
      }),
  })

  const teamDetail: Team = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getTeamDetail.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    teamDetail,
  }
}

export default useTeamDetail
