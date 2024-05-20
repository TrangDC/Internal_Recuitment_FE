import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import {
  UpdateCandidateInput,
} from 'features/candidates/domain/interfaces'
import _ from 'lodash'
import { convertDateToISOString } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateCandidate(
  props: createCandidateProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaUpdate>({
    resolver: yupResolver(schemaUpdate),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { updateCandidate, queryKey } = useGraphql()

  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newCandidate : UpdateCandidateInput) => {
        const { id, note, ...otherInput } = newCandidate;
      return fetchGraphQL<BaseRecord>(updateCandidate.query, {
        input: otherInput,
        id: id,
        note,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      toastSuccess('Update successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaUpdate) => {
      const valueClone = {
        ..._.cloneDeep(value),
        dob: convertDateToISOString(value.dob),
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

export default useUpdateCandidate
