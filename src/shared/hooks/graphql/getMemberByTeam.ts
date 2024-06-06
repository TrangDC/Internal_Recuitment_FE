import { Member } from 'features/teams/domain/interfaces'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const getAllUser = buildQuery({
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
  const data = await fetchGraphQL<BaseRecord>(getAllUser.query, { id })
  const members: Member[] = data?.[getAllUser.operation]?.data?.members ?? []
  const member_first = members?.[0] ?? {}

  return { members, member_first }
}

export default getMembersByTeam
