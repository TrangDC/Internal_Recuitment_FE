import { Box, styled } from '@mui/material'
import GeneralInformationField from '../GeneralInformationField'
import GenaralInformationInterview from '../GenerateInformationInterview'

const DivContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const GeneralInformation = () => {
  return (
    <DivContainerWrapper>
      <GeneralInformationField />
     <GenaralInformationInterview />
    </DivContainerWrapper>
  )
}

export default GeneralInformation
