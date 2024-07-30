import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import { isEmpty } from 'lodash'
import RoleTemplateStructure, {
  PermissionFormData,
} from 'shared/components/role-template-permission/interfaces/permissionStructure'
import {
  FormDataSchemaDetail,
  schemaHiringDetail,
} from 'features/hiring/shared/constants/schema'
import User from 'shared/schema/database/user'
import { NewUserInput } from 'features/hiring/domain/interfaces'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useHiringTeamDetail(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const { updateUser, getUser, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] =
    useState<RoleTemplateStructure>()
  const { getAllPermission, isGetting: isGetAllPermissionGroups } =
    useGetAllPermissionGroups()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    User,
    FormDataSchemaDetail,
    NewUserInput
  >({
    resolver: yupResolver(schemaHiringDetail),
    editBuildQuery: updateUser,
    oneBuildQuery: getUser,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues: async (data) => {
      let entity_permissions_default: PermissionFormData
      const permissionGroup = await getAllPermission()
      const rolesTemplateName = data?.roles?.map((role) => role.name) ?? []
      const roleTemplate = RoleTemplateStructure.fromJson(permissionGroup)
      const entityPermissions = data?.entity_permissions ?? []
      if (isEmpty(entityPermissions)) {
        entity_permissions_default =
          RoleTemplateStructure.formatDefault(permissionGroup)
      } else {
        entity_permissions_default = RoleTemplateStructure.formatEditDefault(
          permissionGroup,
          entityPermissions
        )
      }
      setPermissionGroup(roleTemplate)
      return {
        status: data?.status ?? '',
        name: data?.name ?? '',
        work_email: data?.work_email ?? '',
        teamName: data?.member_of_hiring_team?.name ?? '',
        rolesTemplateName: rolesTemplateName,
        entity_permissions: entity_permissions_default,
      }
    },
  })

  const { getValues, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending } = useEditReturn

  return {
    control,
    isValid,
    isPending,
    useFormReturn,
    formState,
    getValues,
    isGetting: isGetting || isGetAllPermissionGroups,
    permissionGroup,
  }
}

export default useHiringTeamDetail
