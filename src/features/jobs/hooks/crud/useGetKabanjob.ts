import { useInfiniteQuery } from '@tanstack/react-query'
import _, { cloneDeep, unionBy } from 'lodash'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { CustomGraphQLResponse } from 'shared/interfaces/response'
import HiringJob from 'shared/schema/database/hiring_job'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const queryKey = MODLUE_QUERY_KEY.JOB
const getKanbanJob = GraphQLClientService.buildQuery({
  operation: 'GetAllHiringJobsGroupByStatus',
  options: {
    type: 'query',
  },
  node: `
    data {
        pending_approvals {
            id
            name
            location
            priority
            status
            is_able_to_cancel
            hiring_team {
                id
                name
            }
            total_candidates_recruited
            amount
            entity_skill_types {
                id
                name
                orderId
                entity_skills {
                    id
                    name
                    skill_id
                    orderId
                }
            }
        }
        opened {
            id
            name
            location
            priority
            status
            is_able_to_cancel
            hiring_team {
                id
                name
            }
            total_candidates_recruited
            amount
            entity_skill_types {
                id
                name
                orderId
                entity_skills {
                    id
                    name
                    skill_id
                    orderId
                }
            }
        }
        closed {
            id
            name
            location
            priority
            status
            is_able_to_cancel
            hiring_team {
                id
                name
            }
            total_candidates_recruited
            amount
            entity_skill_types {
                id
                name
                orderId
                entity_skills {
                    id
                    name
                    skill_id
                    orderId
                }
            }
        }
        cancelled {
            id
            name
            location
            priority
            status
            is_able_to_cancel
            hiring_team {
                id
                name
            }
            total_candidates_recruited
            amount
            entity_skill_types {
                id
                name
                orderId
                entity_skills {
                    id
                    name
                    skill_id
                    orderId
                }
            }
        }
    }
    pagination {
      page
      perPage
      total
    }
    `,
  params: {
    filter: 'HiringJobFilter',
    orderBy: 'HiringJobOrderBy!',
    freeWord: 'HiringJobFreeWord',
    pagination: 'PaginationInput',
  },
})
const PER_PAGE = 10

type KanbanJobStatus = {
  pending_approvals: HiringJob[]
  opened: HiringJob[]
  closed: HiringJob[]
  cancelled: HiringJob[]
}

const INIT_KANBAN_JOB_STATE: KanbanJobStatus = {
  pending_approvals: [],
  opened: [],
  closed: [],
  cancelled: [],
}
interface IUseCandidateJob {
  filter?: BaseRecord
  freeWord?: BaseRecord
}

const useGetKabanJob = ({ filter = {}, freeWord = {} }: IUseCandidateJob) => {
  //:::::::::::::::::::::::::::::::::::::::::::new:::::::::::::::::::::::::
  const fetchAllJob = async ({ pageParam }: { pageParam: number }) => {
    return GraphQLClientService.fetchGraphQL(getKanbanJob, {
      filter: filter,
      freeWord: freeWord,
      orderBy: { direction: 'DESC', field: 'created_at' },
      pagination: {
        page: pageParam,
        perPage: PER_PAGE,
      },
    })
  }

  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [queryKey, filter, freeWord],
    queryFn: fetchAllJob,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
  })

  function handleGetRightData(rightData: CustomGraphQLResponse | undefined) {
    const cloneData = cloneDeep(rightData)
    if (cloneData && isRight(cloneData)) {
      const response = unwrapEither(cloneData)
      const totalRecords = response?.[getKanbanJob.operation]?.pagination?.total
      const sortData: KanbanJobStatus =
        response?.[getKanbanJob.operation]?.data ?? []

      return {
        totalRecords,
        list_job: sortData,
      }
    }
    return {
      list_job: INIT_KANBAN_JOB_STATE,
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
    }, cloneDeep(INIT_KANBAN_JOB_STATE))

    return {
      list_all_job: listRecord,
      totalRecord,
    }
  }, [data])

  const total_current = useMemo(() => {
    return _.concat(
      list_all_job.pending_approvals,
      list_all_job.opened,
      list_all_job.closed,
      list_all_job.cancelled
    ).length
  }, [
    list_all_job.pending_approvals,
    list_all_job.opened,
    list_all_job.closed,
    list_all_job.cancelled,
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
    },
    data: {
      pending_approvals: list_all_job.pending_approvals,
      opened: list_all_job.opened,
      closed: list_all_job.closed,
      cancelled: list_all_job.cancelled,
    },
  }
}

export default useGetKabanJob
