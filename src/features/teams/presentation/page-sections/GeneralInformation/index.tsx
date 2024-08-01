import { Box } from '@mui/material'
import GeneralInformationField from '../GeneralInformationField'
import OpeningJobRequest from '../OpenJobRequest'

const GeneralInformation = () => {

  return (
    <Box sx={{width: '100%'}}>
      <GeneralInformationField />
      <OpeningJobRequest />
    </Box>
  )
}

export default GeneralInformation
