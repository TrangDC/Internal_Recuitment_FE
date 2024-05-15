import GeneralInformationField from '../GeneralInformationField'
import { DivContainerWrapper } from '../../providers/styles'
import JobApplicationHistory from '../JobApplicationHistory'

const GeneralInformation = () => {
  return (
    <DivContainerWrapper>
      <GeneralInformationField />
      <JobApplicationHistory />
    </DivContainerWrapper>
  )
}

export default GeneralInformation
