import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { DeleteJobInput } from 'features/jobs/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import {
  schemaDelete,
  FormDataSchemaDelete,
} from '../../providers/constants/schema'
import _ from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface deleteTeamProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (value: any) => void
}

function useDeleteJob(props: deleteTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaDelete>({
    resolver: yupResolver(schemaDelete),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { deleteTeam, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newJob: DeleteJobInput) => {
      const { id, description } = newJob

      return fetchGraphQL<BaseRecord>(deleteTeam.query, {
        // input: updateOther,
        id: id,
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

export default useDeleteJob
