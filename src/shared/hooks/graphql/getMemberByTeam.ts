import GraphQLClientService from 'services/graphql-service'
import User from 'shared/schema/database/user'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const getAllUser = GraphQLClientService.buildQuery({
  operation: 'GetHiringTeam',
  options: {
    type: 'query',
  },
  node: `
    data {
        id
        name
        managers {
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
  managers: User[]
  managers_first: User
}

const getMembersByTeam = async (id: string): Promise<getMemberByTeam> => {
  const data = await GraphQLClientService.fetchGraphQL(getAllUser, { id })
  let managers: User[] = []
  if (data && isRight(data)) {
    managers = unwrapEither(data)?.[getAllUser.operation]?.data?.managers ?? []
  }
  const managers_first = managers?.[0] ?? {}
  return { managers, managers_first }
}

export default getMembersByTeam
