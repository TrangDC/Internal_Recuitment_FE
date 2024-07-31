import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { useGetResource } from 'shared/hooks/crud-hook'
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

type UseHiringTeamDetailProps = {
  id: string
}

function useHiringTeamDetail(props: UseHiringTeamDetailProps) {
  const { id } = props
  const { getUser, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] =
    useState<RoleTemplateStructure>()
  const { getAllPermission, isGetting: isGetAllPermissionGroups } =
    useGetAllPermissionGroups()
  const { useFormReturn, isGetting } = useGetResource<
    User,
    FormDataSchemaDetail
  >({
    resolver: yupResolver(schemaHiringDetail),
    oneBuildQuery: getUser,
    queryKey: [queryKey],
    id,
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

  return {
    control,
    isValid,
    useFormReturn,
    formState,
    getValues,
    isGetting: isGetting || isGetAllPermissionGroups,
    permissionGroup,
  }
}

export default useHiringTeamDetail
