import { Box } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import CandidateIcon from 'shared/components/icons/Candidates'
import IconScreen from 'shared/components/utils/IconScreen'
import RefInformation from '../page-sections/candidate-sections/create/RecInformation'
import CandidateAbout from '../page-sections/candidate-sections/create/CandidateAbout'
import ProfessionalExperience from '../page-sections/candidate-sections/create/ProfessionalExperience'
import Education from '../page-sections/candidate-sections/create/Education'
import HonorAward from '../page-sections/candidate-sections/create/HonorAward'
import Certificates from '../page-sections/candidate-sections/create/Certificates'
import Skill from '../page-sections/candidate-sections/create/Skill'
import useCreateCandidate from 'features/candidates/hooks/crud/useCreateCandidate'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AiIcon from 'shared/components/icons/Ai'
import { useState } from 'react'
import { CandidateCVData } from 'features/candidates/domain/interfaces'
import { formatDataFormCandidateCV } from 'features/candidates/shared/utils'
import ImportCVModal from '../page-sections/ImportCVModal'

function CreateCandidate() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const candidateData: CandidateCVData = location.state
  const { useFormReturn, isValid, onSubmit, isPending } = useCreateCandidate({
    candidateData: candidateData,
    callbackSuccess: () => {
      navigate('/dashboard/candidates')
    },
  })
  return (
    <FormProvider {...useFormReturn}>
      <Box pt={2} pb={4}>
        <Box>
          <FlexBox gap={0.5} alignItems="center">
            <IconScreen
              Icon={CandidateIcon}
              textLabel={'Add a new candidate'}
            />
          </FlexBox>
        </Box>
        <FlexBox justifyContent={'flex-end'}>
          <AppButton
            variant="contained"
            startIcon={<AiIcon />}
            onClick={() => setOpen(true)}
          >
            Import CV by AI
          </AppButton>
        </FlexBox>
        <RefInformation />
        <CandidateAbout />
        <ProfessionalExperience />
        <Education />
        <Skill />
        <HonorAward />
        <Certificates />
        <FlexBox gap={2} justifyContent={'flex-end'} marginTop={2}>
          <AppButton
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={isPending}
          >
            Cancel
          </AppButton>
          <ButtonLoading
            variant="contained"
            handlesubmit={onSubmit}
            disabled={isValid}
            loading={isPending}
          >
            Submit
          </ButtonLoading>
        </FlexBox>
      </Box>
      {open && (
        <ImportCVModal
          open={open}
          setOpen={setOpen}
          openWarning
          title="Import CV"
          onSuccess={(data) => {
            window.history.replaceState({}, '')
            const defaultValues = formatDataFormCandidateCV(data)
            useFormReturn.reset(defaultValues)
            setOpen(false)
          }}
        />
      )}
    </FormProvider>
  )
}

export default CreateCandidate
