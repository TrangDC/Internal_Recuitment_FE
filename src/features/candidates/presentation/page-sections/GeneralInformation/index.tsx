import GeneralInformationField from '../GeneralInformationField'
import GenaralInformationInterview from '../GenerateInformationInterview'
import { DivContainerWrapper } from '../../providers/styles'

const GeneralInformation = () => {
  return (
    <DivContainerWrapper>
      <GeneralInformationField />
      <GenaralInformationInterview />
    </DivContainerWrapper>
  )
}

export default GeneralInformation
