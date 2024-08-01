import BaseModal from 'shared/components/modal'
import { FormProvider } from 'react-hook-form'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { ConfirmableModalProvider } from 'contexts/ConfirmableModalContext'
import AvatarUser from '../../components/AvatarUser'
import LoadingField from 'shared/components/form/loadingField'
import { Text13sb, Text15md, Tiny12md } from 'shared/components/Typography'
import useHiringTeamDetail from 'features/hiring/hooks/crud/useHiringTeamDetail'
import ChipField from 'shared/components/input-fields/ChipField'
import PermissionSectionsDetail from 'shared/components/role-template-permission/screen-sections/detail/PermissionSectionsDetail'
import Cant from 'features/authorization/presentation/components/Cant'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from 'shared/components/icons/EditIcon'
import User from 'shared/schema/database/user'
interface IEditHiringModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  rowData?: User
  handleOpenEdit: (id: string) => void
}

function DetailHiringModal({
  open,
  setOpen,
  id,
  handleOpenEdit,
}: IEditHiringModal) {
  const { isGetting, formState, permissionGroup, useFormReturn, getValues } =
    useHiringTeamDetail({
      id: id,
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
            EndHeader={
              <FlexBox gap={1}>
                <Cant
                  module="ROLES_TEMPLATE"
                  checkBy={{
                    compare: 'hasAny',
                    permissions: ['EDIT.everything'],
                  }}
                >
                  <EditIcon
                    sx={{
                      height: '24px',
                      width: '24px',
                      color: '#82868C',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleOpenEdit(id)
                      setOpen(false)
                    }}
                  />
                </Cant>
                <CloseIcon
                  sx={{
                    height: '24px',
                    width: '24px',
                    color: '#82868C',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setOpen(false)
                  }}
                />
              </FlexBox>
            }
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
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
              <FlexBox
                flexDirection={'column'}
                width={'100%'}
                padding={'0px 16px'}
              >
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
