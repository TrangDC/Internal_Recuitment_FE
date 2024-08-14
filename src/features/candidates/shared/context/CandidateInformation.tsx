import { createContext, ReactNode, useContext } from 'react'
import Candidate from 'shared/schema/database/candidate'
import useGetCandidate from 'features/candidates/hooks/crud/useGetCandidate'
import { useParams } from 'react-router-dom'
// --------------------------------------------------------

// props type
type AuthProviderProps = { children: ReactNode }
// --------------------------------------------------------

interface IAuthContext {
  candidateInfor: Candidate | null
}

const CandidateInforContext = createContext<IAuthContext>({
  candidateInfor: null,
})

export const CandidateInformationProvider = ({
  children,
}: AuthProviderProps) => {
  const { id } = useParams()
  const { candidateDetail } = useGetCandidate(id)
  return (
    <CandidateInforContext.Provider value={{ candidateInfor: candidateDetail }}>
      {children}
    </CandidateInforContext.Provider>
  )
}

export const useCandidateInforContext = () => useContext(CandidateInforContext)
