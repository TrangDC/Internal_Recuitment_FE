import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/rec-team/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import RecTeam from 'shared/schema/database/rec_team'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useRecTeamDetail = (id: String) => {
  const { getRecTeamDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getRecTeamDetail, {
        id,
      }),
  })

  const rec_team_detail: RecTeam = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getRecTeamDetail.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    rec_team_detail,
  }
}

export default useRecTeamDetail
