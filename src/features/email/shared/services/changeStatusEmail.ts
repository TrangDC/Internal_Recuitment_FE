import { queryClient } from 'index'
import {fetchGraphQL } from 'services/graphql-services'
import GraphQLClientService from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import {
  STATUS_EMAIL_ENUM,
} from 'shared/schema/database/email_template'

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
    await fetchGraphQL<BaseRecord>(updateEmailTemplateStatus.query, {
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
