import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { onSuccessChangeStatus } from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import useCandidatesJob from 'features/jobs/presentation/providers/hooks/useGetCandidateJob'
import { ReactNode, createContext, useContext } from 'react'
import { BaseRecord } from 'shared/interfaces'

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
})

function ChangeStatusProvider(props: ChangeStatusProps) {
  const { children } = props

  const {
    data,
    total_data,
    show_more,
    actions,
  } = useCandidatesJob()

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

export const useContextChangeStatus = () => useContext(ChangeStatusContext)

export default ChangeStatusProvider
