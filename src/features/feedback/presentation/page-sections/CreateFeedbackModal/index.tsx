import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useCreateFeedback from '../../../hooks/crud/useCreateFeedBack'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { Span, Tiny } from 'shared/components/Typography'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import InputFileUpload from 'shared/components/form/inputFileUpload'

interface ICreateFeedbackModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidate_job_id: string
  onSuccess?: () => void
}

function CreateFeedbackModal({
  open,
  setOpen,
  candidate_job_id,
  onSuccess,
}: ICreateFeedbackModal) {
  const { onSubmit, control, isPending, isValid, watch, formState, getValues } =
    useCreateFeedback({
      callbackSuccess: () => {
        setOpen(false)
        onSuccess?.()
      },
      defaultValues: {
        candidate_job_id: candidate_job_id,
        attachments: [],
      },
    })

  const attachments = watch('attachments')
  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments) || isEmpty(attachments)) return true

    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Add New Feedback"
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="feedback"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'Description'}
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
                      <InputFileUpload
                        getValues={getValues}
                        name={field.name}
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
              Cancel
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

export default CreateFeedbackModal
