import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import { Span, Tiny } from 'shared/components/Typography'
import useEditJobApplication from '../../../hooks/crud/useEditJobApplication'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import InputFileUpload from 'shared/components/form/inputFileUpload'

type EditCandidateJobModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  candidateId: string
  onSuccess?: () => void
}

function EditCandidateJobModal({
  open,
  setOpen,
  candidateId,
  onSuccess,
}: EditCandidateJobModalProps) {
  const { onSubmit, isPending, isValid, control, formState, getValues } =
    useEditJobApplication({
      id: candidateId,
      onSuccess(data) {
        setOpen(false)
        onSuccess?.()
      },
    })
  const translation = useTextTranslation()

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={translation.MODULE_CANDIDATE_JOB.edit_cv}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
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
                        accept={'.pdf,.doc,.docx,.xlsx'}
                        multiple={false}
                        validator_files={{
                          max_file: {max: 1, msg_error: 'One PDF,WORD,EXCEL file only, file size up to 20mb'},
                          max_size: {max: 20, msg_error: 'One PDF,WORD,EXCEL file only, file size up to 20mb'},
                          is_valid: {regex: '\\.(pdf|xlsx|docx|doc)', msg_error: 'One PDF,WORD,EXCEL file only, file size up to 20mb'}
                        }}
                        descriptionFile={() => {
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
            <ButtonEdit
              loading={isPending}
              disabled={isValid}
              data-testid="btn-submit"
              handlesubmit={(note) => onSubmit(note)}
              title={`Do you want to edit this job application?`}
            >
              Submit
            </ButtonEdit>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default EditCandidateJobModal
