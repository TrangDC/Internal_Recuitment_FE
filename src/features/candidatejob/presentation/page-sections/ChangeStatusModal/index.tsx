import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomTextField } from 'shared/components/form/styles'
import {
  CANDIDATE_STATUS,
  list_status_disabled,
} from '../../providers/constants'
import { CandidateJob } from 'features/candidates/domain/interfaces'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import useChangeStatus from '../../providers/hooks/useChangeStatus'
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
import ModalConfirm from 'shared/components/modal/modalConfirm'
import WarningModal from 'shared/components/modal/modalWarning'

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
    | 'new',
    defaultStatus?: string,
    onSuccess?: () => void;
}

function ChangeStatusModal({
  open,
  setOpen,
  rowData,
  statusCurrent,
  defaultStatus = '',
  onSuccess
}: IChangeStatusModal) {
  const { onSubmit, control, isPending, isValid, watch } = useChangeStatus({
    callbackSuccess: () => {
      setOpen(false)
      onSuccess?.()
    },
    defaultValues: {
      id: rowData?.id,
      feedback: '',
      attachments: [],
      failed_reason: [],
      status: defaultStatus
    },
  })

  const statusDisabledList = useMemo(() => {
    return list_status_disabled[statusCurrent]
  }, [statusCurrent])

  const translation = useTextTranslation()

  const showFailedReason = useMemo(() => {
    const watchFields = watch('status')

    return (
      watchFields === STATUS_CANDIDATE.KIV ||
      watchFields === STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [watch('status')])

  return (
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
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <CandidateStatusAutoComplete
                      multiple={false}
                      value={field.value}
                      list_disabled={statusDisabledList}
                      onChange={(data: any) => {
                        field.onChange(data.value)
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
                )}
              />
            </FormControl>
          </FlexBox>
          {showFailedReason && (
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
                        accept: '.pdf, .png, .jpg, .jpeg, .doc, .docx',
                        regexString: '.(pdf|png|jpg|jpeg|doc|docx)$',
                        maxFile: 10,
                        maxSize: 20,
                        msgError: {
                          maxSize: 'Up to 10 files and 20MB/file',
                        },
                        descriptionFile: () => {
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

          {!!rowData?.interview_feature ? (
            <ModalConfirm  disabled={isValid} title={`This candidate still has ${rowData?.interview_feature} left, are you sure want to change the hiring status?`} callbackSubmit={onSubmit}>
              <ButtonLoading
                variant="contained"
                size="small"
                disabled={isValid}
                handlesubmit={() => {}}
                loading={isPending}
              >
                Submit
              </ButtonLoading>
            </ModalConfirm>
          ) : (
            <ButtonLoading
              variant="contained"
              size="small"
              disabled={isValid}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonLoading>
          )}
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ChangeStatusModal
