import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import { useParams } from 'react-router-dom'
import TimePickerComponent from 'shared/components/form/timePickerComponent'
import { Job } from 'features/jobs/domain/interfaces'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import { Fragment } from 'react/jsx-runtime'
import AppDateField from 'shared/components/input-fields/DateField'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { Interview } from 'features/interviews/domain/interfaces'
import useEditInterview from '../../providers/hooks/useEditInterview'
import { transformListItem } from 'shared/utils/utils'
import { replaceYearWithCurrent } from 'shared/utils/date'

interface IEditInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
  hiring_job: Job
  rowData: Interview
  id_interview: string,
  onSuccess?: () => void
}

function EditInterviewModal({
  open,
  setOpen,
  hiring_job,
  rowData,
  id_interview,
  onSuccess
}: IEditInterviewModal) {
  const { id } = useParams()
  const { onSubmit, control, isPending, isValid } = useEditInterview({
    callbackSuccess: () => {
      setOpen(false)
      onSuccess?.()
    },
    defaultValues: {
      id: id_interview,
      candidate_job_id: id,
      title: rowData.title,
      interview_date: new Date(rowData.interview_date),
      description: rowData.description,
      interviewer: transformListItem(rowData.interviewer, 'id'),
      start_from: new Date(replaceYearWithCurrent(rowData.start_from)),
      end_at: new Date(replaceYearWithCurrent(rowData.end_at)),
    },
  })

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Edit Interview"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
          <FlexBox>
            <Box>
              <SpanText sx={{color: '#3A3C40'}}>Job name</SpanText>
              <TinyText>{hiring_job.name}</TinyText>
            </Box>
          </FlexBox>
          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      label={'Interview title'}
                      required
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                      disabled
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>

          <FlexBox>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="interviewer"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <MemberAutoComplete
                      value={field.value || []}
                      onChange={field.onChange}
                      multiple={true}
                      name={field.name}
                      textFieldProps={{
                        label: `Interviewer`,
                        required: true,
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </Fragment>
                )}
              />
            </FormControl>
          </FlexBox>
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="interview_date"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppDateField
                      label={'Select date'}
                      value={field.value}
                      onChange={field.onChange}
                      format='dd/MM/yyyy'
                      textFieldProps={{
                        fullWidth: true,
                        size: 'small',
                        required: true,
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Controller
                    name="start_from"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <TimePickerComponent
                          label="From"
                          field={field}
                          required={true}
                          timePickerProps={{
                            timeSteps: { hours: 1, minutes: 30 },
                          }}
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
                    name="end_at"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <TimePickerComponent
                          label="To"
                          field={field}
                          required={true}
                          timePickerProps={{
                            timeSteps: { hours: 1, minutes: 30 },
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
            </FormControl>
          </FlexBox>

          <FlexBox justifyContent={'center'} alignItems={'center'}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      label={'Description'}
                      required
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                      multiline
                      minRows={4}
                      disabled
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

export default EditInterviewModal