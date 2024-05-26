import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useCreateFeedback from '../../providers/hooks/useCreateFeedBack'
import InputFileComponent from 'shared/components/form/inputFileComponent'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { Span, Tiny } from 'shared/components/Typography'

interface ICreateFeedbackModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidate_job_id: string
  listQueryKey?: string[]
}

function CreateFeedbackModal({
  open,
  setOpen,
  candidate_job_id,
  listQueryKey = [],
}: ICreateFeedbackModal) {
  const { onSubmit, control, isPending, isValid } = useCreateFeedback({
    callbackSuccess: () => {
      setOpen(false)
    },
    defaultValues: {
      candidate_job_id: candidate_job_id,
    },
    listQueryKey,
  })

  return (
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
                    <InputFileComponent
                      field={field}
                      inputFileProps={{
                        accept: '.*',
                        regexString: '.*',
                        maxFile: 10,
                        maxSize: 20,
                        msgError: {
                          maxFile: 'Up to 10 files and 20MB/file',
                          maxSize: 'Up to 10 files and 20MB/file'
                        },
                        descriptionFile: () => {
                          return (
                            <Box>
                              <Span sx={{ color: '#2A2E37 !important' }}> Attach file </Span>
                              <Tiny sx={{color: '#2A2E37 !important'}}>
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

export default CreateFeedbackModal
