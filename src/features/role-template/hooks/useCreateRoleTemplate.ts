import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from '../domain/graphql/graphql'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  CreateRoleTemplateForm,
  CreateRoleTemplateSchema,
} from '../shared/constants/validate'
import { useState } from 'react'
import { NewRoleTemplateInput } from '../domain/interfaces'
import _ from 'lodash'
import useGetAllPermissionGroups from 'shared/hooks/permissions/useGetAllPermissionGroups'
import { PermissionGroup } from 'shared/hooks/permissions/interface/response'
import {
  formatDefaultFormDataPermission,
  formatChecksToBE,
  createNewEntityPermissionInput,
} from 'shared/hooks/permissions/utils/functions'
import { PermissionFormData } from 'shared/hooks/permissions/interface'

interface UseCreateRoleTemplateProps {
  callbackSuccess?: (value: any) => void
}

function useCreateRoleTemplate(props: UseCreateRoleTemplateProps) {
  const { callbackSuccess } = props
  const { createRole, queryKey } = useGraphql()
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup[]>([])
  const { getAllPermission, isGetting } = useGetAllPermissionGroups()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewRoleTemplateInput,
    CreateRoleTemplateForm
  >({
    mutationKey: [queryKey],
    queryString: createRole,
    defaultValues: async () => {
      const entity_permissions = await getAllPermission()
      setPermissionGroup(entity_permissions)
      return {
        description: '',
        name: '',
        entity_permissions: formatDefaultFormDataPermission(entity_permissions),
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
      const entity_permissions: PermissionFormData = data.entity_permissions
      const convertToArray = createNewEntityPermissionInput(entity_permissions)
      mutate({
        name: data.name,
        description: data.description ?? '',
        entity_permissions: formatChecksToBE(convertToArray),
        note: '',
      })
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
