import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { NewTeamInput } from 'features/teams/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../../providers/constants/schema'
import { transformListItem } from 'shared/utils/utils'
import _, { isEmpty } from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createTeamProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateTeam(props: createTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props;
  
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { createTeam, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newTeam: NewTeamInput) =>
      fetchGraphQL<BaseRecord>(createTeam.query, {
        input: newTeam,
        note: "",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Create successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const valueClone = {
        ..._.cloneDeep(value),
      }

      if(value?.members && !isEmpty(value?.members)) {
        valueClone.members = transformListItem(value?.members);
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

export default useCreateTeam
