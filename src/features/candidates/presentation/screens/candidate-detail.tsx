import { Box } from '@mui/system'
import CandidateIcon from 'shared/components/icons/Candidates'
import IconScreen from 'shared/components/utils/IconScreen'
import CandidateProfile from '../page-sections/candidate-profile'
import CandidateInformationDetail from '../page-sections/candidate-information-detail'
import ApplicationHistory from '../page-sections/application-history'
import { CandidateInformationProvider } from 'features/candidates/shared/context/CandidateInformation'
import { Container } from '../components/Container'

const CandidateDetail = () => {
  return (
    <CandidateInformationProvider>
      <Box pt={2} pb={4}>
        <Box>
          <IconScreen
            Icon={CandidateIcon}
            textLabel={'Candidate details'}
            go_back={true}
          />
        </Box>
        <Container>
          <CandidateProfile />
          <CandidateInformationDetail />
          <ApplicationHistory />
        </Container>
      </Box>
    </CandidateInformationProvider>
  )
}

export default CandidateDetail
