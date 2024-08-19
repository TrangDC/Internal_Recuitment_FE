import { Box, FormControl } from '@mui/material'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import useEditNote from 'features/candidates/hooks/candidate-activity/crud/useEditNote'
import { Controller } from 'react-hook-form'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import { FileUploadAttachment } from 'shared/components/form/inputFileUpload/types'
import LoadingField from 'shared/components/form/loadingField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppTextField from 'shared/components/input-fields/AppTextField'
import BaseModal from 'shared/components/modal'
import { Span, Tiny } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'

interface EditCandidateNoteModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  successCallback: () => void
}

function EditCandidateNoteModal({
  open,
  setOpen,
  id,
  successCallback,
}: EditCandidateNoteModalProps) {
  const translation = useTextTranslation()
  const {
    control,
    formState,
    isValid,
    isPending,
    onSubmit,
    getValues,
    isGetting,
  } = useEditNote({
    id,
    successCallback: () => {
      setOpen(false)
      successCallback()
    },
  })
  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={'Edit note'}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <LoadingField isloading={isGetting}>
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
            </LoadingField>
            <LoadingField isloading={isGetting}>
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
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            </LoadingField>
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
            <ButtonEdit
              disabled={isValid}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonEdit>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default EditCandidateNoteModal
