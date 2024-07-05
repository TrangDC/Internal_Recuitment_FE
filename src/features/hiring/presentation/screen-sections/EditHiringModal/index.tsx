import BaseModal from 'shared/components/modal'
import { Controller, FormProvider } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Hiring } from 'features/hiring/domain/interfaces'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import useEditHiring from 'features/hiring/hooks/useEditHiring'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import AvatarUser from '../../components/AvatarUser'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import RoleTemplateAutoComplete from 'shared/components/autocomplete/role-template-autocomplete'
import PermissionSections from '../permissionSections'
import LoadingField from 'shared/components/form/loadingField'
import ButtonEdit from 'shared/components/buttons/buttonEdit'

interface IEditHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Hiring
}

function EditHiringModal({ open, setOpen, id }: IEditHiringModal) {
  const {
    actions,
    control,
    isValid,
    isPending,
    isGetting,
    formState,
    permissionGroup,
    useFormReturn,
    selectedRoleTemplate,
  } = useEditHiring({
    id: id,
    onSuccess: () => {
      setOpen(false)
    },
  })
  const { onSubmit } = actions
  return (
    <FormProvider {...useFormReturn}>
      <ConfirmableModalProvider
        actionCloseModal={setOpen}
        formState={formState}
      >
        <BaseModal.Wrapper open={open} setOpen={setOpen}>
          <BaseModal.Header
            title="Edit hiring team"
            setOpen={setOpen}
          ></BaseModal.Header>
          <BaseModal.ContentMain maxHeight="500px">
            <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
              <FlexBox
                justifyContent={'space-evenly'}
                alignItems={'center'}
                justifyItems={'center'}
                gap={2}
              >
                <AvatarUser action="create" />
                <FlexBox flexDirection={'column'} flex={1} gap={2}>
                  <LoadingField isloading={isGetting}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState }) => (
                          <FlexBox flexDirection={'column'}>
                            <AppTextField
                              label={'Name'}
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
                  </LoadingField>
                  <LoadingField isloading={isGetting}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name="teamId"
                        render={({ field, fieldState }) => (
                          <FlexBox flexDirection={'column'}>
                            <TeamsAutoComplete
                              value={field.value}
                              onChange={field.onChange}
                              name={field.name}
                              textFieldProps={{
                                required: true,
                                label: 'Team',
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
                </FlexBox>
                <FlexBox flexDirection={'column'} flex={1} gap={2}>
                  <LoadingField isloading={isGetting}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name="work_email"
                        render={({ field, fieldState }) => (
                          <FlexBox
                            alignItems={'center'}
                            flexDirection={'column'}
                          >
                            <AppTextField
                              label={'Email'}
                              required
                              size="small"
                              fullWidth
                              disabled
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
                  </LoadingField>
                  <LoadingField isloading={isGetting}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name="rolesTemplateId"
                        render={({ field, fieldState }) => (
                          <FlexBox flexDirection={'column'}>
                            <RoleTemplateAutoComplete
                              value={field.value}
                              onChange={(ids) => {
                                field.onChange(ids)
                              }}
                              onCustomChange={(role) => {
                                selectedRoleTemplate(role)
                              }}
                              name={field.name}
                              multiple={true}
                              textFieldProps={{
                                label: 'Role template',
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
                </FlexBox>
              </FlexBox>
              <PermissionSections
                permissionGroup={permissionGroup}
                isGetting={isGetting}
              />
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
              <ButtonEdit
                loading={isPending}
                disabled={isValid}
                data-testid="btn-submit"
                handlesubmit={(note) => onSubmit(note)}
                title={`Do you want to edit this hiring team?`}
              >
                Submit
              </ButtonEdit>
            </FlexBox>
          </BaseModal.Footer>
        </BaseModal.Wrapper>
      </ConfirmableModalProvider>
    </FormProvider>
  )
}

export default EditHiringModal
