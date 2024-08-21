import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateActivitiesGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_ACTIVITY
  const getCandidateActivities = GraphQLClientService.buildQuery({
    operation: 'GetCandidateActivities',
    options: {
      type: 'query',
    },
    node: `
      data {
        total
        candidate_notes {
          id
          created_by {
            id
            name
            hiring_team {
              id
            }
          }
          name
          edited
          description
          attachments {
            id
            document_name
            document_id
          }
          created_at
        }
        candidate_history_calls {
           id
           name
           type
           contact_to
           date
           start_time
           end_time
           description
           created_by {
             id
             name
             hiring_team {
              id
             }
           }
           edited
           createdAt
           attachments {
              id
              document_name
              document_id
           }
        }
        candidate_interviews {
           id
           title
           description
           candidate_job_id
           interview_date
           start_from
           end_at
           interviewer {
            id
            name
           }
           candidate_job {
             id
             hiring_job {
               name
             }
           }
           edit_able
           owner {
             id
             name
           }
           status
           edited
           location
           meeting_link
           created_at
        }
        outgoing_emails {
           id
           to
           subject
           content
           signature
           recipient_type
           status
        }
        candidate_job_feedbacks {
          id
          created_by
          owner {
            id
            name
            hiring_team {
              id
            }
          }
          candidate_job {
            hiring_job {
              name
            }
          }
          feedback
          edited
          attachments {
            id
            document_name
            document_id
          }
          created_at
        }
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: ' CandidateActivityFilter!',
      orderBy: 'CandidateActivityOrder!',
      freeWord: 'CandidateActivityFreeWord',
    },
  })

  return {
    getCandidateActivities,
    queryKey,
  }
}

export default useCandidateActivitiesGraphql
