import { yupResolver } from '@hookform/resolvers/yup'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import useGraphql from 'features/role-template/domain/graphql/graphql'
import {
  RoleTemplate,
  UpdateRoleInput,
} from 'features/role-template/domain/interfaces'
import RoleTemplateStructure from 'shared/components/role-template-permission/interfaces/permissionStructure'
import {
  EditRoleTemplateForm,
  EditRoleTemplateSchema,
} from '../shared/constants/validate'

type UseEditJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditRoleTemplate(props: UseEditJobProps) {
  const { id, onSuccess } = props
  const { getRole, updateRole, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] =
    useState<RoleTemplateStructure>()
  const { getAllPermission, isGetting: isGetAllPermissionGroups } =
    useGetAllPermissionGroups()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    RoleTemplate,
    EditRoleTemplateForm,
    UpdateRoleInput
  >({
    resolver: yupResolver(EditRoleTemplateSchema),
    editBuildQuery: updateRole,
    oneBuildQuery: getRole,
    queryKey: [queryKey],
    id,
    onSuccess,
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

  const { handleSubmit, formState } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((data) => {
      const entity_permissions = data.entity_permissions
      if (entity_permissions) {
        mutate({
          name: data.name,
          description: data.description ?? '',
          entity_permissions:
            RoleTemplateStructure.formatEditCreateValue(entity_permissions),
          note: note,
        })
      }
    })()
  }

  return {
    isValid,
    isPending,
    useFormReturn,
    actions: {
      onSubmit,
    },
    formState,
    isGetting: isGetting || isGetAllPermissionGroups,
    permissionGroup,
  }
}

export default useEditRoleTemplate
