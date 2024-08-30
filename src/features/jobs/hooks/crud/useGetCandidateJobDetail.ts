import { useInfiniteQuery } from '@tanstack/react-query'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import _, { cloneDeep, isEmpty, unionBy } from 'lodash'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { CustomGraphQLResponse } from 'shared/interfaces/response'
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
            interview_feature
            candidate {
                id
                name,
                phone,
            }
            hiring_job {
              id
              name
              is_able_to_close
              priority
              location
              status
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
            }
            hiring_job {
              id
              name
              is_able_to_close
              status
              priority
              location
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
            }
            hiring_job {
              id
              name
              is_able_to_close
              status
              priority
              location
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
            }
            hiring_job {
              id
              name
              is_able_to_close
              status
              priority
              location
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        ex_staff {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
            candidate {
                id
                name,
                phone,
            }
            hiring_job {
              id
              name
              status
              is_able_to_close
              priority
              location
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        applied {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
            candidate {
                id
                name,
                phone,
            }
            hiring_job {
              id
              name
              status
              is_able_to_close
              priority
              location
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        interviewing {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
            candidate {
                id
                name,
                phone,
            }
            hiring_job {
              id
              name
              status
              is_able_to_close
              priority
              location
              hiring_team {
                id
                name
              }
            }
            created_at
        }
        offering {
            id
            candidate_id
            hiring_job_id
            status
            interview_feature
            candidate {
                id
                name,
                phone,
            }
            hiring_job {
              id
              name
              status
              priority
              is_able_to_close
              location
              hiring_team {
                id
                name
              }
            }
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
const PER_PAGE = 5
const INIT_CANDIDATE_STATUS: CandidatesByStatus = {
  applied: [],
  ex_staff: [],
  hired: [],
  interviewing: [],
  failed_cv: [],
  failed_interview: [],
  offer_lost: [],
  offering: [],
}

type ICandidateJobDetail = {
  filter?: BaseRecord
  freeWord?: BaseRecord
}

const useCandidatesJobDetail = (props: ICandidateJobDetail) => {
  //:::::::::::::::::::::::::::::::::::::::::::new:::::::::::::::::::::::::
  const fetchAllJob = async ({ pageParam }: { pageParam: number }) => {
    return GraphQLClientService.fetchGraphQL(getCandidatesByJob, {
      filter: props.filter,
      pagination: {
        page: pageParam,
        perPage: PER_PAGE,
      },
    })
  }

  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [queryKey, props.filter],
    queryFn: fetchAllJob,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
    enabled: !isEmpty(props.filter),
  })

  function handleGetRightData(rightData: CustomGraphQLResponse | undefined) {
    const cloneData = cloneDeep(rightData)
    if (cloneData && isRight(cloneData)) {
      const response = unwrapEither(cloneData)
      const totalRecords =
        response?.[getCandidatesByJob.operation]?.pagination?.total
      const sortData: CandidatesByStatus =
        response?.[getCandidatesByJob.operation]?.data ?? []

      return {
        totalRecords,
        list_job: sortData,
      }
    }
    return {
      list_job: {
        applied: [],
        ex_staff: [],
        hired: [],
        interviewing: [],
        failed_cv: [],
        failed_interview: [],
        offer_lost: [],
        offering: [],
      },
      totalRecords: 0,
    }
  }

  const { list_all_job, totalRecord } = useMemo(() => {
    const pages = data?.pages ?? []
    let totalRecord = 0

    const flatMapJobs = pages.flatMap((item) => {
      const { totalRecords, list_job } = handleGetRightData(item)
      if (!totalRecord) totalRecord = totalRecords
      return list_job
    })

    const listRecord = flatMapJobs.reduce((current, next) => {
      for (const key in next) {
        if (next.hasOwnProperty(key)) {
          //@ts-ignore
          current[key] = unionBy(current[key], next[key], 'id')
        }
      }
      return current
    }, cloneDeep(INIT_CANDIDATE_STATUS))

    return {
      list_all_job: listRecord,
      totalRecord,
    }
  }, [data])

  const total_current = useMemo(() => {
    return _.concat(
      list_all_job.applied,
      list_all_job.interviewing,
      list_all_job.offering,
      list_all_job.hired,
      list_all_job.failed_cv,
      list_all_job.failed_interview,
      list_all_job.offer_lost,
      list_all_job.ex_staff
    ).length
  }, [
    list_all_job.applied,
    list_all_job.interviewing,
    list_all_job.offering,
    list_all_job.hired,
    list_all_job.failed_cv,
    list_all_job.failed_interview,
    list_all_job.offer_lost,
    list_all_job.ex_staff,
  ])

  const show_more = useMemo(() => {
    return total_current < totalRecord
  }, [totalRecord, total_current])

  return {
    total_data: {
      total_current,
      total: totalRecord,
    },
    show_more,
    actions: {
      fetchNextPage,
      refetch,
      //static
      // handleFilter,
      // handleFreeWord,
      // handleUpdateStatus,
      // handleRemoveCandidate,
      // handleAddCandidate,
      // getCandidateByJob,
    },
    data: {
      applied: list_all_job.applied,
      interviewing: list_all_job.interviewing,
      offering: list_all_job.offering,
      hired: list_all_job.hired,
      failedCV: list_all_job.failed_cv,
      failedInterview: list_all_job.failed_interview,
      offer_lost: list_all_job.offer_lost,
      ex_staff: list_all_job.ex_staff,
    },
  }
}

export default useCandidatesJobDetail
