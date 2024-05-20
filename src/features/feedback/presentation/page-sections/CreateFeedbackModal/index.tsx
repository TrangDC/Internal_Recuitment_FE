import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import useCreateFeedback from '../../providers/hooks/useCreateFeedBack'
import InputFileComponent from 'shared/components/form/inputFileComponent'

interface ICreateFeedbackModal {
  open: boolean
  setOpen: (value: boolean) => void
  candidate_job_id: string
}

function CreateFeedbackModal({ open, setOpen, candidate_job_id }: ICreateFeedbackModal) {
  const { onSubmit, useFormReturn } = useCreateFeedback({
    defaultValues: {
      feedback: '',
      candidate_job_id,
    },
    callbackSuccess: () => setOpen(false)
  })
  const {
    control,
    formState: { errors },
  } = useFormReturn

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Add New Feedback"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="feedback"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Description"
                    field={field}
                    fullWidth
                    multiline
                    minRows={4}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="attachments"
                control={control}
                render={({ field }) => (
                  <InputFileComponent
                    errors={errors}
                    field={field}
                    inputFileProps={{
                      accept: ".pdf,.doc,.docx,image/*",
                      regexString: "\\.(pdf|docx?|jpe?g|png|gif|bmp|tiff)$"
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <CustomeButtonCancel type="button" variant="contained">
            Cancel
          </CustomeButtonCancel>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Save
          </Button>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CreateFeedbackModal
