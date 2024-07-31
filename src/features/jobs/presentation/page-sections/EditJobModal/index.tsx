import BaseModal from 'shared/components/modal'
import { Controller, useWatch } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { FormDataSchemaUpdate as FormDataSchema } from '../../../shared/constants/schema'
import { SALARY_RENDER } from '../../../shared/constants'
import useUpdateJob from '../../../hooks/crud/useEditJob'
import useTextTranslation from 'shared/constants/text'
import InputNumberComponent from 'shared/components/form/inputNumberComponent'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import { Fragment } from 'react/jsx-runtime'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import SalaryTypeAutoComponent from 'shared/components/autocomplete/salary-type-autocomplete'
import CurrencyAutoComplete from 'shared/components/autocomplete/currency-autocomplete'
import AppButton from 'shared/components/buttons/AppButton'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import EditorBoxField from 'shared/components/input-fields/EditorField'
import NumberField from 'shared/components/input-fields/NumberField'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import SkillTreeSelection from 'shared/components/tree/skill-tree'
import SelectionTeamPermission from 'features/jobs/permission/components/SelectionTeamPermission'
import ButtonEdit from 'shared/components/buttons/buttonEdit'

interface IEditJobModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function EditJobModal({ open, setOpen, id }: IEditJobModal) {
  const { actions, control, isPending, isValid, isGetting, formState } =
    useUpdateJob({
      id: id,
      onSuccess: () => {
        setOpen(false)
      },
    })
  const { resetSalary, onSubmit, handleChangeManager } = actions

  const translation = useTextTranslation()
  const salary = useWatch({ control, name: 'salary_type' })

  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
        <BaseModal.Header
          title={translation.MODLUE_JOBS.edit_job}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
            <FlexBox flexDirection={'column'}>
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

            <FlexBox justifyContent={'center'} alignItems={'center'} gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <PriorityAutoComplete
                        value={field.value}
                        onChange={(data) => field.onChange(data?.value)}
                        multiple={false}
                        textFieldProps={{
                          required: true,
                          label: 'Priority',
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
                  control={control}
                  name="hiring_team_id"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <SelectionTeamPermission
                        name={field.name}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value)
                          handleChangeManager(value as string)
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
            <FlexBox
              justifyContent={'center'}
              alignItems={'flex-start'}
              gap={2}
            >
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="entity_skill_records"
                  render={({ field, fieldState }) => (
                    <Fragment>
                      <SkillTreeSelection
                        value={field.value}
                        onChange={field.onChange}
                        textFieldProps={{ label: 'Skill' }}
                      />
                      <HelperTextForm
                        message={fieldState.error?.message}
                      ></HelperTextForm>
                    </Fragment>
                  )}
                />
              </FormControl>
            </FlexBox>
            <FlexBox
              justifyContent={'center'}
              alignItems={'flex-start'}
              gap={2}
            >
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
                              required={true}
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
                                label: 'Unit',
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
                        <NumberField
                          label="Staff required"
                          //@ts-ignore
                          size={'small'}
                          required={true}
                          fullWidth={true}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value.replaceAll('.', ''))
                          }}
                          allowNegative={false}
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

            <FlexBox justifyContent={'center'} alignItems={'center'} gap={2}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FlexBox flexDirection={'column'}>
                      <EditorBoxField
                        label={'Job description'}
                        required
                        value={field.value}
                        onEditorChange={field.onChange}
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

export default EditJobModal
