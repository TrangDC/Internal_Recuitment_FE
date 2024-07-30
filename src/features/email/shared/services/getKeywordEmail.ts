import GraphQLClientService from 'services/graphql-service'
import { EVENT_EMAIL_ENUM } from 'shared/components/autocomplete/event-email-autocomplete'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

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

const getKeywordEmail = async (
  event: EVENT_EMAIL_ENUM | ''
): Promise<{ key: string; value: string }[]> => {
  try {
    if (!event) return []

    const data = await GraphQLClientService.fetchGraphQL(
      getAllEmailTemplateKeywords.query,
      {
        filter: {
          event,
        },
      }
    )
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const totalPage_data =
        response?.[getAllEmailTemplateKeywords.operation]?.data

      return Object.keys(totalPage_data).flatMap((item) => totalPage_data[item])
    }

    return []
  } catch (error) {
    throw Error((error as Error)?.message)
  }
}

export default getKeywordEmail
