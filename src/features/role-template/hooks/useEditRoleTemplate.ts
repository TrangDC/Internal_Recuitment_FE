import { yupResolver } from '@hookform/resolvers/yup'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import {
  EditRoleTemplateForm,
  EditRoleTemplateSchema,
} from '../shared/constants/validate'
import {
  RoleTemplate,
  UpdateRoleInput,
} from '../domain/interfaces'
import useGraphql from '../domain/graphql/graphql'
import { useState } from 'react'
import _ from 'lodash'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import { PermissionGroup } from 'shared/hooks/permissions/interface/response'
import {
  createNewEntityPermissionInput,
  formatChecksToBE,
  mergeCurrentPermissionWithDefaultFormDataPermission,
} from 'shared/hooks/permissions/utils/functions'
import { PermissionFormData } from 'shared/hooks/permissions/interface'

type UseEditJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditRoleTemplate(props: UseEditJobProps) {
  const { id, onSuccess } = props
  const { getRole, updateRole, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup[]>([])
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

  const { handleSubmit, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((data) => {
      const entity_permissions = data.entity_permissions
      const convertToArray = createNewEntityPermissionInput(entity_permissions)
      mutate({
        name: data.name,
        description: data.description ?? '',
        entity_permissions: formatChecksToBE(convertToArray),
        note: note,
      })
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
