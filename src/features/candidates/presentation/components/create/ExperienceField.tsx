import { FormControl, FormControlLabel } from '@mui/material'
import { FormDataSchemaCreateCandidate } from 'features/candidates/shared/constants/formSchema'
import { Controller, useFormContext } from 'react-hook-form'
import AppCheckBox from 'shared/components/AppCheckBox'
import FlexBox from 'shared/components/flexbox/FlexBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { Text13md, Text15sb } from 'shared/components/Typography'
import BoxContainer from '../BoxContainer'
import DeleteBox from '../DeleteBox'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'

type ExperienceFieldProps = {
  index: number
  onDelete: () => void
  name: 'candidate_exp'
}

function ExperienceField({ index, onDelete, name }: ExperienceFieldProps) {
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
          <Text15sb>Professional Experience {index + 1}</Text15sb>
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
                  <Text13md color={'grey.600'}>Currently working here</Text13md>
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
                name={`${name}.${index}.position`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      label="Position"
                      required
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
                name={`${name}.${index}.company`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      label="Company/ Organization"
                      onChange={field.onChange}
                      required
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
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name={`${name}.${index}.start_date`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppDateField
                      value={field.value ?? null}
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
                        value={field.value ?? null}
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
                    size="small"
                    label="Description"
                    rows={3}
                    multiline
                  />
                  <HelperTextForm
                    message={fieldState.error?.message}
                  ></HelperTextForm>
                </FlexBox>
              )}
            />
          </FormControl>
        </FlexBox>
      </BoxContainer>
      <DeleteBox onClick={onDelete} />
    </FlexBox>
  )
}

export default ExperienceField
