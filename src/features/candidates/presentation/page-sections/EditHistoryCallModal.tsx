import { Box, FormControl } from '@mui/material'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import dayjs from 'dayjs'
import useEditHistoryCall from 'features/candidates/hooks/candidate-activity/crud/useEditHistoryCall'
import { Controller } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'
import ContactToAutoComplete from 'shared/components/autocomplete/contact-to-auto-complete'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import FlexBox from 'shared/components/flexbox/FlexBox'
import InputFileUpload from 'shared/components/form/inputFileUpload'
import { FileUploadAttachment } from 'shared/components/form/inputFileUpload/types'
import LoadingField from 'shared/components/form/loadingField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import AppTimePickers from 'shared/components/input-fields/AppTimePicker'
import BaseModal from 'shared/components/modal'
import { Span, Tiny } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'
import { CandidateHistoryCallTypeEnum } from 'shared/schema/database/candidate_history_calls'

interface EditHistoryCallModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  successCallback: () => void
}

function EditHistoryCallModal({
  open,
  setOpen,
  id,
  successCallback,
}: EditHistoryCallModalProps) {
  const translation = useTextTranslation()
  const {
    control,
    formState,
    isValid,
    isPending,
    onSubmit,
    getValues,
    watch,
    isGetting,
    onSelectedFrom,
    onSelectedInterviewDate,
    onSelectedTo,
    setValue,
  } = useEditHistoryCall({
    id: id,
    successCallback: () => {
      setOpen(false)
      successCallback()
    },
  })
  const contactType = watch('contactType')
  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={'Edit call'}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain>
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <LoadingField isloading={isGetting}>
              <FormControl fullWidth>
                <Controller
                  name="name"
                  shouldUnregister
                  control={control}
                  defaultValue=""
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
            </LoadingField>
            <FlexBox gap={2}>
              <FlexBox width={'50%'}>
                <LoadingField isloading={isGetting}>
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
                          />
                          <HelperTextForm
                            message={fieldState.error?.message}
                          ></HelperTextForm>
                        </Fragment>
                      )}
                    />
                  </FormControl>
                </LoadingField>
              </FlexBox>
              <FlexBox gap={2} width={'50%'}>
                <LoadingField isloading={isGetting}>
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
                </LoadingField>
                <LoadingField isloading={isGetting}>
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
                </LoadingField>
              </FlexBox>
            </FlexBox>
            <LoadingField isloading={isGetting}>
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
            </LoadingField>
            <LoadingField isloading={isGetting}>
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
            </LoadingField>
            <LoadingField isloading={isGetting}>
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
            </LoadingField>
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
            <ButtonEdit
              disabled={isValid}
              handlesubmit={onSubmit}
              loading={isPending}
            >
              Submit
            </ButtonEdit>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </ConfirmableModalProvider>
  )
}

export default EditHistoryCallModal
