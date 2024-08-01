import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/hiring-team/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import HiringTeam from 'shared/schema/database/hiring_team'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useRecTeamDetail = (id: String) => {
  const { getTeamDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getTeamDetail.query, {
        id,
      }),
  })

  const teamDetail: HiringTeam = useMemo(() => {
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

export default useRecTeamDetail
