import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import RoleTemplateStructure from 'shared/components/role-template-permission/interfaces/permissionStructure'
import Role from 'shared/schema/database/role'
import useGraphql from 'features/role-template/domain/graphql/graphql'
import { DetailRoleTemplateForm } from 'features/role-template/shared/constants/validate'
import { useGetResource } from 'shared/hooks/crud-hook'

type UseGetRoleTemplateProps = {
  id: string
}

function useGetRoleTemplate({ id }: UseGetRoleTemplateProps) {
  const { getRole, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] =
    useState<RoleTemplateStructure>()
  const { getAllPermission, isGetting: isGetAllPermissionGroups } =
    useGetAllPermissionGroups()
  const { useFormReturn, isGetting } = useGetResource<
    Role,
    DetailRoleTemplateForm
  >({
    id,
    oneBuildQuery: getRole,
    queryKey: [queryKey],
    formatDefaultValues: async (data) => {
      const permissionGroup = await getAllPermission()
      const roleTemplate = RoleTemplateStructure.fromJson(permissionGroup)
      const entityPermissions = data?.entity_permissions ?? []
      const entity_permissions_default =
        RoleTemplateStructure.formatEditDefault(
          permissionGroup,
          entityPermissions
        )
      setPermissionGroup(roleTemplate)
      return {
        name: data?.name ?? '',
        description: data?.description ?? '',
        entity_permissions: entity_permissions_default,
        is_able_to_delete: data?.is_able_to_delete ?? true,
      }
    },
  })

  return {
    useFormReturn,
    isGetting: isGetting || isGetAllPermissionGroups,
    permissionGroup,
  }
}

export default useGetRoleTemplate
