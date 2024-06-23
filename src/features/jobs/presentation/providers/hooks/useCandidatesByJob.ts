import { useQuery } from '@tanstack/react-query'
import { Candidate } from 'features/candidates/domain/interfaces'
import { useMemo } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const queryKey = MODLUE_QUERY_KEY.CANDIDATE_JOB
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
            candidate {
                id
                name,
                phone,
                status,
            }
            hiring_job {
              id
              name
            }
            created_at
        }
        kiv {
            id
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
            }
            created_at
        }
        offer_lost {
            id
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
            }
            created_at
        }
        ex_staff {
            id
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
            }
            created_at
        }
        applied {
            id
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
            }
            created_at
        }
        interviewing {
            id
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
            }
            created_at
        }
        offering {
            id
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
            }
            created_at
        }
      }
    `,
  params: {
    filter: 'CandidateJobGroupByStatusFilter!',
    orderBy: 'CandidateJobByOrder',
  },
})

export type CandidateStatusItem = {
  id: string
  candidate_id: string
  status: string
  hiring_job_id: string
  attachments: {
    id: string
    document_name: string
    document_id: string
  }
  candidate: Candidate
  created_at: string
  updated_at: string
}

type CandidatesByStatus = {
  kiv: CandidateStatusItem[]
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
      GraphQLClientService.fetchGraphQL(getCandidatesByJob.query, {
        filter: {
          hiring_job_id,
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
