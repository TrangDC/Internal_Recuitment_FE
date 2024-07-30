import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SLASH_COMMAND

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
        hiringTeam {
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
    params: {
      filter: 'EmailTemplateKeywordFilter!',
    },
  })

  return {
    getAllEmailTemplateKeywords,
    queryKey,
  }
}

export default useGraphql
