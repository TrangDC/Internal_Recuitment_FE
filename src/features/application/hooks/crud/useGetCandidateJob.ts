import { onSuccessChangeStatus } from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import _, { cloneDeep, unionBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import { CandidateStatusEnum } from 'shared/schema'
import CandidateJob from 'shared/schema/database/candidate_job'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { removeNonExistInObj } from 'shared/utils/utils'

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
  failed_cv: CandidateStatusEnum[]
  failed_interview: CandidateStatusEnum[]
  offer_lost: CandidateStatusItem[]
  ex_staff: CandidateStatusItem[]
  applied: CandidateStatusItem[]
  interviewing: CandidateStatusItem[]
  offering: CandidateStatusItem[]
  hired: CandidateStatusItem[]
}

const INIT_PER_PAGE = 5

type GetDataByStatus = {
  data: CandidateStatusItem[]
  setData: (data: any) => void
}

type ParamGetCandidateJob = {
  pageCurrent: number
  filter: BaseRecord
  freeWord: BaseRecord
}

const useCandidatesJob = () => {
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [filter, setFilter] = useState<BaseRecord>({})
  const [freeWord, setFreeWord] = useState<BaseRecord>({})
  const [applied, setApplied] = useState<CandidateStatusItem[]>([])
  const [interviewing, setInterviewing] = useState<CandidateStatusItem[]>([])
  const [offering, setOffering] = useState<CandidateStatusItem[]>([])
  const [hired, setHired] = useState<CandidateStatusItem[]>([])
  const [failedCV, setFailedCV] = useState<CandidateStatusItem[]>([])
  const [failedInterview, setFailedInterview] = useState<CandidateStatusItem[]>(
    []
  )
  const [offerLost, setOfferLost] = useState<CandidateStatusItem[]>([])
  const [exStaff, setExStaff] = useState<CandidateStatusItem[]>([])

  const total_current = useMemo(() => {
    return _.concat(
      applied,
      interviewing,
      offering,
      hired,
      failedCV,
      failedInterview,
      offerLost,
      exStaff
    ).length
  }, [
    applied,
    interviewing,
    offering,
    hired,
    failedCV,
    failedInterview,
    offerLost,
    exStaff,
  ])

  const show_more = useMemo(() => {
    return total_current < total
  }, [total, total_current])

  const handleGetItemByStatus = (status: string): GetDataByStatus => {
    let result: GetDataByStatus = {
      data: [],
      setData: () => {},
    }

    switch (status) {
      case 'applied':
        result = {
          data: applied,
          setData: setApplied,
        }
        break
      case 'ex_staff':
        result = {
          data: exStaff,
          setData: setExStaff,
        }
        break
      case 'hired':
        result = {
          data: hired,
          setData: setHired,
        }
        break
      case 'interviewing':
        result = {
          data: interviewing,
          setData: setInterviewing,
        }
        break
      case 'failed_cv':
        result = {
          data: failedCV,
          setData: setFailedCV,
        }
        break
      case 'failed_interview':
        result = {
          data: failedInterview,
          setData: setFailedInterview,
        }
        break
      case 'offer_lost':
        result = {
          data: offerLost,
          setData: setOfferLost,
        }
        break
      case 'offering':
        result = {
          data: offering,
          setData: setOffering,
        }
        break
    }

    return result
  }

  const handleSetValue = (
    key: string,
    dataCandidate: CandidateStatusItem[]
  ) => {
    let nextCandidateJobList = cloneDeep(dataCandidate)
    const candidateUtil = handleGetItemByStatus(key)
    const { setData } = candidateUtil
    if (page === 1) {
      setData(nextCandidateJobList)
      return
    }
    setData((prev: CandidateStatusItem[]) =>
      unionBy(prev, nextCandidateJobList, 'id')
    )
  }

  const getCandidateByJob = async ({
    pageCurrent,
    filter,
    freeWord,
  }: ParamGetCandidateJob): Promise<CandidatesByStatus> => {
    const data = await GraphQLClientService.fetchGraphQL(getCandidatesByJob, {
      orderBy: {
        direction: 'DESC',
        field: 'created_at',
      },
      pagination: { page: pageCurrent, perPage: INIT_PER_PAGE },
      filter: {
        ...filter,
      },
      freeWord: {
        ...freeWord,
      },
    })

    if (data && isRight(data)) {
      const response = unwrapEither(data)
      setTotal(response?.[getCandidatesByJob.operation]?.pagination?.total)
      return response?.[getCandidatesByJob.operation]?.data
    }

    return {
      applied: [],
      ex_staff: [],
      hired: [],
      interviewing: [],
      failed_cv: [],
      failed_interview: [],
      offer_lost: [],
      offering: [],
    }
  }

  const handleGetData = async ({
    pageCurrent,
    filter,
    freeWord,
  }: ParamGetCandidateJob) => {
    const response = await getCandidateByJob({
      pageCurrent: pageCurrent,
      filter: filter,
      freeWord: freeWord,
    })

    for (let property in response) {
      //@ts-ignore
      handleSetValue(property, response[property])
    }
  }

  const handleFilter = (record: BaseRecord) => {
    setPage(1)
    setFilter((prev) => removeNonExistInObj({ ...prev, ...record }))
  }

  const handleFreeWord = (freeWord: BaseRecord) => {
    setPage(1)
    setFreeWord(freeWord)
  }

  const handleRemoveCandidate = (status: string, id: string) => {
    const { setData } = handleGetItemByStatus(status)
    //delete one candidate_job
    setTotal((prev) => prev - 1)
    setData((prev: CandidateStatusItem[]) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  const handleUpdateStatus = (data: onSuccessChangeStatus) => {
    const { prevStatus, id, updateStatus } = data
    const dragCandidate = handleGetItemByStatus(prevStatus)
    const dropCandidate = handleGetItemByStatus(updateStatus)

    //get candidate move
    let candidateMove = dragCandidate.data.find((item) => item.id === id)
    if (candidateMove) {
      candidateMove = {
        ...candidateMove,
        status: updateStatus,
        candidate: {
          ...candidateMove.candidate,
          status: updateStatus as CandidateStatusEnum,
        },
      }
    }

    handleRemoveCandidate(prevStatus, id)

    dropCandidate.setData((prev: CandidateStatusItem[]) => {
      return [...prev, candidateMove]
    })
  }

  const handleAddCandidate = (data: CandidateJob) => {
    const candidate_changed = handleGetItemByStatus(data.status)
    //add one candidate_job
    setTotal((prev) => prev + 1)
    candidate_changed.setData((prev: CandidateStatusItem[]) => [data, ...prev])
  }

  const handleFetchNextPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    handleGetData({
      pageCurrent: page,
      filter: { ...filter },
      freeWord: freeWord,
    })
  }, [page, filter, freeWord])

  return {
    total_data: {
      total_current,
      total: total,
    },
    show_more,
    actions: {
      handleFetchNextPage,
      //static
      handleFilter,
      handleFreeWord,
      handleUpdateStatus,
      handleRemoveCandidate,
      handleAddCandidate,
      getCandidateByJob,
    },
    data: {
      applied,
      interviewing,
      offering,
      hired,
      failedCV,
      failedInterview,
      offer_lost: offerLost,
      ex_staff: exStaff,
    },
  }
}

export default useCandidatesJob
