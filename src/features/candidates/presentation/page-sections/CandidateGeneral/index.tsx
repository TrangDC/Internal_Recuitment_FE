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
import AppButton from 'shared/components/buttons/AppButton'
import { Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const CandidateActivities = () => {
  const { candidateInfor } = useCandidateInforContext()
  const navigate = useNavigate()
  const exps = candidateInfor?.candidate_exp || []
  const educations = candidateInfor?.candidate_educate || []
  const skills = candidateInfor?.entity_skill_types || []
  const awards = candidateInfor?.candidate_award || []
  const certificate = candidateInfor?.candidate_certificate || []
  return (
    <Box width={'100%'}>
      <Box height={'calc(80vh - 120px)'} width={'100%'} position={'relative'}>
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
            {exps.length > 0 && <ProfessionalExp exps={exps} />}
            {educations.length > 0 && <Education educations={educations} />}
            {skills.length > 0 && <Skills skills={skills} />}
            {awards.length > 0 && <HonorAward awards={awards} />}
            {certificate.length > 0 && (
              <Certificates certificates={certificate} />
            )}
          </FlexBox>
        </Scrollbar>
      </Box>
      <FlexBox flexDirection={'row-reverse'} padding={2}>
        <AppButton
          variant="contained"
          size="small"
          startIcon={<Edit />}
          onClick={() =>
            navigate(`/dashboard/edit-candidate/${candidateInfor?.id}`)
          }
        >
          Edit
        </AppButton>
      </FlexBox>
    </Box>
  )
}

export default CandidateActivities
