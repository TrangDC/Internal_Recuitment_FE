import { Box } from '@mui/system'
import CandidateIcon from 'shared/components/icons/Candidates'
import IconScreen from 'shared/components/utils/IconScreen'
import CandidateProfile from '../page-sections/candidate-profile'
import CandidateInformationDetail from '../page-sections/candidate-information-detail'
import ApplicationHistory from '../page-sections/application-history'
import { CandidateInformationProvider } from 'features/candidates/shared/context/CandidateInformation'

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
        <Box
          sx={{
            width: '100%',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            height: '80vh',
          }}
        >
          <CandidateProfile />
          <CandidateInformationDetail />
          <ApplicationHistory />
        </Box>
      </Box>
    </CandidateInformationProvider>
  )
}

export default CandidateDetail
