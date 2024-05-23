import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomTextField } from 'shared/components/form/styles'
import { FormDataSchemaChangeStatus } from '../../providers/constants/schema'
import { baseInstance } from 'shared/interfaces'
import {
  CANDIDATE_STATUS,
  STATUS_CANDIDATE_HIRING,
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
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import { useMemo } from 'react'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'

interface IChangeStatusModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
  id: string
  rowData?: CandidateJob
}

function ChangeStatusModal({ open, setOpen, rowData }: IChangeStatusModal) {
  const { onSubmit, control, isPending, isValid, watch } = useChangeStatus({
    callbackSuccess: () => {
      setOpen(false)
    },
    defaultValues: {
      id: rowData?.id,
      feedback: '',
      attachments: [],
      failed_reason: [],
    },
  })

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
                value={rowData?.hiring_job_id}
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
                        multiple
                        value={((field.value as IOption[]) || []).map(
                          (item) => item.value
                        )}
                        onChange={field.onChange}
                        textFieldProps={{
                          label: 'Failed Reason',
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

export default ChangeStatusModal
