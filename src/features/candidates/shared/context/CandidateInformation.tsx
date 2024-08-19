import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Candidate from 'shared/schema/database/candidate'
import useGetCandidate from 'features/candidates/hooks/crud/useGetCandidate'
import { useParams } from 'react-router-dom'
import useGetImage from 'shared/components/upload/hooks/useGetImage'
import {
  AttachmentAction,
  AttachmentFolder,
} from 'shared/schema/database/attachment'

// props type
type CandidateInforContexProps = { children: ReactNode }

interface ICandidateInforContext {
  candidateInfor: Candidate | null
  avatar: string
}

const CandidateInforContext = createContext<ICandidateInforContext>({
  candidateInfor: null,
  avatar: '',
})

export const CandidateInformationProvider = ({
  children,
}: CandidateInforContexProps) => {
  const { id } = useParams()
  const [avatar, setAvatar] = useState('')
  const { candidateDetail } = useGetCandidate(id)
  const { getUrl } = useGetImage()

  async function getUrlCandidate(id: string) {
    const avatar = await getUrl({
      action: AttachmentAction.DOWNLOAD,
      fileName: 'avatar',
      folder: AttachmentFolder.CANDIDATE,
      id: id,
    })
    setAvatar(avatar)
  }

  useEffect(() => {
    getUrlCandidate(candidateDetail?.avatar)
  }, [candidateDetail?.avatar])
  return (
    <CandidateInforContext.Provider
      value={{ candidateInfor: candidateDetail, avatar }}
    >
      {children}
    </CandidateInforContext.Provider>
  )
}

export const useCandidateInforContext = () => useContext(CandidateInforContext)
