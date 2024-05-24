import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { FormDataSchema } from '../../providers/constants/schema'
import useCreateJob from '../../providers/hooks/useCreateJob'
import { SALARY_RENDER } from '../../providers/constants'
import EditorBoxComponent from 'shared/components/form/editorComponent'
import useTextTranslation from 'shared/constants/text'
import InputNumberComponent from 'shared/components/form/inputNumberComponent'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import { Fragment } from 'react/jsx-runtime'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import SalaryTypeAutoComponent from 'shared/components/autocomplete/salary-type-autocomplete'
import CurrencyAutoComplete from 'shared/components/autocomplete/currency-autocomplete'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'

interface ICreateJobModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateJobModal({ open, setOpen }: ICreateJobModal) {
  const { onSubmit, control, isPending, isValid, setValue } = useCreateJob({
    callbackSuccess: () => {
      setOpen(false)
    },
  })

  const translation = useTextTranslation()

  const salary = useWatch({ control, name: 'salary_type' })
  const resetSalary = () => {
    setValue('salary_from', '0')
    setValue('salary_to', '0')
  }

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
      <BaseModal.Header
        title={translation.MODLUE_JOBS.new_job}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain maxHeight="500px">
        <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
          <FlexBox justifyContent={'center'} alignItems={'center'} gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      label={'Job name'}
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

            <FormControl fullWidth>
              <Controller
                control={control}
                name="team_id"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TeamsAutoComplete
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      multiple={false}
                      textFieldProps={{
                        required: true,
                        label: 'Team',
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
          <FlexBox justifyContent={'center'} alignItems={'center'} gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="location"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <LocationAutoComplete
                      value={field.value}
                      onChange={(data) => field.onChange(data?.value)}
                      multiple={false}
                      textFieldProps={{
                        required: true,
                        label: 'Location',
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
                name="created_by"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <MemberAutoComplete
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      multiple={false}
                      textFieldProps={{
                        required: true,
                        label: 'Requester',
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
          <FlexBox justifyContent={'center'} alignItems={'flex-start'} gap={2}>
            <FlexBox
              justifyContent={'center'}
              alignItems={'flex-start'}
              width={'100%'}
              gap={2}
            >
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="salary_type"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <SalaryTypeAutoComponent
                        value={field.value}
                        onChange={(data) => {
                          field.onChange(data?.value)
                          resetSalary()
                        }}
                        multiple={false}
                        textFieldProps={{
                          required: true,
                          label: 'Salary',
                        }}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
                  )}
                />
              </FormControl>

              {SALARY_RENDER.map((salary_item, index) => {
                return salary_item.typeComponent === 'textField' &&
                  salary_item.accept.includes(salary) ? (
                  <FormControl fullWidth key={index}>
                    <Controller
                      //@ts-ignore
                      name={salary_item.name}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Fragment>
                          <InputNumberComponent<FormDataSchema>
                            label={salary_item?.label}
                            field={field}
                            fullWidth
                            type={salary_item?.type}
                            style={salary_item?.style}
                            sx={{
                              '&.MuiFormControl-root': {
                                marginTop: '0px !important',
                              },
                            }}
                            thousandSeparator={salary_item?.thousandSeparator}
                          />
                          <HelperTextForm
                            message={fieldState.error?.message}
                          ></HelperTextForm>
                        </Fragment>
                      )}
                    />
                  </FormControl>
                ) : salary_item.typeComponent === 'autoComplete' &&
                  salary_item.accept.includes(salary) ? (
                  <FormControl fullWidth key={index}>
                    <Controller
                      //@ts-ignore
                      name={salary_item.name}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Fragment>
                          <CurrencyAutoComplete
                            value={field.value as string}
                            onChange={(data) => field.onChange(data?.value)}
                            multiple={false}
                            textFieldProps={{
                              required: true,
                              label: 'Salary',
                            }}
                          />
                          <HelperTextForm
                            message={fieldState.error?.message}
                          ></HelperTextForm>
                        </Fragment>
                      )}
                    />
                  </FormControl>
                ) : null
              })}
            </FlexBox>
            <FlexBox
              justifyContent={'center'}
              alignItems={'center'}
              width={'100%'}
              gap={2}
            >
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <AppTextField
                        label={'Staff required'}
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
          </FlexBox>

          <FlexBox justifyContent={'center'} alignItems={'center'} gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <EditorBoxComponent<FormDataSchema>
                      label={translation.COMMON.description}
                      field={field}
                      required={true}
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
  )
}

export default CreateJobModal
