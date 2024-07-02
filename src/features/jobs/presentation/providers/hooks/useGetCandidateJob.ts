import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { onSuccessChangeStatus } from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { cloneDeep, unionBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
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
              team {
                id
                name
              }
            }
            created_at
        }
        kiv {
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
              team {
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
              team {
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
              team {
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
              team {
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
              team {
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
              team {
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
  kiv: CandidateStatusItem[]
  offer_lost: CandidateStatusItem[]
  ex_staff: CandidateStatusItem[]
  applied: CandidateStatusItem[]
  interviewing: CandidateStatusItem[]
  offering: CandidateStatusItem[]
  hired: CandidateStatusItem[]
}

const INIT_PER_PAGE = 10;

type GetDataByStatus = {data: CandidateStatusItem[], setData: (data: any) => void}

const useCandidatesJob = () => {
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<BaseRecord>({});
  const [freeWord, setFreeWord] = useState<BaseRecord>({});

  const [applied, setApplied] = useState<CandidateStatusItem[]>([])
  const [interviewing, setInterviewing] = useState<CandidateStatusItem[]>([])
  const [offering, setOffering] = useState<CandidateStatusItem[]>([])
  const [hired, setHired] = useState<CandidateStatusItem[]>([])
  const [kiv, setKiv] = useState<CandidateStatusItem[]>([])
  const [offerLost, setOfferLost] = useState<CandidateStatusItem[]>([])
  const [exStaff, setExStaff] = useState<CandidateStatusItem[]>([])

  const enabledShowMore = useMemo(() => {
    // return page * INIT_PER_PAGE < total;
    return false;
  }, [page, total])

  const handleSeeMore = async () => {
    setPage(page + 1)
  }

  //hotfix
  const handleCall = async () => {
    const response = await getCandidateByJob(page, filter, freeWord)

    for (let property in response) {
      //@ts-ignore
      handleSetValue(property, response[property])
    }
  }


  const handleGetItemByStatus = (status: string) : GetDataByStatus => {
    let result: GetDataByStatus = {
      data: [],
      setData: () => {}
    };

    switch (status) {
      case 'applied':
        result = {
          data: applied,
          setData: setApplied
        }
        break
      case 'ex_staff':
        result = {
          data: exStaff,
          setData: setExStaff
        }
        break
      case 'hired':
        result = {
          data: hired,
          setData: setHired
        }
        break
      case 'interviewing':
        result = {
          data: interviewing,
          setData: setInterviewing
        }
        break
      case 'kiv':
        result = {
          data: kiv,
          setData: setKiv
        }
        break
      case 'offer_lost':
        result = {
          data: offerLost,
          setData: setOfferLost
        }
        break
      case 'offering':
        result = {
          data: offering,
          setData: setOffering
        }
        break
    }

    return result;
  }

  const handleSetValue = (key: string, dataCandidate: CandidateStatusItem[]) => {
    let nextCandidateJobList = cloneDeep(dataCandidate)
    const candidateUtil = handleGetItemByStatus(key);
    const { setData } = candidateUtil;
    if(page === 1) {
      setData(nextCandidateJobList);
      return;
    }
    setData((prev: CandidateStatusItem[]) => unionBy(prev, nextCandidateJobList, 'id'))
  }

  const getCandidateByJob = async (pageCurrent: number, filter: BaseRecord, freeWord: BaseRecord): Promise<CandidatesByStatus> => {
    const data = await GraphQLClientService.fetchGraphQL(
      getCandidatesByJob.query,
      {
        orderBy: {
          direction: 'DESC',
          field: 'created_at',
        },
        // pagination: { page: pageCurrent, perPage: INIT_PER_PAGE },
        filter: {
          ...filter
        },
        freeWord: {
          ...freeWord
        }
      }
    )

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
      kiv: [],
      offer_lost: [],
      offering: [],
    }
  }

  const handleFilter = (record: BaseRecord) => {
    setPage(1);
    setFilter((prev) => removeNonExistInObj({...prev, ...record}))
  }

  const handleFreeWord = (freeWord: BaseRecord) => {
    setPage(1)
    setFreeWord(freeWord)
  }

  const handleRemoveCandidate = (status: string, id: string) => {
    const { setData } = handleGetItemByStatus(status);
    setData((prev: CandidateStatusItem[]) => {
      return prev.filter((item) => item.id !== id);
    })
  }

  const handleUpdateStatus = (data: onSuccessChangeStatus) => {
    const { prevStatus, id, updateStatus } = data;
    const dragCandidate = handleGetItemByStatus(prevStatus);
    const dropCandidate = handleGetItemByStatus(updateStatus);

    //get candidate move
    let candidateMove = dragCandidate.data.find((item) => item.id === id);
    if(candidateMove) {
      //@ts-ignore
      candidateMove = {...candidateMove, status: updateStatus, candidate: {...candidateMove.candidate, status: updateStatus}}
    }

    // handleRemoveCandidate(prevStatus, id)

    // dropCandidate.setData((prev: CandidateStatusItem[]) => {
    //   return [...prev, candidateMove]
    // })

    handleCall()
  }

  const handleAddCandidate = (data: CandidateJob) => {
    const candidate_changed = handleGetItemByStatus(data.status);
    // if(candidate_changed.data.length > INIT_PER_PAGE) return;
    // candidate_changed.setData((prev: CandidateStatusItem[]) => [data, ...prev])

    handleCall()
  }

  useEffect(() => {
    ;(async () => {
      const response = await getCandidateByJob(page, filter, freeWord)

      for (let property in response) {
        //@ts-ignore
        handleSetValue(property, response[property])
      }
    })()
  }, [page, filter, freeWord])

  return {
    applied,
    interviewing,
    offering,
    hired,
    kiv,
    offerLost,
    exStaff,
    handleSeeMore,
    enabledShowMore,
    handleFilter,
    handleFreeWord,
    handleUpdateStatus,
    handleRemoveCandidate,
    handleAddCandidate
  }
}

export default useCandidatesJob
