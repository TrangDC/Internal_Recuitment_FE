import GeneralInformationField from '../GeneralInformationField'
import { DivContainerWrapper } from '../../../shared/styles'
import JobApplicationHistory from '../JobApplicationHistory'
import useCandidateDetail from '../../../hooks/crud/useCandidateDetail'
import { useParams } from 'react-router-dom'

const GeneralInformation = () => {
  const { id } = useParams()
  const { candidateDetail } = useCandidateDetail(id as string)

  return (
    <DivContainerWrapper>
      <GeneralInformationField candidateDetail={candidateDetail} />
      <JobApplicationHistory candidateDetail={candidateDetail} />
    </DivContainerWrapper>
  )
}

export default GeneralInformation
