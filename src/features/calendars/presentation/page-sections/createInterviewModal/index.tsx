import { FormControl } from '@mui/material'
import BaseModal from 'shared/components/modal'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Controller } from 'react-hook-form'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import CandidateAutoComplete from 'shared/components/autocomplete/candidate-auto-complete'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import AppButton from 'shared/components/buttons/AppButton'
import { Fragment, useMemo } from 'react'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTimePickers from 'shared/components/input-fields/AppTimePicker'
import dayjs from 'dayjs'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import { shouldDisableTime } from 'features/calendars/domain/functions/functions'
import useCreateInterview from 'features/calendars/hooks/useCreateInterview'
import SelectionTeamPermission from 'features/calendars/permission/components/SelectionTeamPermission'
import LocationInterviewAutoComplete, { LOCATION_INTERVIEW_STATE } from 'shared/components/autocomplete/location-interview-autocomplete'

interface IAddInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateInterviewModal(props: IAddInterviewModal) {
  const { open, setOpen } = props
  const { actions, control, isValid, isPending, watch, resetField, formState } =
    useCreateInterview({
      onSuccess: () => {
        setOpen(false)
      },
    })
  const { onSubmit, onSelectedInterviewDate, onSelectedTo, onSelectedFrom, resetMeetingLink } =
    actions
  const teamId = watch('teamId')
  const jobId = watch('jobId')
  const interviewDate = watch('date')

  const location_interview = watch('location')
  const show_meeting_link = useMemo(() => {
    return LOCATION_INTERVIEW_STATE.ONLINE === location_interview
  }, [location_interview])

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title="Add new Interview"
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2}>
            <FlexBox
              justifyContent={'center'}
              alignItems={'center'}
              marginTop={1}
            >
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
            <FlexBox gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="teamId"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <SelectionTeamPermission
                        name={field.name}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value)
                          resetField('jobId')
                        }}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="jobId"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <JobsAutoComplete
                        name={field.name}
                        value={field.value}
                        disabled={!teamId}
                        filter={{
                          team_ids: teamId ? [teamId] : undefined,
                          status: 'opened',
                        }}
                        multiple={false}
                        onChange={(value) => {
                          field.onChange(value)
                          resetField('candidateId')
                        }}
                        textFieldProps={{
                          required: true,
                          label: 'Job',
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
            <FlexBox justifyContent={'center'} alignItems={'center'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  defaultValue={[]}
                  name="interviewer"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <InterViewerAutoComplete
                        value={field.value ?? []}
                        onChange={field.onChange}
                        multiple={true}
                        name={field.name}
                        filter={{
                          is_able_to_interviewer: true,
                        }}
                        disableCloseOnSelect
                        textFieldProps={{
                          required: true,
                          label: 'Interviewer',
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
                  name="candidateId"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <CandidateAutoComplete
                        value={field.value}
                        onChange={field.onChange}
                        multiple={false}
                        name={field.name}
                        disabled={!jobId}
                        filter={{
                          job_id: jobId ? jobId : undefined,
                          is_able_to_interview: true,
                          is_black_list: false,
                        }}
                        textFieldProps={{
                          required: true,
                          label: 'Select candidate',
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
              <FlexBox width={'50%'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <AppDateField
                          label={'Select date'}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => {
                            field.onChange(value?.toDate())
                            onSelectedInterviewDate()
                          }}
                          textFieldProps={{
                            required: true,
                          }}
                          minDate={dayjs()}
                        />
                        <HelperTextForm
                          message={fieldState.error?.message}
                        ></HelperTextForm>
                      </Fragment>
                    )}
                  />
                </FormControl>
              </FlexBox>
              <FlexBox gap={2} width={'50%'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="from"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <AppTimePickers
                          label={'From'}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => {
                            if (value) onSelectedFrom(value?.toDate())
                            else field.onChange(value)
                          }}
                          views={['hours', 'minutes']}
                          ampm={false}
                          disabled={!interviewDate}
                          shouldDisableTime={(value, view) =>
                            shouldDisableTime(interviewDate, value, view)
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
                      </Fragment>
                    )}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="to"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <AppTimePickers
                          label={'To'}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => {
                            if (value) onSelectedTo(value?.toDate())
                            else field.onChange(value)
                          }}
                          views={['hours', 'minutes']}
                          ampm={false}
                          disabled={!interviewDate}
                          shouldDisableTime={(value, view) =>
                            shouldDisableTime(interviewDate, value, view)
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
                      </Fragment>
                    )}
                  />
                </FormControl>
              </FlexBox>
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
                          required: true
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
                        rows={3}
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
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default CreateInterviewModal
