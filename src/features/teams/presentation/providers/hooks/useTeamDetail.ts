import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { Team } from 'features/teams/domain/interfaces'
import GraphQLClientService from 'services/refactor/graphql-service'
import { useMemo } from 'react'
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
