import { Box } from '@mui/system'
import IconScreen from 'shared/components/utils/IconScreen'
import ApplicationPage from '../page-sections/ApplicationPage'
import ApplicationIcon from 'shared/components/icons/ApplicationIcon'
import { WrapperContainer } from 'shared/styles'

const ApplicationList = () => {
  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={ApplicationIcon} textLabel="Application" />
      </Box>
      <WrapperContainer sx={{ width: '100%', marginTop: '20px' }}>
       <ApplicationPage />
      </WrapperContainer>
    </Box>
  )
}

export default ApplicationList
