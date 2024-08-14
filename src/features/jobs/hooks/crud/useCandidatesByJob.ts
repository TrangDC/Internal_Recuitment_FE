import { useQuery } from '@tanstack/react-query'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const queryKey = MODLUE_QUERY_KEY.GROUP_CANDIDATE_STATUS
const getCandidatesByJob = GraphQLClientService.buildQuery({
  operation: 'GetCandidateJobGroupByStatus',
  options: {
    type: 'query',
  },
  node: `
      data {
        hired {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
            candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        failed_cv {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        failed_interview {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        offer_lost {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        ex_staff {
            id
            interview_feature
            candidate_id
            hiring_job_id
            status
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        applied {
            id
            interview_feature
            candidate_id
            hiring_job_id
            status
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        interviewing {
            id
            interview_feature
            candidate_id
            hiring_job_id
            status
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        offering {
            id
            interview_feature
            candidate_id
            hiring_job_id
            status
             candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
              hiring_team {
                id
                name
              }
            }
            created_at
        }
      }
    `,
  params: {
    filter: 'CandidateJobGroupByStatusFilter',
    orderBy: 'CandidateJobByOrder',
    freeWord: 'CandidateJobGroupByStatusFreeWord',
    pagination: 'PaginationInput',
  },
})

type CandidatesByStatus = {
  failed_cv: CandidateStatusItem[]
  failed_interview: CandidateStatusItem[]
  offer_lost: CandidateStatusItem[]
  ex_staff: CandidateStatusItem[]
  applied: CandidateStatusItem[]
  interviewing: CandidateStatusItem[]
  offering: CandidateStatusItem[]
  hired: CandidateStatusItem[]
}

const useCandidatesByJob = (hiring_job_id: string) => {
  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidatesByJob, {
        filter: {
          hiring_job_ids: [hiring_job_id],
        },
        orderBy: {
          direction: 'DESC',
          field: 'created_at',
        },
      }),
  })

  const candidatesStatus: CandidatesByStatus = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidatesByJob.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    candidatesStatus: candidatesStatus,
  }
}

export default useCandidatesByJob
