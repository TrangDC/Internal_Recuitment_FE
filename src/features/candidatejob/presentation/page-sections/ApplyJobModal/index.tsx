import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { FormControl } from '@mui/material'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { FormDataSchema } from '../../providers/constants/schema'
import useApplyToJob from '../../providers/hooks/useApplyToJob'
import useSelectJobByTeam from 'shared/hooks/graphql/useSelectJobByTeam'
import { useEffect } from 'react'
import { Job } from 'features/jobs/domain/interfaces'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import useTextTranslation from 'shared/constants/text'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'

interface IApplyJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
}

function ApplyJobModal({ open, setOpen, candidateId }: IApplyJobModal) {
  const { onSubmit, control, isPending, isValid, resetField } = useApplyToJob({
    callbackSuccess: () => {
      setOpen(false)
    },
    defaultValues: {
      candidate_id: candidateId,
    },
  })

  const { jobs, changeJobByTeamId } = useSelectJobByTeam()
  const team_id: string | undefined = useWatch({ control, name: 'team_id' })

  useEffect(() => {
    changeJobByTeamId(team_id ? [team_id] : [])
    resetField('hiring_job_id')
  }, [team_id])

  const translation = useTextTranslation()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={translation.MODULE_CANDIDATE_JOB.apply_to_a_job}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="team_id"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <TeamsAutoComplete
                      name={field.name}
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value)
                      }}
                      multiple={false}
                      textFieldProps={{
                        required: true,
                        label: 'Team',
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>

          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                key={jobs.toString()}
                name="hiring_job_id"
                shouldUnregister
                control={control}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AutoCompleteComponent<FormDataSchema, Job>
                      options={jobs}
                      label="name"
                      required
                      inputLabel={translation.MODLUE_JOBS.job_name}
                      field={field}
                      disabled={!team_id}
                      fullWidth
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>

          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                key={jobs.toString()}
                name="status"
                shouldUnregister
                control={control}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                     <CandidateStatusAutoComplete
                      multiple={false}
                      value={field.value}
                      onChange={(data: any) => {
                        field.onChange(data.value)
                      }}
                      textFieldProps={{
                        label: 'Status',
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>

          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                name="attachments"
                shouldUnregister
                control={control}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <InputFileComponent
                      field={field}
                      inputFileProps={{
                        accept: '.pdf',
                        regexString: '\\.pdf$',
                        maxFile: 1,
                        maxSize: 20,
                        msgError: {
                          is_valid: "One PDF file only, file size up to 20MB",
                          maxSize: "One PDF file only, file size up to 20MB",
                        }
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>
        </FlexBox>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <AppButton
            variant="outlined"
            size="small"
            onClick={() => setOpen(false)}
          >
            {translation.COMMON.cancel}
          </AppButton>
          <ButtonLoading
            variant="contained"
            size="small"
            disabled={isValid}
            handlesubmit={onSubmit}
            loading={isPending}
          >
            Submit
          </ButtonLoading>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ApplyJobModal
