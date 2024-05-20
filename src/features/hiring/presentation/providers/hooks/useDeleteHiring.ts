import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { DeleteHiringInput } from 'features/hiring/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schemaDelete, FormDataSchemaDelete } from '../../providers/constants/schema'
import _ from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface deleteHiringProps {
defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (value: any) => void
}

function useDeleteHiring(props: deleteHiringProps = { defaultValues: {}}) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaDelete>({
    resolver: yupResolver(schemaDelete),
    defaultValues: {
        ...defaultValues
    }
  })

  const { deleteTeam, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newHiring: DeleteHiringInput) => {

      return fetchGraphQL<BaseRecord>(deleteTeam.query, {
        ...newHiring,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Delete successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaDelete) => {
      const valueClone = _.cloneDeep(value)
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

export default useDeleteHiring
