import BaseModal from 'shared/components/modal'
import { Controller, FormProvider } from 'react-hook-form'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import AvatarUser from '../../components/AvatarUser'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import LoadingField from 'shared/components/form/loadingField'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import RoleTemplateSelection from '../../components/role-template-selection'
import { Text15md } from 'shared/components/Typography'
import User from 'shared/schema/database/user'
import PermissionSectionsDetail from 'shared/components/role-template-permission/screen-sections/detail/PermissionSectionsDetail'
import useEditUser from 'features/user/hooks/crud/useEditUser'
import TeamTypeAutoComplete, {
  TeamType,
} from 'shared/components/autocomplete/team-type-auto-complete'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'

interface IEditUserModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: User
}

function EditUserModal({ open, setOpen, id }: IEditUserModal) {
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
    watch,
  } = useEditUser({
    id: id,
    onSuccess: () => {
      setOpen(false)
    },
  })
  const { onSubmit } = actions

  const teamType = watch('teamType')

  return (
    <FormProvider {...useFormReturn}>
      <ConfirmableModalProvider
        actionCloseModal={setOpen}
        formState={formState}
      >
        <BaseModal.Wrapper open={open} setOpen={setOpen}>
          <BaseModal.Header
            title="Edit user"
            setOpen={setOpen}
          ></BaseModal.Header>
          <BaseModal.ContentMain
            maxHeight="500px"
            sxContentMain={{ padding: 0 }}
          >
            <FlexBox flexDirection={'column'} gap={2} marginTop={1}>
              <FlexBox
                flexDirection={'column'}
                gap={2}
                paddingX={'16px'}
                borderBottom={'1px solid'}
                borderColor={'grey.200'}
                paddingBottom={'16px'}
              >
                <Text15md color={'primary.800'} marginBottom={1}>
                  General Information
                </Text15md>
                <FlexBox gap={2}>
                  <AvatarUser action="create" />
                  <FlexBox flexDirection={'column'} flex={1} gap={2}>
                    <FlexBox gap={2}>
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
                    </FlexBox>
                    <FlexBox gap={2}>
                      <LoadingField isloading={isGetting}>
                        <FormControl fullWidth>
                          <Controller
                            control={control}
                            name="teamType"
                            defaultValue=""
                            render={({ field, fieldState }) => (
                              <FlexBox flexDirection={'column'}>
                                <TeamTypeAutoComplete
                                  value={field.value}
                                  onChange={(value) => {
                                    field.onChange(value?.value ?? '')
                                  }}
                                  textFieldProps={{
                                    required: true,
                                    label: 'Team type',
                                  }}
                                  multiple={false}
                                />
                                <HelperTextForm
                                  message={fieldState.error?.message}
                                ></HelperTextForm>
                              </FlexBox>
                            )}
                          />
                        </FormControl>
                      </LoadingField>
                      {teamType !== TeamType.REC_TEAM && (
                        <LoadingField isloading={isGetting}>
                          <FormControl fullWidth>
                            <Controller
                              control={control}
                              name="hiring_team_id"
                              defaultValue=""
                              render={({ field, fieldState }) => (
                                <FlexBox flexDirection={'column'}>
                                  <TeamsAutoComplete
                                    value={field.value ?? ''}
                                    onChange={(value) => {
                                      field.onChange(value ?? '')
                                    }}
                                    name={field.name}
                                    textFieldProps={{
                                      required: true,
                                      label: 'Hiring team',
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
                      )}
                      {teamType !== TeamType.HIRING_TEAM && (
                        <LoadingField isloading={isGetting}>
                          <FormControl fullWidth>
                            <Controller
                              control={control}
                              name="rec_team_id"
                              defaultValue=""
                              shouldUnregister
                              render={({ field, fieldState }) => (
                                <FlexBox flexDirection={'column'}>
                                  <RecTeamsAutoComplete
                                    value={field?.value ?? ''}
                                    onChange={(value) => {
                                      field.onChange(value ?? '')
                                    }}
                                    name={field.name}
                                    textFieldProps={{
                                      required: true,
                                      label: 'REC team',
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
                      )}
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
              <Box padding={'0px 16px'}>
                <LoadingField isloading={isGetting}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="rolesTemplateId"
                      render={({ field, fieldState }) => (
                        <FlexBox flexDirection={'column'}>
                          <RoleTemplateSelection
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
                              required: true,
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
              </Box>
              <PermissionSectionsDetail
                roleTemplate={permissionGroup}
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

export default EditUserModal
