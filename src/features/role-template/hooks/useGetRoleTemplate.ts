import { RoleTemplate } from '../domain/interfaces'
import useGraphql from '../domain/graphql/graphql'
import { useGetResource } from 'shared/hooks/crud-hook'
import { DetailRoleTemplateForm } from '../shared/constants/validate'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import RoleTemplateStructure from 'shared/components/role-template-permission/interfaces/permissionStructure'

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
    RoleTemplate,
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
