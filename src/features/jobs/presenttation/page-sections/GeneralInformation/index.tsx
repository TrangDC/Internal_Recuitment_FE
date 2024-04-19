import { Box, styled } from '@mui/material'
import GeneralInformationField from '../GeneralInformationField'
import GenaralInformationHiring from '../GeneralInformationHiring'

const DivContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const GeneralInformation = () => {
  return (
    <DivContainerWrapper>
      <GeneralInformationField />
     <GenaralInformationHiring />
    </DivContainerWrapper>
  )
}

export default GeneralInformation
