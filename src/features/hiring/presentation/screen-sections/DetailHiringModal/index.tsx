import BaseModal from 'shared/components/modal'
import { FormProvider } from 'react-hook-form'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Hiring } from 'features/hiring/domain/interfaces'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import AvatarUser from '../../components/AvatarUser'
import LoadingField from 'shared/components/form/loadingField'
import PermissionSections from 'shared/components/role-template-permission/screen-sections/edit/PermissionSections'
import {
  Text13sb,
  Text15md,
  Tiny,
  Tiny12md,
} from 'shared/components/Typography'
import useHiringTeamDetail from 'features/hiring/hooks/crud/useHiringTeamDetail'
import ChipField from 'shared/components/input-fields/ChipField'
import PermissionSectionsDetail from 'shared/components/role-template-permission/screen-sections/detail/PermissionSectionsDetail'

interface IEditHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: Hiring
}

function DetailHiringModal({ open, setOpen, id }: IEditHiringModal) {
  const { isGetting, formState, permissionGroup, useFormReturn, getValues } =
    useHiringTeamDetail({
      id: id,
      onSuccess: () => {
        setOpen(false)
      },
    })

  return (
    <FormProvider {...useFormReturn}>
      <ConfirmableModalProvider
        actionCloseModal={setOpen}
        formState={formState}
      >
        <BaseModal.Wrapper open={open} setOpen={setOpen}>
          <BaseModal.Header
            title="Member details"
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
                <FlexBox gap={3}>
                  <AvatarUser action="detail" />
                  <FlexBox flexDirection={'column'} flex={1} gap={2}>
                    <FlexBox gap={2}>
                      <FlexBox flexDirection={'column'} width={'100%'}>
                        <Tiny12md>Name</Tiny12md>
                        <LoadingField isloading={isGetting}>
                          <Text13sb>{getValues('name')}</Text13sb>
                        </LoadingField>
                      </FlexBox>
                      <FlexBox flexDirection={'column'} width={'100%'}>
                        <Tiny12md>Email</Tiny12md>
                        <LoadingField isloading={isGetting}>
                          <Text13sb>{getValues('work_email')}</Text13sb>
                        </LoadingField>
                      </FlexBox>
                    </FlexBox>
                    <FlexBox gap={2}>
                      <FlexBox flexDirection={'column'} width={'100%'}>
                        <Tiny12md>Team</Tiny12md>
                        <LoadingField isloading={isGetting}>
                          <Text13sb>{getValues('teamName')}</Text13sb>
                        </LoadingField>
                      </FlexBox>
                      <FlexBox flexDirection={'column'} width={'100%'}>
                        <Tiny12md>Role</Tiny12md>
                        <LoadingField isloading={isGetting}>
                          <Text13sb>
                            {getValues('rolesTemplateName') &&
                              getValues('rolesTemplateName').map((i) => (
                                <ChipField label={i}></ChipField>
                              ))}
                          </Text13sb>
                        </LoadingField>
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
              <PermissionSectionsDetail
                roleTemplate={permissionGroup}
                isGetting={isGetting}
              />
            </FlexBox>
          </BaseModal.ContentMain>
        </BaseModal.Wrapper>
      </ConfirmableModalProvider>
    </FormProvider>
  )
}

export default DetailHiringModal
