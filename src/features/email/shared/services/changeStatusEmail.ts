import { queryClient } from 'index'
import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { STATUS_EMAIL_ENUM } from 'shared/schema/database/email_template'

const updateEmailTemplateStatus = GraphQLClientService.buildQuery({
  operation: 'UpdateEmailTemplateStatus',
  options: {
    type: 'mutation',
  },
  node: ``,
  params: {
    input: 'UpdateEmailTemplateStatusInput!',
    id: 'ID!',
    note: 'String!',
  },
})

const changeStatusEmail = async (id: string, status: STATUS_EMAIL_ENUM) => {
  try {
    await GraphQLClientService.fetchGraphQL(updateEmailTemplateStatus.query, {
      id,
      note: '',
      input: {
        status: status,
      },
    })

    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.EMAIL_TEMPLATE],
    })
  } catch (error) {
    throw Error((error as Error)?.message)
  }

  return true
}

export default changeStatusEmail
