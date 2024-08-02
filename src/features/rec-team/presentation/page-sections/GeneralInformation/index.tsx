import { Box } from '@mui/material'
import GeneralInformationField from '../GeneralInformationField'
import TeamMember from '../TeamMember'

const GeneralInformation = () => {

  return (
    <Box sx={{width: '100%'}}>
      <GeneralInformationField />
      <TeamMember />
    </Box>
  )
}

export default GeneralInformation
