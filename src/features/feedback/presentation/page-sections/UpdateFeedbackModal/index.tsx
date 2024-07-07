import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { FeedBack } from 'features/feedback/domain/interfaces'
import useUpdateFeedback from '../../../hooks/crud/useUpdateFeedback'
import { Span, Tiny } from 'shared/components/Typography'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'

interface IUpdateFeedbackModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData: FeedBack
  onSuccess?: () => void
}

function UpdateFeedbackModal({
  open,
  setOpen,
  id,
  onSuccess,
}: IUpdateFeedbackModal) {
  const { actions, control, isValid, isPending, isGetting, formState } =
    useUpdateFeedback({
      id: id,
      onSuccess: () => {
        setOpen(false)
        onSuccess?.()
      },
    })
  const { callbackSubmit } = actions
  const attachments = useWatch({ control, name: 'attachments' })

  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments) || isEmpty(attachments)) return true

    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Edit Feedback"
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
                        loading={isGetting}
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
                          maxFile: 10,
                          maxSize: 20,
                          msgError: {
                            maxFile: 'Up to 10 files and 20MB/file',
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
              Cancel
            </AppButton>
            <UpdateRecord
              disabled={isValid || !isValidAttachments}
              callbackSubmit={callbackSubmit}
            >
              <ButtonLoading
                variant="contained"
                size="small"
                disabled={isValid || !isValidAttachments}
                handlesubmit={() => {}}
                loading={isPending}
              >
                Submit
              </ButtonLoading>
            </UpdateRecord>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default UpdateFeedbackModal
