import BaseModal from 'shared/components/modal'
import { Controller, FormProvider } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppTextField from 'shared/components/input-fields/AppTextField'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AppButton from 'shared/components/buttons/AppButton'
import { ICreateModal } from 'shared/components/modal/interface'
import LoadingField from 'shared/components/form/loadingField'
import { Text15md } from 'shared/components/Typography'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import PermissionSections from 'shared/components/role-template-permission/screen-sections/edit/PermissionSections'
import useCreateRoleTemplate from 'features/role-template/hooks/crud/useCreateRoleTemplate'

function CreateRoleTemplateModal({ open, setOpen }: ICreateModal) {
  const { useFormReturn, onSubmit, isValid, permissionGroup, isGetting } =
    useCreateRoleTemplate({
      callbackSuccess() {
        setOpen(false)
      },
    })
  const { control, formState } = useFormReturn
  return (
    <ConfirmableModalProvider actionCloseModal={setOpen} formState={formState}>
      <FormProvider {...useFormReturn}>
        <BaseModal.Wrapper open={open} setOpen={setOpen}>
          <BaseModal.Header
            title="Create role"
            setOpen={setOpen}
          ></BaseModal.Header>
          <BaseModal.ContentMain
            maxHeight="500px"
            sxContentMain={{
              padding: '16px 0px',
            }}
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
                <Text15md color={'primary.800'}>General information</Text15md>
                <FlexBox justifyContent={'center'}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <FlexBox flexDirection={'column'}>
                          <LoadingField isloading={false}>
                            <AppTextField
                              label={'Role name'}
                              required
                              size="small"
                              fullWidth
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <HelperTextForm
                              message={fieldState.error?.message}
                            ></HelperTextForm>
                          </LoadingField>
                        </FlexBox>
                      )}
                    />
                  </FormControl>
                </FlexBox>
                <FlexBox justifyContent={'center'}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="description"
                      render={({ field, fieldState }) => (
                        <FlexBox flexDirection={'column'}>
                          <LoadingField isloading={false}>
                            <AppTextField
                              label={'Description'}
                              fullWidth
                              value={field.value}
                              onChange={field.onChange}
                              multiline
                              rows={3}
                            />
                            <HelperTextForm
                              message={fieldState.error?.message}
                            ></HelperTextForm>
                          </LoadingField>
                        </FlexBox>
                      )}
                    />
                  </FormControl>
                </FlexBox>
              </FlexBox>
              {permissionGroup && (
                <PermissionSections
                  roleTemplate={permissionGroup}
                  isGetting={isGetting}
                />
              )}
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
              <AppButton
                variant="contained"
                size="small"
                disabled={isValid}
                onClick={() => onSubmit()}
              >
                Submit
              </AppButton>
            </FlexBox>
          </BaseModal.Footer>
        </BaseModal.Wrapper>
      </FormProvider>
    </ConfirmableModalProvider>
  )
}

export default CreateRoleTemplateModal
