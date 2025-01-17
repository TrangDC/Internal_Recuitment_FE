import BaseModal from 'shared/components/modal'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13md, Text15md, Tiny12md } from 'shared/components/Typography'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from 'shared/components/icons/EditIcon'
import { FormProvider } from 'react-hook-form'
import Cant from 'features/authorization/presentation/components/Cant'
import PermissionSectionsDetail from 'shared/components/role-template-permission/screen-sections/detail/PermissionSectionsDetail'
import useGetRoleTemplate from 'features/role-template/hooks/crud/useGetRoleTemplate'

type DetailRoleTemplateModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  handleOpenEdit: (value: string, rowData: boolean) => void
}

function DetailRoleTemplateModal({
  open,
  setOpen,
  id,
  handleOpenEdit,
}: DetailRoleTemplateModalProps) {
  const { useFormReturn, isGetting, permissionGroup } = useGetRoleTemplate({
    id: id,
  })
  const { getValues } = useFormReturn
  return (
    <FormProvider {...useFormReturn}>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <Box>
          <BaseModal.Header
            title={'Role details'}
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
                      handleOpenEdit(id, getValues('is_able_to_delete'))
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
            sxContentMain={{
              padding: '16px 0px',
            }}
            maxHeight="500px"
          >
            <Box>
              <FlexBox
                flexDirection={'column'}
                gap={2}
                paddingX={'16px'}
                borderBottom={'1px solid'}
                borderColor={'grey.200'}
                paddingBottom={'16px'}
              >
                <Text15md color={'primary.800'}>General information</Text15md>
                <FlexBox flexDirection={'column'} gap={2}>
                  <FormControl fullWidth>
                    <Box>
                      <Tiny12md color={'grey.500'}>Name</Tiny12md>
                      <FlexBox
                        alignItems={'center'}
                        gap={1}
                        width={'100%'}
                        marginTop={1}
                      >
                        <Text13md color={'grey.900'} fontWeight={600}>
                          {getValues('name')}
                        </Text13md>
                      </FlexBox>
                    </Box>
                  </FormControl>
                  <FormControl fullWidth>
                    <Box>
                      <Tiny12md color={'grey.500'}>Description</Tiny12md>
                      <FlexBox
                        alignItems={'center'}
                        gap={1}
                        width={'100%'}
                        marginTop={1}
                      >
                        <Text13md color={'grey.900'} fontWeight={600}>
                          {getValues('description')}
                        </Text13md>
                      </FlexBox>
                    </Box>
                  </FormControl>
                </FlexBox>
              </FlexBox>
              <PermissionSectionsDetail
                roleTemplate={permissionGroup}
                isGetting={isGetting}
              />
            </Box>
          </BaseModal.ContentMain>
        </Box>
      </BaseModal.Wrapper>
    </FormProvider>
  )
}

export default DetailRoleTemplateModal
