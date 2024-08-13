import { Box } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import CandidateIcon from 'shared/components/icons/Candidates'
import IconScreen from 'shared/components/utils/IconScreen'
import RefInformation from '../page-sections/candidate-sections/edit/RecInformation'
import CandidateAbout from '../page-sections/candidate-sections/edit/CandidateAbout'
import ProfessionalExperience from '../page-sections/candidate-sections/edit/ProfessionalExperience'
import Education from '../page-sections/candidate-sections/edit/Education'
import HonorAward from '../page-sections/candidate-sections/edit/HonorAward'
import Certificates from '../page-sections/candidate-sections/edit/Certificates'
import Skill from '../page-sections/candidate-sections/edit/Skill'
import AppButton from 'shared/components/buttons/AppButton'
import useUpdateCandidate from 'features/candidates/hooks/crud/useUpdateCandidate'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import AiIcon from 'shared/components/icons/Ai'
import ImportCVModal from '../page-sections/importCVModal/ImportCVModal'
import { formatDataFormCandidateCV } from 'features/candidates/shared/utils'
import { useState } from 'react'

function EditCandidate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { useFormReturn, isValid, actions, isPending, isGetting } =
    useUpdateCandidate({
      onSuccess: () => {
        navigate('/dashboard/candidates')
      },
      id: id ?? '',
    })
  const { onSubmit } = actions
  return (
    <FormProvider {...useFormReturn}>
      <Box pt={2} pb={4}>
        <Box>
          <FlexBox gap={0.5} alignItems="center">
            <IconScreen Icon={CandidateIcon} textLabel={'Edit candidate'} />
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
        <RefInformation isGetting={isGetting} />
        <CandidateAbout isGetting={isGetting} />
        <ProfessionalExperience isGetting={isGetting} />
        <Education isGetting={isGetting} />
        <Skill isGetting={isGetting} />
        <HonorAward isGetting={isGetting} />
        <Certificates isGetting={isGetting} />
        <FlexBox gap={2} justifyContent={'flex-end'} marginTop={2}>
          <AppButton
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={isPending}
          >
            Cancel
          </AppButton>
          <ButtonEdit
            handlesubmit={onSubmit}
            disabled={isValid}
            loading={isPending}
          >
            Submit
          </ButtonEdit>
        </FlexBox>
      </Box>
      {open && (
        <ImportCVModal
          open={open}
          setOpen={setOpen}
          openWarning
          title="Import CV to update candidate information"
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

export default EditCandidate
