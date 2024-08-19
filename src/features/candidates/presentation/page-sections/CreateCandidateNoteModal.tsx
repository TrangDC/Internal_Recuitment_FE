import { Box, FormControl } from '@mui/material'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useCreateNote from 'features/candidates/hooks/candidate-activity/crud/useCreateNote'
import { Controller } from 'react-hook-form'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import { FileUploadAttachment } from 'shared/components/form/inputFileUpload/types'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppTextField from 'shared/components/input-fields/AppTextField'
import BaseModal from 'shared/components/modal'
import { Span, Tiny } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'

interface CreateCandidateNoteModalProps {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateCandidateNoteModal({
  open,
  setOpen,
}: CreateCandidateNoteModalProps) {
  const translation = useTextTranslation()
  const { control, formState, isValid, isPending, onSubmit, getValues } =
    useCreateNote({
      successCallback: () => {
        setOpen(false)
      },
    })
  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={'Add a new note'}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      label="Name"
                      required
                      size="small"
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
                name="description"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      label="Description"
                      rows={3}
                      multiline
                      required
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
                      value={field.value as FileUploadAttachment[]}
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
    </ConfirmableModalProvider>
  )
}

export default CreateCandidateNoteModal
