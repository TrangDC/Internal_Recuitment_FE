import { FormControlLabel, FormControl } from '@mui/material'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import { Controller } from 'react-hook-form'
import AppCheckBox from 'shared/components/AppCheckBox'
import FlexBox from 'shared/components/flexbox/FlexBox'
import UploadFileBox from 'shared/components/form/uploadFileBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import UploadIconSmall from 'shared/components/icons/UploadIconSmall'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import {
  Text13md,
  Text13sb,
  Text15sb,
  Tiny12md,
} from 'shared/components/Typography'
import BoxContainer from '../BoxContainer'
import DeleteBox from '../DeleteBox'
import dayjs from 'dayjs'

type EducationFieldProps = {
  index: number
  onDelete: () => void
  name: 'candidate_educate'
}

function EducationField({ index, onDelete, name }: EducationFieldProps) {
  const { control, watch } = useCreateFormContext()
  const isCurrent = watch(`${name}.${index}.is_current`)
  return (
    <FlexBox width={'100%'} gap={2} marginBottom={2}>
      <BoxContainer flex={1}>
        <FlexBox
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={2}
        >
          <Text15sb>Education {index + 1}</Text15sb>
          <Controller
            control={control}
            name={`${name}.${index}.is_current`}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <AppCheckBox
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
                label={
                  <Text13md color={'#2A2E37'}>Currently studying here</Text13md>
                }
              />
            )}
          />
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={2}>
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name={`${name}.${index}.school_name`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      label="School name"
                      onChange={field.onChange}
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
            <FormControl fullWidth>
              <Controller
                control={control}
                name={`${name}.${index}.major`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      label="Major"
                      onChange={field.onChange}
                      size="small"
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
                name={`${name}.${index}.gpa`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      label="GPA"
                      onChange={field.onChange}
                      size="small"
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
                name={`${name}.${index}.start_date`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppDateField
                      value={field.value ? dayjs(field.value) : null}
                      textFieldProps={{
                        label: 'Start date',
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
            {!isCurrent && (
              <FormControl fullWidth>
                <Controller
                  control={control}
                  shouldUnregister
                  name={`${name}.${index}.end_date`}
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppDateField
                        value={field.value ? dayjs(field.value) : null}
                        textFieldProps={{
                          label: 'End date',
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
            )}
            <FormControl fullWidth>
              <Controller
                control={control}
                name={`${name}.${index}.location`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      label="Location"
                      onChange={field.onChange}
                      size="small"
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>
          <FormControl fullWidth>
            <Controller
              control={control}
              name={`${name}.${index}.description`}
              render={({ field, fieldState }) => (
                <FlexBox flexDirection={'column'}>
                  <AppTextField
                    value={field.value}
                    onChange={field.onChange}
                    rows={3}
                    multiline
                    label="Description"
                  />
                  <HelperTextForm
                    message={fieldState.error?.message}
                  ></HelperTextForm>
                </FlexBox>
              )}
            />
          </FormControl>
          <Controller
            name={`${name}.${index}.attachments`}
            shouldUnregister
            control={control}
            render={({ field, fieldState }) => (
              <FlexBox flexDirection={'column'}>
                <UploadFileBox
                  name={field.name}
                  Icon={<UploadIconSmall />}
                  multiple={true}
                  onChange={field.onChange}
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
                  descriptionFile={() => (
                    <FlexBox flexDirection={'column'} alignItems={'flex-start'}>
                      <Text13sb>Attach file</Text13sb>
                      <Tiny12md>Up to 10 files and 20MB/file</Tiny12md>
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
            )}
          />
        </FlexBox>
      </BoxContainer>
      <DeleteBox onClick={onDelete} />
    </FlexBox>
  )
}

export default EducationField
