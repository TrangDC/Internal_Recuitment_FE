import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { Member } from 'features/teams/domain/interfaces'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const useSelectionUsers = () => {
  const { selectionUsers, queryKeyUser } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKeyUser],
    queryFn: async () => fetchGraphQL<BaseRecord>(selectionUsers.query),
  })

  const members: Member[] =
    data?.[selectionUsers.operation]?.edges?.map((item: any) => item?.node) ??
    []
  const totalPage = Math.ceil(
    (data?.[selectionUsers.operation]?.pagination?.total ?? 0) / 10
  )

  return {
    ...otherValue,
    members,
    totalPage,
  }
}

export default useSelectionUsers
