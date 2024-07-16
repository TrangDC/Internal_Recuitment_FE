import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useApplyToJob from '../../../hooks/crud/useApplyToJob'
import { useMemo } from 'react'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import useTextTranslation from 'shared/constants/text'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import { Span, Tiny } from 'shared/components/Typography'
import { isEmpty } from 'lodash'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import SelectionTeamForCreateCDDJPermission from 'features/candidatejob/permission/components/SelectionTeamForCreateCDDJPermission'

interface IApplyJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
  onSuccess?: () => void
}

function ApplyJobModal({
  open,
  setOpen,
  candidateId,
  onSuccess,
}: IApplyJobModal) {
  const {
    onSubmit,
    control,
    isPending,
    isValid,
    resetField,
    watch,
    formState,
  } = useApplyToJob({
    callbackSuccess: () => {
      setOpen(false)
      onSuccess?.()
    },
    defaultValues: {
      candidate_id: candidateId,
    },
  })

  const translation = useTextTranslation()
  const attachments = watch('attachments')
  const team_id = watch('team_id')

  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments) || isEmpty(attachments)) return true

    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
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
                      <SelectionTeamForCreateCDDJPermission
                        name={field.name}
                        value={field.value || ''}
                        onChange={(value) => {
                          field.onChange(value)
                          resetField('hiring_job_id')
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
                  name="hiring_job_id"
                  shouldUnregister
                  control={control}
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <JobsAutoComplete
                        name={field.name}
                        value={field.value}
                        disabled={!team_id}
                        filter={{
                          team_ids: team_id ? [team_id] : undefined,
                          status: 'opened',
                        }}
                        multiple={false}
                        onChange={field.onChange}
                        textFieldProps={{
                          required: true,
                          label: 'Job name',
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
                          required: true,
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
                          accept: '.pdf,.doc,.docx,.xlsx',
                          regexString: '\\.(pdf|xlsx|docx|doc)',
                          maxFile: 1,
                          multiple: false,
                          maxSize: 20,
                          msgError: {
                            is_valid:
                              'One PDF,WORD,EXCEL file only, file size up to 20mb',
                            maxSize:
                              'One PDF,WORD,EXCEL file only, file size up to 20mb',
                            maxFile:
                              'One PDF,WORD,EXCEL file only, file size up to 20mb',
                          },
                          descriptionFile: () => {
                            return (
                              <Box>
                                <Span sx={{ color: '#2A2E37 !important' }}>
                                  {' '}
                                  Attach CV{' '}
                                </Span>
                                <Tiny sx={{ color: '#2A2E37 !important' }}>
                                  One PDF,WORD,EXCEL file only, file size up to
                                  20mb
                                </Tiny>
                              </Box>
                            )
                          },
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
              disabled={isValid || !isValidAttachments}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonLoading>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default ApplyJobModal
