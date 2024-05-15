import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import { Team } from 'features/teams/domain/interfaces'
import useApplyToJob from '../../providers/hooks/useApplyToJob'
import useSelectTeam from 'shared/hooks/graphql/useSelecTeam'
import useSelectJobByTeam from 'shared/hooks/graphql/useSelectJobByTeam'
import { useEffect } from 'react'
import { Job } from 'features/jobs/domain/interfaces'
import { baseInstance } from 'shared/interfaces'
import { STATUS_CANDIDATE_HIRING } from '../../providers/constants'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import useTextTranslation from 'shared/constants/text'

interface IApplyJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
}

function ApplyJobModal({ open, setOpen, candidateId }: IApplyJobModal) {
  const { onSubmit, useFormReturn } = useApplyToJob({
    defaultValues: { candidate_id: candidateId },
    callbackSuccess: () => {
      setOpen(false)
    },
  })
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormReturn

  const { teams } = useSelectTeam()
  const { jobs, changeJobByTeamId } = useSelectJobByTeam()

  const team_id: Record<string, any> = useWatch({ control, name: 'team_id' })
  const resetValueJob = () => {
    //@ts-ignore
    setValue('hiring_job_id', null)
  }

  useEffect(() => {
    changeJobByTeamId(team_id?.id ? [team_id?.id] : [])
  }, [team_id])

  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODULE_CANDIDATE_JOB.apply_to_a_job}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="team_id"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Team>
                    options={teams}
                    label="name"
                    inputLabel={translation.MODLUE_TEAMS.team}
                    errors={errors}
                    field={field}
                    fullWidth
                    callbackOnChange={resetValueJob}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                key={jobs.toString()}
                name="hiring_job_id"
                shouldUnregister
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Job>
                    options={jobs}
                    label="name"
                    inputLabel={translation.MODLUE_JOBS.job_name}
                    errors={errors}
                    field={field}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, baseInstance>
                    options={STATUS_CANDIDATE_HIRING}
                    label="name"
                    inputLabel={translation.COMMON.status}
                    errors={errors}
                    field={field}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="attachments"
                control={control}
                render={({ field }) => (
                  <InputFileComponent
                    errors={errors}
                    field={field}
                    accept=".pdf,.doc,.docx,image/*"
                    regexString="\\.(pdf|docx?|jpe?g|png|gif|bmp|tiff)$"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <CustomeButtonCancel type="button" variant="contained" onClick={() => setOpen(false)}>
            {translation.COMMON.cancel}
          </CustomeButtonCancel>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {translation.COMMON.save}
          </Button>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ApplyJobModal
