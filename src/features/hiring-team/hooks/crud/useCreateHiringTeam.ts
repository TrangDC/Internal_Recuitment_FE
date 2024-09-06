import { yupResolver } from '@hookform/resolvers/yup'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import useGraphql from 'features/hiring-team/domain/graphql/graphql'
import { FormDataSchema, schema } from 'features/hiring-team/shared/constants/schema'
import { convertApproves } from 'features/hiring-team/shared/utils'
import { useMemo, useState } from 'react'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateHiringTeamArguments } from 'shared/schema/database/hiring_team'
import { v4 as uuidv4 } from 'uuid'
interface createTeamProps {
  callbackSuccess?: (value: any) => void
}

function useCreateHiringTeam(props: createTeamProps = {}) {
  const { callbackSuccess } = props

  const { createTeam, queryKey } = useGraphql()
  const [hiringIds, setHiringIds] = useState<string[]>([])
  const { handleWarning, handleReset } = usePopup()
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

  const show_warning = useMemo(() => {
    return hiringIds.some((item) => !!item)
  }, [hiringIds])

  function onSubmitHiringTeam() {
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


  function onSubmit() {
    if (!show_warning) {
      onSubmitHiringTeam()
      return
    }

    handleWarning({
      title: 'Warning',
      content: `The selected manager is currently in a different hiring team. This change will also move the user to this team. Proceeding? `,
      onSubmit: () => {
        onSubmitHiringTeam()
        handleReset()
      },
    })
  }

  function addApprove() {
    const default_approve = {uid: uuidv4(), user_id: '', id: ''};
    setValue('approvers', [...approve_list, default_approve], {shouldValidate: true})
  }

  function delApprove(uid: string) {
    const approve_del = approve_list.filter((approve) => approve.uid !== uid)
    setValue('approvers', approve_del, {shouldValidate: true})
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
      onChangeApprove,
      setHiringIds
    }
  }
}

export default useCreateHiringTeam
