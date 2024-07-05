import { RoleTemplate } from '../domain/interfaces'
import useGraphql from '../domain/graphql/graphql'
import { useGetResource } from 'shared/hooks/crud-hook'
import { DetailRoleTemplateForm } from '../shared/constants/validate'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import { PermissionGroup } from 'shared/hooks/permissions/interface/response'
import { mergeCurrentPermissionWithDefaultFormDataPermission } from 'shared/hooks/permissions/utils/functions'
import { PermissionFormData } from 'shared/hooks/permissions/interface'

type UseGetRoleTemplateProps = {
  id: string
}

function useGetRoleTemplate({ id }: UseGetRoleTemplateProps) {
  const { getRole, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup[]>([])
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
      const entityPermissions = data?.entity_permissions ?? []
      const permissionGroups = await getAllPermission()
      setPermissionGroup(permissionGroups)
      const entity_permissions: PermissionFormData =
        mergeCurrentPermissionWithDefaultFormDataPermission(
          permissionGroups,
          entityPermissions
        )
      return {
        name: data?.name ?? '',
        description: data?.description ?? '',
        entity_permissions: entity_permissions,
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
