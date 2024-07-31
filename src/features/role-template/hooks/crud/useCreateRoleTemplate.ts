import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import useGraphql from 'features/role-template/domain/graphql/graphql'
import RoleTemplateStructure from 'shared/components/role-template-permission/interfaces/permissionStructure'
import { CreateRoleArguments } from 'shared/schema/database/role'
import {
  CreateRoleTemplateForm,
  CreateRoleTemplateSchema,
} from 'features/role-template/shared/constants/validate'

interface UseCreateRoleTemplateProps {
  callbackSuccess?: (value: any) => void
}

function useCreateRoleTemplate(props: UseCreateRoleTemplateProps) {
  const { callbackSuccess } = props
  const { createRole, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] = useState<
    RoleTemplateStructure | undefined
  >()
  const { getAllPermission, isGetting } = useGetAllPermissionGroups()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateRoleArguments,
    CreateRoleTemplateForm
  >({
    mutationKey: [queryKey],
    queryString: createRole,
    defaultValues: async () => {
      const entity_permissions = await getAllPermission()
      const roleTemplate = RoleTemplateStructure.fromJson(entity_permissions)
      const entity_permissions_default =
        RoleTemplateStructure.formatDefault(entity_permissions)
      setPermissionGroup(roleTemplate)
      return {
        description: '',
        name: '',
        entity_permissions: entity_permissions_default,
      }
    },
    resolver: yupResolver(CreateRoleTemplateSchema),
    onSuccess: callbackSuccess,
  })

  const { mutate } = useCreateReturn
  const { handleSubmit, formState } = useFormReturn
  const { isValid } = formState

  function onSubmit() {
    handleSubmit((data) => {
      const entity_permissions = data.entity_permissions
      if (entity_permissions) {
        const payload: CreateRoleArguments = {
          input: {
            name: data.name,
            description: data.description ?? '',
            entity_permissions:
              RoleTemplateStructure.formatEditCreateValue(entity_permissions),
          },
          note: '',
        }
        mutate(payload)
      }
    })()
  }

  return {
    useCreateReturn,
    useFormReturn,
    onSubmit,
    isValid: !isValid,
    permissionGroup,
    isGetting,
  }
}

export default useCreateRoleTemplate
