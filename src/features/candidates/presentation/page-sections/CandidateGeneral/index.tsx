import FlexBox from 'shared/components/flexbox/FlexBox'
import CandidateAbout from './CandidateAbout'
import ProfessionalExp from './ProfessionalExp'
import Scrollbar from 'shared/components/ScrollBar'
import Education from './Education'
import Skills from './Skills'
import HonorAward from './HonorAward'
import { Box } from '@mui/system'
import { useCandidateInforContext } from 'features/candidates/shared/context/CandidateInformation'
import Certificates from './Certificates'

const CandidateActivities = () => {
  const { candidateInfor } = useCandidateInforContext()
  const exps = candidateInfor?.candidate_exp || []
  const educations = candidateInfor?.candidate_educate || []
  const skills = candidateInfor?.entity_skill_types || []
  const awards = candidateInfor?.candidate_award || []
  const certificate = candidateInfor?.candidate_certificate || []
  return (
    <Box height={'calc(80vh - 48px)'} width={'100%'}>
      <Scrollbar>
        <FlexBox flexDirection={'column'} gap={2} padding={2}>
          <CandidateAbout
            address={candidateInfor?.address ?? ''}
            dob={candidateInfor?.dob ?? ''}
            email={candidateInfor?.email ?? ''}
            gender={candidateInfor?.gender ?? ''}
            name={candidateInfor?.name ?? ''}
            phone={candidateInfor?.phone ?? ''}
          />
          <ProfessionalExp exps={exps} />
          <Education educations={educations} />
          <Skills skills={skills} />
          <HonorAward awards={awards} />
          <Certificates certificates={certificate} />
        </FlexBox>
      </Scrollbar>
    </Box>
  )
}

export default CandidateActivities