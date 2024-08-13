import { FormControl, Box } from '@mui/material'
import { CandidateCVData } from 'features/candidates/domain/interfaces'
import useImportCV from 'features/candidates/hooks/crud/useImportCV'
import { Controller, useForm } from 'react-hook-form'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import { FileUploadAttachment } from 'shared/components/form/uploadFileBox/types'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import ExPoint from 'shared/components/icons/ExPoint'
import BaseModal from 'shared/components/modal'
import { Span, Tiny, Tiny12md } from 'shared/components/Typography'

type ImportCVModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: (data: CandidateCVData) => void
  openWarning: boolean
  title: string
}

function ImportCVModal({
  open,
  setOpen,
  onSuccess,
  openWarning,
  title,
}: ImportCVModalProps) {
  const { control, getValues, watch } = useForm({
    defaultValues: {
      attachments: [],
    },
  })
  const { importCV, loading } = useImportCV({
    onSuccess,
  })
  const attachments = watch('attachments')

  function handleImportCV() {
    const attachment = attachments[0] as FileUploadAttachment
    importCV(attachment)
  }
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={'700px'}>
      <BaseModal.Header title={title} setOpen={setOpen}></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        {openWarning && (
          <FlexBox gap={1}>
            <ExPoint sx={{ color: '#FFAF46', fontSize: '16px' }} />
            <Tiny12md color={'#936D19'}>
              Importing a new CV will automatically update the candidate's
              information, replacing any existing details.
            </Tiny12md>
          </FlexBox>
        )}
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
                      max: 1,
                      msg_error: 'Up to 1 files and 20MB/file',
                    },
                    max_size: {
                      max: 20,
                      msg_error: 'Up to 1 files and 20MB/file',
                    },
                    is_valid: {
                      regex: '\\.(pdf)',
                      msg_error: 'One PDF file only, file size up to 20mb',
                    },
                  }}
                  descriptionFile={() => {
                    return (
                      <Box>
                        <Span sx={{ color: '#2A2E37 !important' }}>
                          Attach file
                        </Span>
                        <Tiny sx={{ color: '#2A2E37 !important' }}>
                          Up to 1 files and 20MB/file
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
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <AppButton variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </AppButton>
        <ButtonLoading
          variant="contained"
          disabled={attachments.length === 0}
          handlesubmit={handleImportCV}
          loading={loading === 'UPLOADING'}
        >
          Submit
        </ButtonLoading>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ImportCVModal
