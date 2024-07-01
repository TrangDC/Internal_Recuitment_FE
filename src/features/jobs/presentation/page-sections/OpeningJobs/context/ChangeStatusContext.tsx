import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { onSuccessChangeStatus } from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import useCandidatesJob from 'features/jobs/presentation/providers/hooks/useGetCandidateJob'
import { ReactNode, createContext, useContext } from 'react'
import { BaseRecord } from 'shared/interfaces'

interface InitialState {
  applied: CandidateStatusItem[]
  interviewing: CandidateStatusItem[]
  offering: CandidateStatusItem[]
  hired: CandidateStatusItem[]
  kiv: CandidateStatusItem[]
  offerLost: CandidateStatusItem[]
  exStaff: CandidateStatusItem[]
  handleSeeMore: () => void
  enabledShowMore: boolean
  handleFilter: (filter: BaseRecord) => void
  handleFreeWord: (filter: BaseRecord) => void
  handleUpdateStatus: (data: onSuccessChangeStatus) => void
  handleRemoveCandidate: (status: string, id: string) => void
  handleAddCandidate: (candidateJob: CandidateJob) => void
}

interface ChangeStatusProps {
  children: ReactNode
}

const ChangeStatusContext = createContext<InitialState>({
  applied: [],
  interviewing: [],
  offering: [],
  hired: [],
  kiv: [],
  offerLost: [],
  exStaff: [],
  handleSeeMore: () => {},
  enabledShowMore: false,
  handleFilter: (filter: BaseRecord) => {},
  handleFreeWord: (filter: BaseRecord) => {},
  handleUpdateStatus: (data: onSuccessChangeStatus) => {},
  handleRemoveCandidate: (status: string, id: string) => {},
  handleAddCandidate: (candidateJob: CandidateJob) => {}
})

function ChangeStatusProvider(props: ChangeStatusProps) {
  const { children } = props

  const {
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
  } = useCandidatesJob()

  return (
    <ChangeStatusContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChangeStatusContext.Provider>
  )
}

export const useContextChangeStatus = () => useContext(ChangeStatusContext)

export default ChangeStatusProvider
