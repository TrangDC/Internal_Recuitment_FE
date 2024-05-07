import { useQuery } from '@tanstack/react-query'
import { Member } from 'features/teams/domain/interfaces'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const queryKey = 'user'
const getAllUser = buildQuery({
  operation: 'SelectionUsers',
  options: {
    type: 'query',
  },
  node: `
      edges {
        node {
          id
          name
          work_email
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
    filter: 'UserFilter',
    orderBy: 'UserOrder',
    freeWord: 'UserFreeWord',
  },
})

const useSelectMember = () => {
  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => fetchGraphQL<BaseRecord>(getAllUser.query),
  })

  const members: Member[] =
    data?.[getAllUser.operation]?.edges?.map((item: any) => item?.node) ?? []
  const totalPage = Math.ceil(
    (data?.[getAllUser.operation]?.pagination?.total ?? 0) / 10
  )

  return {
    ...otherValue,
    members,
    totalPage,
  }
}

export default useSelectMember
