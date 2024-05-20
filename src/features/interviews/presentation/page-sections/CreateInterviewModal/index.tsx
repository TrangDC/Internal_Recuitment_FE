import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, Button, Grid } from '@mui/material'
import InputComponent from 'shared/components/form/inputComponent'
import AutoCompleteComponent from 'shared/components/form/autoCompleteComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import {
  CustomeButtonCancel,
  SpanText,
  TinyText,
} from 'shared/components/form/styles'
import { FormDataSchema } from '../../providers/constants/schema'
import DatePickerComponent from 'shared/components/form/datePickerComponent'
import useCreateInterview from '../../providers/hooks/useCreateInterview'
import { Member } from 'features/teams/domain/interfaces'
import useSelectMember from 'shared/hooks/graphql/useSelectMember'
import { useParams } from 'react-router-dom'
import TimePickerComponent from 'shared/components/form/timePickerComponent'

interface ICreateInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateInterviewModal({ open, setOpen }: ICreateInterviewModal) {
  const { id } = useParams()

  const { onSubmit, useFormReturn } = useCreateInterview({
    defaultValues: {
      candidate_job_id: id,
      description: ''
    },
    callbackSuccess: () => setOpen(false)
  })
  const {
    control,
    formState: { errors },
  } = useFormReturn
  const { members } = useSelectMember()

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Add New Interview"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box>
                <SpanText>Job name</SpanText>
                <TinyText>Software Engineer</TinyText>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputComponent<FormDataSchema>
                    errors={errors}
                    label="Interview title"
                    size="small"
                    field={field}
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="interviewer"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent<FormDataSchema, Member>
                    options={members}
                    label="name"
                    inputLabel="Interviewers"
                    errors={errors}
                    field={field}
                    keySelect="id"
                    fullWidth
                    multiple
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="interview_date"
                control={control}
                render={({ field }) => (
                  <DatePickerComponent<FormDataSchema>
                    textFieldProps={{
                      fullWidth: true,
                      size: 'small',
                      required: true,
                    }}
                    errors={errors}
                    label="Select date"
                    field={field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                name="start_from"
                control={control}
                render={({ field }) => (
                  <TimePickerComponent
                    errors={errors}
                    label="From"
                    field={field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="end_at"
                control={control}
                render={({ field }) => (
                  <TimePickerComponent
                    errors={errors}
                    label="To"
                    field={field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
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

export default CreateInterviewModal
