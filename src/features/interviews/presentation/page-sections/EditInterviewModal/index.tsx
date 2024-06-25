import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import { Job } from 'features/jobs/domain/interfaces'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import { Fragment } from 'react/jsx-runtime'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import useEditInterview from '../../providers/hooks/useEditInterview'
import dayjs from 'dayjs'
import AppTimePickers from 'shared/components/input-fields/AppTimePicker'
import UpdateRecord from 'shared/components/modal/modalUpdateRecord'
import { useMemo } from 'react'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'

interface IEditInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
  hiring_job: Job
  id_interview: string
  onSuccess?: () => void
}

function EditInterviewModal({
  open,
  setOpen,
  hiring_job,
  id_interview,
  onSuccess,
}: IEditInterviewModal) {
  const { actions, control, isValid, isPending, isGetting, watch, trigger } =
    useEditInterview({
      id: id_interview,
      onSuccess: () => {
        setOpen(false)
        onSuccess?.()
      },
    })

  const { callbackSubmit } = actions
  const interview_date = watch('interview_date')

  const date_feature = useMemo(() => {
    return dayjs().isBefore(dayjs(interview_date))
  }, [interview_date])

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
                      disabled
                      loading={isGetting}
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
                          trigger('start_from')
                        }

                        field.onChange(value?.toDate())
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
                          minTime={
                            date_feature ? dayjs().hour(0).minute(0) : dayjs()
                          }
                          textFieldProps={{
                            required: true,
                          }}
                          disabled={!interview_date}
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
                          textFieldProps={{
                            required: true,
                          }}
                          disabled={!interview_date}
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
                      disabled
                      loading={isGetting}
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

          <UpdateRecord disabled={isValid} callbackSubmit={callbackSubmit}>
            <ButtonLoading
              variant="contained"
              size="small"
              disabled={isValid}
              handlesubmit={() => {}}
              loading={isPending}
            >
              Submit
            </ButtonLoading>
          </UpdateRecord>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default EditInterviewModal
