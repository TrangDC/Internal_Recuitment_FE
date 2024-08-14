import { FormControl } from '@mui/material'
import { useEditFormContext } from 'features/candidates/hooks/crud/useContext'
import CandidateAvatar from 'features/candidates/presentation/components/edit/CandidateAvatar'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import GenderAutoComplete from 'shared/components/autocomplete/gender-auto-complete'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import FlexBox from 'shared/components/flexbox/FlexBox'
import LoadingField from 'shared/components/form/loadingField'
import UploadFileBox from 'shared/components/form/uploadFileBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import UploadIconSmall from 'shared/components/icons/UploadIconSmall'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { Text13sb, Tiny12md } from 'shared/components/Typography'

type CandidateAboutProps = {
  isGetting: boolean
}

function CandidateAbout({ isGetting }: CandidateAboutProps) {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control } = useEditFormContext()
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
        directionTitle="row-reverse"
        gapTitle={1}
      >
        <FlexBox gap={2} width={'100%'}>
          <CandidateAvatar />
          <FlexBox flexDirection={'column'} width={'100%'} gap={2}>
            <FlexBox gap={2} width={'100%'}>
              <LoadingField isloading={isGetting}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          value={field.value ?? ''}
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
              </LoadingField>
              <LoadingField isloading={isGetting}>
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
              </LoadingField>
              <LoadingField isloading={isGetting}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          value={field.value ?? ''}
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
              </LoadingField>
            </FlexBox>
            <FlexBox gap={2} width={'100%'}>
              <LoadingField isloading={isGetting}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          value={field.value ?? ''}
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
              </LoadingField>
              <LoadingField isloading={isGetting}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppTextField
                          value={field.value ?? ''}
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
              </LoadingField>
              <LoadingField isloading={isGetting}>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field, fieldState }) => (
                      <FlexBox flexDirection={'column'}>
                        <AppDateField
                          value={field.value ?? null}
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
              </LoadingField>
            </FlexBox>
            <LoadingField isloading={isGetting}>
              <Controller
                name="attachments"
                shouldUnregister
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <FlexBox flexDirection={'column'}>
                      <UploadFileBox
                        name={field.name}
                        Icon={<UploadIconSmall />}
                        multiple={true}
                        onChange={(value) => {
                          field.onChange(value)
                        }}
                        validator_files={{
                          max_file: {
                            max: 1,
                            msg_error:
                              'One PDF file only, file size up to 20MB',
                          },
                          max_size: {
                            max: 20,
                            msg_error:
                              'One PDF file only, file size up to 20MB',
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
                        value={field?.value || []}
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
            </LoadingField>
          </FlexBox>
        </FlexBox>
      </AppCollapse>
    </AppContainer>
  )
}

export default CandidateAbout