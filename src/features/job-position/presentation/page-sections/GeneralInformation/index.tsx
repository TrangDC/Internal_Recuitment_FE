import { Box } from '@mui/material'
import GeneralInformationField from '../GeneralInformationField'
import OpeningJobRequest from '../OpeningJobRequest'

const GeneralInformation = () => {
  return (
    <Box sx={{width: '100%'}}>
      <GeneralInformationField />
      <OpeningJobRequest />
    </Box>
  )
}

export default GeneralInformation
