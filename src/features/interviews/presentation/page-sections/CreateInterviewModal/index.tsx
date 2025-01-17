import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useCreateInterview from '../../../hooks/crud/useCreateInterview'
import { useParams } from 'react-router-dom'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import { Fragment } from 'react/jsx-runtime'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import dayjs from 'dayjs'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTimePickers from 'shared/components/input-fields/AppTimePicker'
import { useMemo } from 'react'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import LocationInterviewAutoComplete, {
  LOCATION_INTERVIEW_STATE,
} from 'shared/components/autocomplete/location-interview-autocomplete'
import HiringJob from 'shared/schema/database/hiring_job'

interface ICreateInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
  hiring_job: HiringJob
  onSuccess?: () => void
}

function CreateInterviewModal({
  open,
  setOpen,
  hiring_job,
  onSuccess,
}: ICreateInterviewModal) {
  const { id } = useParams()
  const {
    onSubmit,
    control,
    isPending,
    isValid,
    watch,
    formState,
    setValue,
    resetMeetingLink,
  } = useCreateInterview({
    callbackSuccess: () => {
      setOpen(false)
      onSuccess?.()
    },
    defaultValues: {
      candidate_job_id: id,
      interview_date: new Date(),
    },
  })

  const interview_date = watch('interview_date')
  const location_interview = watch('location')

  const date_feature = useMemo(() => {
    return dayjs().isBefore(dayjs(interview_date))
  }, [interview_date])

  const show_meeting_link = useMemo(() => {
    return LOCATION_INTERVIEW_STATE.ONLINE === location_interview
  }, [location_interview])

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Add New Interview"
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox>
              <Box>
                <SpanText sx={{ color: '#3A3C40' }}>Job name</SpanText>
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
                      <InterViewerAutoComplete
                        value={field.value || []}
                        onChange={field.onChange}
                        multiple={true}
                        name={field.name}
                        filter={{
                          is_able_to_interviewer: true,
                        }}
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
                        format="dd/MM/yyyy"
                        value={dayjs(field.value)}
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value?.toDate())
                          } else {
                            setValue('interview_date', null, {
                              shouldValidate: true,
                            })
                          }
                        }}
                        minDate={dayjs()}
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
                          <AppTimePickers
                            label={'From'}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(value) => {
                              field.onChange(value)
                            }}
                            views={['hours', 'minutes']}
                            ampm={false}
                            disabled={!interview_date}
                            minTime={
                              date_feature ? dayjs().hour(0).minute(0) : dayjs()
                            }
                            textFieldProps={{
                              required: true,
                            }}
                            timeSteps={{
                              minutes: 30,
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
                          <AppTimePickers
                            label={'To'}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={field.onChange}
                            views={['hours', 'minutes']}
                            ampm={false}
                            minTime={
                              date_feature ? dayjs().hour(0).minute(0) : dayjs()
                            }
                            disabled={!interview_date}
                            textFieldProps={{
                              required: true,
                            }}
                            timeSteps={{
                              minutes: 30,
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
                  name="location"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <LocationInterviewAutoComplete
                        multiple={false}
                        value={field.value ?? ''}
                        onChange={(location) => {
                          resetMeetingLink()
                          field.onChange(location?.value)
                        }}
                        disableCloseOnSelect={true}
                        textFieldProps={{
                          label: 'Location',
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
            </FlexBox>
            {show_meeting_link && (
              <FlexBox justifyContent={'center'} alignItems={'center'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="meeting_link"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          label={'Meeting link'}
                          size="small"
                          fullWidth
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
            )}

            <FlexBox justifyContent={'center'} alignItems={'center'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'Description'}
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={field.onChange}
                        multiline
                        minRows={4}
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
    </ConfirmableModalProvider>
  )
}

export default CreateInterviewModal
