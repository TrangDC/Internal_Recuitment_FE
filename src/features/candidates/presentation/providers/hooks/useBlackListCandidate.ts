import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { BlackListCandidateInput } from 'features/candidates/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import {
  schemaBlackList,
  FormDataSchemaBlackList
} from '../../providers/constants/schema'
import _ from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface deleteCandidateProps {
  defaultValues?: Partial<FormDataSchemaBlackList>
  callbackSuccess?: (value: any) => void
}

function useBlackListCandidate(props: deleteCandidateProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaBlackList>({
    resolver: yupResolver(schemaBlackList),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { blackListCandidate, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newCandidate: BlackListCandidateInput) => {
      const { id,  note, is_black_list} = newCandidate

      return fetchGraphQL<BaseRecord>(blackListCandidate.query, {
        id,
        is_black_list,
        note,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Add to BlackList successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaBlackList) => {
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

export default useBlackListCandidate
