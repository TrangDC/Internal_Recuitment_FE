import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomTextField } from 'shared/components/form/styles'
import {
  CANDIDATE_STATUS,
  list_status_disabled,
} from '../../../shared/constants'
import useChangeStatus from '../../../hooks/crud/useChangeStatus'
import useTextTranslation from 'shared/constants/text'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import { useMemo } from 'react'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import { transformListItem } from 'shared/utils/utils'
import { Span, Tiny } from 'shared/components/Typography'
import { isEmpty } from 'lodash'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import Cant from 'features/authorization/presentation/components/Cant'
import AppDateField from 'shared/components/input-fields/DateField'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import CandidateJob from 'shared/schema/database/candidate_job'

export type onSuccessChangeStatus = {
  prevStatus: string
  id: string
  updateStatus: string
}
interface IChangeStatusModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
  id: string
  rowData?: CandidateJob
  statusCurrent:
    | 'applied'
    | 'interviewing'
    | 'offering'
    | 'hired'
    | 'kiv'
    | 'offer_lost'
    | 'ex_staff'
    | 'new'
  defaultStatus?: string
  onSuccess?: ({ prevStatus, id, updateStatus }: onSuccessChangeStatus) => void
}

function ChangeStatusModal({
  open,
  setOpen,
  rowData,
  statusCurrent,
  defaultStatus = '',
  onSuccess,
}: IChangeStatusModal) {
  const { handleWarning, handleReset } = usePopup()
  const {
    actions,
    control,
    isPending,
    isValid,
    watch,
    formState,
    trigger,
    getValues,
  } = useChangeStatus({
    id: rowData?.id as string,
    callbackSuccess: (data) => {
      setOpen(false)
      onSuccess?.({
        id: data?.id,
        prevStatus: statusCurrent,
        updateStatus: data?.status,
      })
    },
    defaultValues: {
      status: defaultStatus,
    },
  })

  const { onSubmit, resetOfferDate } = actions

  const statusDisabledList = useMemo(() => {
    return list_status_disabled[statusCurrent]
  }, [statusCurrent])

  const new_status = watch('status')

  const translation = useTextTranslation()
  const show_failed_reason = useMemo(() => {
    return (
      new_status === STATUS_CANDIDATE.KIV ||
      new_status === STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [new_status])

  const show_date_onboard = useMemo(() => {
    return new_status === STATUS_CANDIDATE.OFFERING
  }, [new_status])

  const attachments = watch('attachments')
  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments) || isEmpty(attachments)) return true

    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  const handleSubmit = () => {
    const isFeature = !!rowData?.interview_feature
    if (!isFeature) {
      onSubmit()
      return
    }

    handleWarning({
      title: 'Warning',
      content: `This candidate still has ${rowData?.interview_feature} left, are you sure want to change the hiring status?`,
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
          title={translation.MODULE_CANDIDATE_JOB.change_status}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <CustomTextField
                  label="Job name"
                  size="small"
                  value={rowData?.hiring_job?.name}
                  fullWidth
                  focused
                  required
                  disabled
                />
              </FormControl>
            </FlexBox>
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <CustomTextField
                  label="Current status"
                  size="small"
                  //@ts-ignore
                  value={CANDIDATE_STATUS?.[rowData?.status]?.text}
                  fullWidth
                  required
                  focused
                  disabled
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <Controller
                  name="status"
                  shouldUnregister
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <FlexBox flexDirection={'column'}>
                        <CandidateStatusAutoComplete
                          multiple={false}
                          value={field.value}
                          list_disabled={statusDisabledList}
                          onChange={(data: any) => {
                            resetOfferDate()
                            field.onChange(data?.value)
                          }}
                          textFieldProps={{
                            label: 'New status',
                            required: true,
                          }}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )
                  }}
                />
              </FormControl>
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
            )}

            {show_failed_reason && (
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    name="failed_reason"
                    shouldUnregister
                    control={control}
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <FailedReasonAutoComplete
                          multiple={true}
                          value={field.value || []}
                          onChange={(data) => {
                            field.onChange(transformListItem(data, 'value'))
                          }}
                          textFieldProps={{
                            label: 'Failed reason',
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
            )}

            <Cant
              module="CANDIDATE_JOB_FEEDBACKS"
              checkBy={{
                permissions: ['CREATE.everything'],
                compare: 'hasAny',
              }}
            >
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="feedback"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          label={'Feedback'}
                          size="small"
                          fullWidth
                          value={field.value}
                          onChange={field.onChange}
                          minRows={4}
                          multiline
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </FlexBox>
                    )}
                  />
                </FormControl>
              </FlexBox>
            </Cant>
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
                        accept={'.pdf, .png, .jpg, .jpeg, .doc, .docx'}
                        multiple={true}
                        validator_files={{
                          max_file: {
                            max: 10,
                            msg_error: 'Up to 10 files and 20MB/file',
                          },
                          max_size: {
                            max: 20,
                            msg_error: 'Up to 10 files and 20MB/file',
                          },
                          is_valid: {
                            regex: '.(pdf|png|jpg|jpeg|doc|docx)$',
                            msg_error:
                              'One PDF,WORD,EXCEL file only, file size up to 20mb',
                          },
                        }}
                        descriptionFile={() => {
                          return (
                            <Box>
                              <Span sx={{ color: '#2A2E37 !important' }}>
                                {' '}
                                Attach file{' '}
                              </Span>
                              <Tiny sx={{ color: '#2A2E37 !important' }}>
                                Up to 10 files and 20MB/file
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

export default ChangeStatusModal
