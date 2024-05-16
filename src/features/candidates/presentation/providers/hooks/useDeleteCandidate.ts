import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { DeleteCandidateInput } from 'features/candidates/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import {
  schemaDelete,
  FormDataSchemaDelete,
} from '../../providers/constants/schema'
import _ from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface deleteCandidateProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (value: any) => void
}

function useDeleteCandidate(props: deleteCandidateProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaDelete>({
    resolver: yupResolver(schemaDelete),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { deleteCandidate, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newCandidate: DeleteCandidateInput) => {
      const { id, note } = newCandidate

      return fetchGraphQL<BaseRecord>(deleteCandidate.query, {
        id: id,
        note,
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

export default useDeleteCandidate
