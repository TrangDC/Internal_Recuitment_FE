import { FormControl } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import CandidateSourceAutoComplete, {
  TypeCandidateSource,
} from 'shared/components/autocomplete/candidate-source-auto-complete'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import FlexBox from 'shared/components/flexbox/FlexBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import AppDateField from 'shared/components/input-fields/AppDateField'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import CandidateBySource from '../../CreateCandidateModal/components/CandidateBySource'
import AppTextField from 'shared/components/input-fields/AppTextField'
import dayjs from 'dayjs'
import { hasErrors } from 'features/candidates/shared/utils'
import { FormDataSchemaCreateCandidate } from 'features/candidates/shared/constants/formSchema'

function RefInformation() {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, setValue, clearErrors, watch, formState, trigger } =
    useCreateFormContext()
  const candidate_source = watch('reference_type')

  const resetSourceValue = () => {
    setValue('reference_value', '')
    clearErrors('reference_value')
  }
  const names: (keyof FormDataSchemaCreateCandidate)[] = [
    'reference_type',
    'reference_uid',
    'recruit_time',
    'reference_value',
  ]
  function isValidFields() {
    trigger(names)
  }

  const inValid = hasErrors<FormDataSchemaCreateCandidate>(
    formState.errors,
    names
  )
  return (
    <AppContainer
      sx={{
        marginTop: '16px',
      }}
    >
      <AppCollapse
        open={opeCollapse}
        title="New Candidate Recruitment Information"
        setOpen={setOpeCollapse}
        padding={0}
        showIcon={inValid}
        directionTitle="row-reverse"
        gapTitle={1}
        onClose={isValidFields}
        titleStyle={{
          fontSize: 18,
        }}
      >
        <FlexBox gap={2} flexDirection={'column'}>
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="reference_type"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <CandidateSourceAutoComplete
                      value={field.value}
                      onChange={(recruit) => {
                        resetSourceValue()
                        field.onChange(recruit?.value)
                      }}
                      multiple={false}
                      textFieldProps={{
                        label: `Candidate source`,
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
            {candidate_source && (
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="reference_value"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <CandidateBySource
                        name={field.name}
                        onChange={field.onChange}
                        source={candidate_source as TypeCandidateSource}
                        value={field.value ?? ''}
                        required={true}
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
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="reference_uid"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <InterViewerAutoComplete
                      value={field.value}
                      textFieldProps={{
                        label: 'Recruiter',
                        required: true,
                      }}
                      name={field.name}
                      multiple={false}
                      onChange={field.onChange}
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
                name="recruit_time"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppDateField
                      value={field.value ? dayjs(field.value) : null}
                      onChange={field.onChange}
                      label="Recruit time"
                      textFieldProps={{
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
          <FormControl fullWidth>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <FlexBox flexDirection={'column'}>
                  <AppTextField
                    value={field.value}
                    name={field.name}
                    onChange={field.onChange}
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
      </AppCollapse>
    </AppContainer>
  )
}

export default RefInformation
