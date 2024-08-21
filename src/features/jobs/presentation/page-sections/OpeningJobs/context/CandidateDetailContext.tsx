import { onSuccessChangeStatus } from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import useCandidatesJobDetail from 'features/jobs/hooks/crud/useGetCandidateJobDetail'
import { ReactNode, createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { BaseRecord } from 'shared/interfaces'
import CandidateJob from 'shared/schema/database/candidate_job'

interface InitialState {
  data: {
    applied: CandidateStatusItem[]
    interviewing: CandidateStatusItem[]
    offering: CandidateStatusItem[]
    hired: CandidateStatusItem[]
    failedCV: CandidateStatusItem[]
    failedInterview: CandidateStatusItem[]
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
    failedCV: [],
    failedInterview: [],
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
})

function CandidateDetailProvider(props: ChangeStatusProps) {
  const { children } = props
  const { id } = useParams()

  const { data, total_data, show_more, actions } = useCandidatesJobDetail({id: id as string})

  return (
    <ChangeStatusContext.Provider
      value={{
        data,
        total_data,
        show_more,
        actions,
      }}
    >
      {children}
    </ChangeStatusContext.Provider>
  )
}

export const useContextCandidateDetail = () => useContext(ChangeStatusContext)

export default CandidateDetailProvider
