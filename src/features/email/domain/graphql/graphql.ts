import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.EMAIL_TEMPLATE
  const queryKey_keyword = MODLUE_QUERY_KEY.SLASH_COMMAND

  const getAllEmailTemplates = GraphQLClientService.buildQuery({
    operation: 'GetAllEmailTemplates',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          event
          send_to
          subject
          roles {
            id
            name
          }
          status
          created_at
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
      filter: 'EmailTemplateFilter',
      orderBy: 'EmailTemplateOrder',
      freeWord: 'EmailTemplateFreeWord',
    },
  })

  const createEmailTemplate = GraphQLClientService.buildQuery({
    operation: 'CreateEmailTemplate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewEmailTemplateInput!',
      note: 'String!',
    },
  })

  const UpdateEmailTemplate = GraphQLClientService.buildQuery({
    operation: 'UpdateEmailTemplate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateEmailTemplateInput!',
      id: 'ID!',
      note: 'String!'
    },
  })

  const deleteEmail = GraphQLClientService.buildQuery({
    operation: 'DeleteEmailTemplate',
    options: {
      type: 'mutation',
    },
    node: '',
    params: {
      id: 'ID!',
      note: 'String!'
    },
  })

  const getEmailTemplate = GraphQLClientService.buildQuery({
    operation: 'GetEmailTemplate',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        event
        subject
        content 
        send_to
        status
        signature
        roles {
          id
          name
        }
        cc
        bcc
        created_at
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const getAllEmailTemplateKeywords = GraphQLClientService.buildQuery({
    operation: 'GetAllEmailTemplateKeywords',
    options: {
      type: 'query',
    },
    node: `
      data {
        general {
            key
            value
        }
        team {
            key
            value
        }
        hiringJob {
            key
            value
        }
        candidate {
            key
            value
        }
        candidateJob {
            key
            value
        }
        interview {
            key
            value
        }
        link {
            key
            value
        }
      }
    `,
  })

  const updateEmailTemplateStatus = GraphQLClientService.buildQuery({
    operation: 'UpdateEmailTemplateStatus',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      input: 'UpdateEmailTemplateStatusInput!',
      id: 'ID!',
      note: 'String!'
    },
  })

  return {
    getAllEmailTemplates,
    queryKey,
    createEmailTemplate,
    UpdateEmailTemplate,
    deleteEmail,
    getEmailTemplate,
    getAllEmailTemplateKeywords,
    queryKey_keyword,
    updateEmailTemplateStatus
  }
}

export default useGraphql
