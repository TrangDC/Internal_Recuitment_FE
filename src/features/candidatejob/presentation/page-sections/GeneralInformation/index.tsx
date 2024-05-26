import GeneralInformationField from '../GeneralInformationField'
import { DivContainerWrapper } from '../../providers/styles'
import JobApplicationHistory from '../JobApplicationHistory'
import useCandidateDetail from '../../providers/hooks/useCandidateDetail'
import { useParams } from 'react-router-dom'

const GeneralInformation = () => {
  const { id } = useParams()
  const { candidateDetail } = useCandidateDetail(id as string)
  console.log("🚀 ~ candidateDetail:", candidateDetail?.status)

  return (
    <DivContainerWrapper>
      <GeneralInformationField candidateDetail={candidateDetail}/>
      <JobApplicationHistory candidateDetail={candidateDetail}/>
    </DivContainerWrapper>
  )
}

export default GeneralInformation
