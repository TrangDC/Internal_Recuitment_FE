import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useCreateInterview from '../../providers/hooks/useCreateInterview'
import { useParams } from 'react-router-dom'
import { Job } from 'features/jobs/domain/interfaces'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import { Fragment } from 'react/jsx-runtime'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import dayjs from 'dayjs'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTimePickers from 'shared/components/input-fields/AppTimePicker'
import { useEffect, useMemo } from 'react'

interface ICreateInterviewModal {
  open: boolean
  setOpen: (value: boolean) => void
  hiring_job: Job
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
    handleGenerateToDate,
    setValue,
    watch,
    trigger,
  } = useCreateInterview({
    callbackSuccess: () => {
      setOpen(false)
      onSuccess?.()
    },
    defaultValues: {
      candidate_job_id: id,
    },
  })

  const start_from = watch('start_from')
  const interview_date = watch('interview_date')

  const date_feature = useMemo(() => {
    return dayjs().isBefore(dayjs(interview_date))
  }, [interview_date])

  useEffect(() => {
    if (interview_date) {
      trigger('start_from')
    }
  }, [interview_date])

  return (
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
                      format="dd/MM/yyyy"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(value) => {
                        if (value && !start_from) {
                          setValue('start_from', dayjs().toDate())
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
                            // handleGenerateToDate(value)
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

export default CreateInterviewModal
