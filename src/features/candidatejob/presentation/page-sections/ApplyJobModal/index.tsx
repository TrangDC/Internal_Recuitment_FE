import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useApplyToJob from '../../../hooks/crud/useApplyToJob'
import { useMemo } from 'react'
import useTextTranslation from 'shared/constants/text'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import CandidateStatusAutoComplete, {
  application_data,
} from 'shared/components/autocomplete/candidate-status-auto-complete'
import { Span, Tiny } from 'shared/components/Typography'
import { isEmpty } from 'lodash'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import SelectionTeamForCreateCDDJPermission from 'features/candidatejob/permission/components/SelectionTeamForCreateCDDJPermission'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import AppDateField from 'shared/components/input-fields/DateField'
import { status_disabled_applied } from 'features/candidatejob/shared/constants'
import LevelAutoComplete from 'shared/components/autocomplete/level-auto-complete'
import useValidProcessingCandidate from 'features/candidatejob/hooks/crud/useValidProcessingCandidate'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import RecInChargeAutoComplete from 'shared/components/autocomplete/rec-in-charge-auto-complete'
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
    getValues,
    trigger,
  } = useApplyToJob({
    callbackSuccess: () => {
      setOpen(false)
      onSuccess?.()
    },
    defaultValues: {
      candidate_id: candidateId,
    },
  })
  const { handleWarning, handleReset } = usePopup()

  const translation = useTextTranslation()
  const attachments = watch('attachments')
  const hiring_team_id = watch('hiring_team_id')
  const new_status = watch('status')

  const { isValidCandidate } = useValidProcessingCandidate(candidateId)

  const show_date_onboard = useMemo(() => {
    return new_status === application_data.offering.value
  }, [new_status])

  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments) || isEmpty(attachments)) return true

    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  const handleSubmit = () => {
    if (!isValidCandidate) {
      onSubmit()
      return
    }

    handleWarning({
      title: 'Warning',
      content: `This candidate is applying for another job. Do you still want to proceed with this candidate’s application?`,
      onSubmit: () => {
        onSubmit()
        handleReset()
      },
    })
  }

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
                  name="hiring_team_id"
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
                        disabled={!hiring_team_id}
                        filter={{
                          hiring_team_ids: hiring_team_id
                            ? [hiring_team_id]
                            : undefined,
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

            <FlexBox
              flexDirection={'row'}
              gap={2}
              justifyContent={'center'}
              alignItems={'center'}
            >
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
                        list_disabled={status_disabled_applied}
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
              {show_date_onboard && (
                <FormControl fullWidth>
                  <Controller
                    name="level"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <LevelAutoComplete
                          multiple={false}
                          value={field.value ?? ''}
                          onChange={(data: any) => {
                            field.onChange(data.value)
                          }}
                          textFieldProps={{
                            label: 'Level',
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
              )}
            </FlexBox>

            {show_date_onboard && (
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="offer_expiration_date"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppDateField
                          label={'Offer expiration date'}
                          value={field.value}
                          format="dd/MM/yyyy"
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                          minDate={new Date()}
                          textFieldProps={{
                            fullWidth: true,
                            size: 'small',
                          }}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="onboard_date"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppDateField
                          label={'Candidate onboard date'}
                          value={field.value}
                          format="dd/MM/yyyy"
                          onChange={(value) => {
                            field.onChange(value)
                            trigger('offer_expiration_date')
                          }}
                          minDate={new Date()}
                          textFieldProps={{
                            fullWidth: true,
                            size: 'small',
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
            )}

            <FlexBox justifyContent={'center'} alignItems={'center'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="rec_in_charge_id"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <RecInChargeAutoComplete
                        value={field.value}
                        multiple={false}
                        textFieldProps={{
                          required: true,
                          label: 'REC in charge',
                        }}
                        hasAssigned={false}
                        onChange={(item) => {
                          field.onChange(item?.value ?? '')
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
                      <InputFileUpload
                        getValues={getValues}
                        name={field.name}
                        accept={'.pdf'}
                        multiple={false}
                        validator_files={{
                          max_file: {
                            max: 1,
                            msg_error:
                              'One PDF file only, file size up to 20mb',
                          },
                          max_size: {
                            max: 20,
                            msg_error:
                              'One PDF file only, file size up to 20mb',
                          },
                          is_valid: {
                            regex: '\\.(pdf)',
                            msg_error:
                              'One PDF file only, file size up to 20mb',
                          },
                        }}
                        descriptionFile={() => {
                          return (
                            <Box>
                              <Span sx={{ color: '#2A2E37 !important' }}>
                                {' '}
                                Attach CV{' '}
                              </Span>
                              <Tiny sx={{ color: '#2A2E37 !important' }}>
                                One PDF file only, file size up to 20mb
                              </Tiny>
                            </Box>
                          )
                        }}
                        value={field.value}
                        onChange={field.onChange}
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
              handlesubmit={handleSubmit}
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
