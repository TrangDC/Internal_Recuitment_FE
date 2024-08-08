import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB

  const createCandidateJob = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateJob',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
        candidate_id
        interview_feature
        status
        created_at
        candidate {
          id
          name
          phone
          status
        }
        hiring_job {
          id
          is_able_to_close
          location
          name
          priority
          status
          hiring_team {
            id
            name
          }
        }
      }
    `,
    params: {
      input: 'NewCandidateJobInput!',
    },
  })

  return {
    queryKey,
    createCandidateJob,
  }
}

export default useGraphql
