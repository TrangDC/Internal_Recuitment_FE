import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { FormDataSchema, schema } from 'features/teams/shared/constants/schema'
import { convertApproves } from 'features/teams/shared/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateHiringTeamArguments } from 'shared/schema/database/hiring_team'
import { v4 as uuidv4 } from 'uuid'
interface createTeamProps {
  callbackSuccess?: (value: any) => void
}

function useCreateTeam(props: createTeamProps = {}) {
  const { callbackSuccess } = props

  const { createTeam, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateHiringTeamArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createTeam,
    defaultValues: {
      name: '',
      members: [],
      approvers: [{uid: uuidv4(), user_id: '', id: ''}],
      description: '',
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, watch, setValue } = useFormReturn
  const approve_list = watch('approvers');

  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const approvers = convertApproves(value.approvers)

      mutate({
        input: {
          ...value,
          approvers,
        },
        note: '',
      })
    })()
  }

  function addApprove() {
    const default_approve = {uid: uuidv4(), user_id: '', id: ''};
    setValue('approvers', [...approve_list, default_approve], {shouldValidate: true})
  }

  function delApprove(uid: string) {
    const approve_del = approve_list.filter((approve) => approve.uid !== uid)
    setValue('approvers', approve_del)
  }

  function onChangeApprove(uid: string, value: string) {
    const new_approve_list = approve_list.map((approve) => {
      return {
        ...approve,
        user_id: approve.uid === uid ? value : approve.user_id,
      }
    })
    setValue('approvers', new_approve_list, {shouldValidate: true})
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    state: {
      approve_list
    },
    actions: {
      addApprove,
      delApprove,
      onChangeApprove
    }
  }
}

export default useCreateTeam
