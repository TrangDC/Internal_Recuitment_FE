import { onSuccessChangeStatus } from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { CandidateStatusItem } from 'features/application/domain/interfaces'
import useCandidatesJob from 'features/application/hooks/crud/useGetCandidateJob'
import useFilterJobsOpening from 'features/application/hooks/table/useFilterJobsOpening'
import { MutableRefObject, ReactNode, createContext, useContext } from 'react'
import { ISearchData } from 'shared/components/table/hooks/useSearchList'
import {
  InterfaceGenerate,
  UseFilterReturn,
} from 'shared/components/table/interface'
import { BaseRecord } from 'shared/interfaces'
import CandidateJob from 'shared/schema/database/candidate_job'

interface InitialState {
  data: {
    applied: CandidateStatusItem[]
    interviewing: CandidateStatusItem[]
    offering: CandidateStatusItem[]
    hired: CandidateStatusItem[]
    kiv: CandidateStatusItem[]
    offer_lost: CandidateStatusItem[]
    ex_staff: CandidateStatusItem[]
  }
  total_data: {
    total_current: number
    total: number
  }
  show_more: boolean
  actions: {
    handleFetchNextPage: () => void
    handleFilter: (filter: BaseRecord) => void
    handleFreeWord: (filter: BaseRecord) => void
    handleUpdateStatus: (data: onSuccessChangeStatus) => void
    handleRemoveCandidate: (status: string, id: string) => void
    handleAddCandidate: (candidateJob: CandidateJob) => void
  }
  action_filter: {
    useFilterReturn: UseFilterReturn<
      InterfaceGenerate<{
        hiring_job_id: 'string[]'
        hiring_team_id: 'string[]'
        status: 'string'
        rec_id: 'string[]'
        level: 'string'
        page_job: 'string'
      }>
    >
    useSearchListReturn: {
      search: ISearchData
      handleSearch: () => void
      searchRef: MutableRefObject<null>
    }
  }
}

interface ChangeStatusProps {
  children: ReactNode
}

const ChangeStatusContext = createContext<InitialState>({
  data: {
    applied: [],
    interviewing: [],
    offering: [],
    hired: [],
    kiv: [],
    offer_lost: [],
    ex_staff: [],
  },
  total_data: {
    total_current: 0,
    total: 0,
  },
  show_more: false,
  actions: {
    handleFetchNextPage: () => {},
    handleFilter: (filter: BaseRecord) => {},
    handleFreeWord: (filter: BaseRecord) => {},
    handleUpdateStatus: (data: onSuccessChangeStatus) => {},
    handleRemoveCandidate: (status: string, id: string) => {},
    handleAddCandidate: (candidateJob: CandidateJob) => {},
  },
  action_filter: {
    //@ts-ignore
    useFilterReturn: {},
    //@ts-ignore
    useSearchListReturn: {},
  },
})

function ChangeStatusProvider(props: ChangeStatusProps) {
  const { children } = props

  const { data, total_data, show_more, actions } = useCandidatesJob()
  const { useFilterReturn, useSearchListReturn } = useFilterJobsOpening()

  return (
    <ChangeStatusContext.Provider
      value={{
        data,
        total_data,
        show_more,
        actions,
        action_filter: {
          useFilterReturn,
          useSearchListReturn,
        },
      }}
    >
      {children}
    </ChangeStatusContext.Provider>
  )
}

export const useContextChangeStatus = () => useContext(ChangeStatusContext)

export default ChangeStatusProvider
