import { Member } from 'features/teams/domain/interfaces'
import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const getAllUser = GraphQLClientService.buildQuery({
  operation: 'GetTeam',
  options: {
    type: 'query',
  },
  node: `
    data {
        id
        name
        members {
            id
            name
            work_email
        }
      }
    `,
  params: {
    id: 'ID!',
  },
})

type getMemberByTeam = {
  members: Member[]
  member_first: Member
}

const getMembersByTeam = async (id: string): Promise<getMemberByTeam> => {
  const data = await GraphQLClientService.fetchGraphQL(getAllUser.query, { id })
  let members: Member[] = []
  if (data && isRight(data)) {
    members = unwrapEither(data)?.[getAllUser.operation]?.data?.members ?? []
  }
  const member_first = members?.[0] ?? {}
  return { members, member_first }
}

export default getMembersByTeam
