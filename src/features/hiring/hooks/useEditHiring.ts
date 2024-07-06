import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { Hiring, HiringInput } from 'features/hiring/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { FormDataSchemaUpdate, schemaUpdate } from '../shared/constants/schema'
import { useState } from 'react'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import { isEmpty } from 'lodash'
import { Role } from 'shared/components/autocomplete/role-template-autocomplete'
import _ from 'lodash'
import { PermissionGroup } from 'shared/hooks/permissions/interface/response'
import {
  createNewEntityPermissionInput,
  formatChecksToBE,
  formatDefaultFormDataPermission,
  mergeCurrentPermissionWithDefaultFormDataPermission,
  mergePermissions,
} from 'shared/hooks/permissions/utils/functions'
import { PermissionFormData } from 'shared/hooks/permissions/interface'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditHiring(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const { updateUser, getUser, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup[]>([])
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
      console.log('data', data)
      const entityPermissions = data?.entity_permissions ?? []
      const permissionGroups = await getAllPermission()
      let entity_permissions: PermissionFormData
      setPermissionGroup(permissionGroups)
      if (isEmpty(entityPermissions)) {
        entity_permissions = formatDefaultFormDataPermission(permissionGroups)
      } else {
        entity_permissions =
          mergeCurrentPermissionWithDefaultFormDataPermission(
            permissionGroups,
            entityPermissions
          )
      }
      return {
        status: data?.status ?? '',
        name: data?.name ?? '',
        work_email: data?.work_email ?? '',
        teamId: data?.team?.id ?? '',
        rolesTemplateId: [],
        entity_permissions: entity_permissions,
      }
    },
  })

  const { handleSubmit, control, formState, setValue, resetField } =
    useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((data) => {
      const entity_permissions = data.entity_permissions
      const convertToArray = createNewEntityPermissionInput(entity_permissions)
      mutate({
        name: data.name,
        status: data.status,
        work_email: data.work_email ?? '',
        entity_permissions: formatChecksToBE(convertToArray),
        note: note,
        team_id: data.teamId,
      })
    })()
  }

  const selectedRoleTemplate = (role: Role[]) => {
    if (role.length === 0) resetField('entity_permissions')
    const data = mergePermissions(role)
    Object.keys(data).forEach((key) => {
      setValue(`entity_permissions.${key}.ownedOnly`, data[key].ownedOnly)
      setValue(`entity_permissions.${key}.teamOnly`, data[key].teamOnly)
      setValue(`entity_permissions.${key}.everything`, data[key].everything)
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
