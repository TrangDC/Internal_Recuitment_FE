import { FormControl } from '@mui/material'
import dayjs from 'dayjs'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import CandidateAvatar from 'features/candidates/presentation/components/create/CandidateAvatar'
import { FormDataSchemaCreateCandidate } from 'features/candidates/shared/constants/formSchema'
import { hasErrors } from 'features/candidates/shared/utils'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import GenderAutoComplete from 'shared/components/autocomplete/gender-auto-complete'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import FlexBox from 'shared/components/flexbox/FlexBox'
import UploadFileBox from 'shared/components/form/uploadFileBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import UploadIconSmall from 'shared/components/icons/UploadIconSmall'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { Text13sb, Tiny12md } from 'shared/components/Typography'

function CandidateAbout() {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, formState, trigger } = useCreateFormContext()

  const names: (keyof FormDataSchemaCreateCandidate)[] = [
    'name',
    'gender',
    'email',
    'phone',
    'address',
    'dob',
    'attachments',
  ]
  const inValid = hasErrors<FormDataSchemaCreateCandidate>(
    formState.errors,
    names
  )

  function isValidFields() {
    trigger(names)
  }
  return (
    <AppContainer
      sx={{
        marginTop: '20px',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <AppCollapse
        open={opeCollapse}
        title="About the candidate"
        setOpen={setOpeCollapse}
        padding={0}
        showIcon={inValid}
        onClose={isValidFields}
        directionTitle="row-reverse"
        gapTitle={1}
        titleStyle={{
          fontSize: 18,
        }}
      >
        <FlexBox gap={2} width={'100%'}>
          <CandidateAvatar />
          <FlexBox flexDirection={'column'} width={'100%'} gap={2}>
            <FlexBox gap={2} width={'100%'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        value={field.value}
                        onChange={field.onChange}
                        size="small"
                        label="Name"
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
                  control={control}
                  name="gender"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <GenderAutoComplete
                        value={field.value}
                        textFieldProps={{
                          label: 'Gender',
                          required: true,
                        }}
                        multiple={false}
                        onChange={(value) => field.onChange(value?.value)}
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
                  control={control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        value={field.value}
                        onChange={field.onChange}
                        size="small"
                        label="Email"
                        required
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </FlexBox>
                  )}
                />
              </FormControl>
            </FlexBox>
            <FlexBox gap={2} width={'100%'}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        value={field.value}
                        onChange={field.onChange}
                        size="small"
                        label="Phone number"
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
                  control={control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        value={field.value}
                        onChange={field.onChange}
                        size="small"
                        label="Address"
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
                  control={control}
                  name="dob"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppDateField
                        value={field.value ? dayjs(field.value) : null}
                        textFieldProps={{
                          label: 'DOB',
                        }}
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
            <Controller
              name="attachments"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <FlexBox flexDirection={'column'}>
                    <UploadFileBox
                      name={field.name}
                      Icon={<UploadIconSmall />}
                      multiple={true}
                      onChange={field.onChange}
                      validator_files={{
                        max_file: {
                          max: 1,
                          msg_error: 'One PDF file only, file size up to 20MB',
                        },
                        max_size: {
                          max: 20,
                          msg_error: 'One PDF file only, file size up to 20MB',
                        },
                        is_valid: {
                          regex: '\\.(pdf)',
                          msg_error: 'PDF file only, file size up to 20mb',
                        },
                      }}
                      descriptionFile={() => (
                        <FlexBox
                          flexDirection={'column'}
                          alignItems={'flex-start'}
                        >
                          <Text13sb>Attach CV</Text13sb>
                          <Tiny12md>
                            One PDF file only, file size up to 20MB
                          </Tiny12md>
                        </FlexBox>
                      )}
                      folder="candidate"
                      value={field.value ?? []}
                      boxContainerSx={{
                        width: 400,
                        padding: '10px 6px',
                      }}
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )
              }}
            />
          </FlexBox>
        </FlexBox>
      </AppCollapse>
    </AppContainer>
  )
}

export default CandidateAbout
