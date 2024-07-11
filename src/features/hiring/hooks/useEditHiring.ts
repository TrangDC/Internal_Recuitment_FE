import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { Hiring, HiringInput } from 'features/hiring/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { FormDataSchemaUpdate, schemaUpdate } from '../shared/constants/schema'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import { isEmpty } from 'lodash'
import Role from 'shared/schema/database/role'
import RoleTemplateStructure, {
  PermissionFormData,
} from 'shared/components/role-template-permission/interfaces/permissionStructure'
import {
  getKeyName,
  mergePermissions,
} from 'shared/components/role-template-permission/utils/utils'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditHiring(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const { updateUser, getUser, queryKey } = useGraphql()
  const [defaultEntityPermissions, setDefaultEntityPermissions] =
    useState<PermissionFormData>({})
  const [permissionGroup, setPermissionGroup] =
    useState<RoleTemplateStructure>()
  const { getAllPermission, isGetting: isGetAllPermissionGroups } =
    useGetAllPermissionGroups()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Hiring,
    FormDataSchemaUpdate,
    HiringInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateUser,
    oneBuildQuery: getUser,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues: async (data) => {
      let entity_permissions_default: PermissionFormData
      const permissionGroup = await getAllPermission()
      const rolesTemplateId = data?.roles?.map((role) => role.id) ?? []
      const roleTemplate = RoleTemplateStructure.fromJson(permissionGroup)
      const entityPermissions = data?.entity_permissions ?? []
      const defaultEP = RoleTemplateStructure.formatDefaultEntityPermissions(
        permissionGroup,
        entityPermissions
      )
      setDefaultEntityPermissions(defaultEP)
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
        teamId: data?.member_of_teams?.id ?? '',
        rolesTemplateId,
        entity_permissions: entity_permissions_default,
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((data) => {
      const entity_permissions = data.entity_permissions
      if (entity_permissions) {
        mutate({
          name: data.name,
          status: data.status,
          work_email: data.work_email ?? '',
          entity_permissions:
            RoleTemplateStructure.formatEditCreateValue(entity_permissions),
          note: note,
          team_id: data.teamId,
          role_id: data.rolesTemplateId,
        })
      }
    })()
  }

  const selectedRoleTemplate = (role: Role[]) => {
    setValue('entity_permissions', defaultEntityPermissions, {
      shouldValidate: true,
      shouldTouch: true,
    })
    const data = mergePermissions(role)
    Object.keys(data).forEach((key) => {
      const newValue = data[key]
      const keyName = getKeyName(key) as any
      setValue(keyName, newValue)
    })
  }
  return {
    control,
    isValid,
    isPending,
    useFormReturn,
    actions: {
      onSubmit,
    },
    formState,
    setValue,
    isGetting: isGetting || isGetAllPermissionGroups,
    permissionGroup,
    selectedRoleTemplate,
  }
}

export default useEditHiring
