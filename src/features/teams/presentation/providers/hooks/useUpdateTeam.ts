import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { NewTeamInput } from 'features/teams/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../../providers/constants/schema'
import { transformListItem } from 'shared/utils/utils'
import _ from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createTeamProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useUpdateTeam(props: createTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { updateTeam, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newTeam: NewTeamInput) => {
      const { id, ...updateOther } = newTeam

      return fetchGraphQL<BaseRecord>(updateTeam.query, {
        input: updateOther,
        id: id,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Update successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const valueClone = {
        ..._.cloneDeep(value),
        members: transformListItem(value.members),
      }

      mutate(valueClone)
    })()
  }

  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useUpdateTeam
