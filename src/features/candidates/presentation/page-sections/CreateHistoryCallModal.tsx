import { Box, FormControl } from '@mui/material'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import dayjs from 'dayjs'
import useCreateHistoryCall from 'features/candidates/hooks/candidate-activity/crud/useCreateHistoryCall'
import { Controller } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'
import ContactToAutoComplete from 'shared/components/autocomplete/contact-to-auto-complete'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import { FileUploadAttachment } from 'shared/components/form/inputFileUpload/types'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import AppTimePickers from 'shared/components/input-fields/AppTimePicker'
import BaseModal from 'shared/components/modal'
import { Span, Tiny } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'
import { CandidateHistoryCallTypeEnum } from 'shared/schema/database/candidate_history_calls'

interface CreateHistoryCallModalProps {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateHistoryCallModal({
  open,
  setOpen,
}: CreateHistoryCallModalProps) {
  const translation = useTextTranslation()
  const {
    control,
    formState,
    isValid,
    isPending,
    onSubmit,
    getValues,
    watch,
    onSelectedInterviewDate,
    onSelectedFrom,
    onSelectedTo,
    setValue,
  } = useCreateHistoryCall({
    successCallback: () => {
      setOpen(false)
    },
  })
  const contactType = watch('contactType')
  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={'Add a new call'}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FormControl fullWidth>
              <Controller
                name="name"
                shouldUnregister
                control={control}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      onChange={field.onChange}
                      label="Call name"
                      size="small"
                      required
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
            <FlexBox gap={2}>
              <FlexBox width={'50%'}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="contactDate"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <AppDateField
                          label={'Select date'}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => {
                            if (value) {
                              field.onChange(value?.toDate())
                              onSelectedInterviewDate()
                            } else {
                              setValue('contactDate', null, {
                                shouldValidate: true,
                              })
                            }
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
                    name="timeFrom"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <AppTimePickers
                          label={'From time'}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => {
                            if (value) onSelectedFrom(value?.toDate())
                            else field.onChange(value)
                          }}
                          views={['hours', 'minutes']}
                          ampm={false}
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
                    name="timeTo"
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <AppTimePickers
                          label={'To time'}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => {
                            if (value) onSelectedTo(value?.toDate())
                            else field.onChange(value)
                          }}
                          views={['hours', 'minutes']}
                          ampm={false}
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
            <FormControl fullWidth>
              <Controller
                name="contactType"
                shouldUnregister
                control={control}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <ContactToAutoComplete
                      value={field.value}
                      onChange={(value) => field.onChange(value?.value)}
                      multiple={false}
                      textFieldProps={{
                        label: 'Contact to',
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
            {contactType === CandidateHistoryCallTypeEnum.OTHERS && (
              <FormControl fullWidth>
                <Controller
                  name="contactTo"
                  shouldUnregister
                  control={control}
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        value={field.value}
                        onChange={field.onChange}
                        label="Information of the person that you contacted to"
                        size="small"
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      label="Description"
                      rows={3}
                      multiline
                      required
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
                          max: 10,
                          msg_error: 'Up to 10 files and 20MB/file',
                        },
                        max_size: {
                          max: 20,
                          msg_error: 'Up to 10 files and 20MB/file',
                        },
                      }}
                      descriptionFile={() => {
                        return (
                          <Box>
                            <Span sx={{ color: '#2A2E37 !important' }}>
                              {' '}
                              Attach file{' '}
                            </Span>
                            <Tiny sx={{ color: '#2A2E37 !important' }}>
                              Up to 10 files and 20MB/file
                            </Tiny>
                          </Box>
                        )
                      }}
                      value={field.value as FileUploadAttachment[]}
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

export default CreateHistoryCallModal
