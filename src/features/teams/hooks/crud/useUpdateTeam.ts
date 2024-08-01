import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { transformListItem } from 'shared/utils/utils'
import { useEditResource } from 'shared/hooks/crud-hook'
import HiringTeam, { UpdateHiringTeamArguments } from 'shared/schema/database/hiring_team'
import {
  FormDataSchemaUpdate,
  schemaUpdate,
} from 'features/teams/shared/constants/schema'
import { v4 as uuidv4 } from 'uuid'
import { convertApproves, transformApprove } from 'features/teams/shared/utils'

type UseEditTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateTeam(props: UseEditTeamProps) {
  const { id, onSuccess } = props
  const { updateTeam, getTeamDetail, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    HiringTeam,
    FormDataSchemaUpdate,
    UpdateHiringTeamArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateTeam,
    oneBuildQuery: getTeamDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const members = transformListItem(data?.managers ?? [])
      const approvers = transformApprove(data?.approvers ?? []);

      return {
        name: data?.name ?? '',
        members: members,
        approvers,
        description: data?.description ?? ''
      }
    },
  })

  const { handleSubmit, control, formState, setValue, watch } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { mutate, isPending } = useEditReturn
  const approve_list = watch('approvers');

  function onSubmit(note:string) {
    handleSubmit((value) => {
      const approvers = convertApproves(value.approvers)

      mutate({
       id,
       input: {
        ...value,
        approvers,
       },
       note: note 
      } )
    })()
  }

  function addApprove() {
    const default_approve = {uid: uuidv4(), user_id: '', id: ''};
    setValue('approvers', [...approve_list, default_approve], {shouldValidate: true, shouldDirty: true} )
  }

  function delApprove(uid: string) {
    const approve_del = approve_list.filter((approve) => approve.uid !== uid)
    setValue('approvers', approve_del, {shouldValidate: true, shouldDirty: true})
  }

  function onChangeApprove(uid: string, value: string) {
    const new_approve_list = approve_list.map((approve) => {
      return {
        ...approve,
        user_id: approve.uid === uid ? value : approve.user_id,
      }
    })
    setValue('approvers', new_approve_list, {shouldValidate: true, shouldDirty: true})
  }

  return {
    control,
    isValid,
    isPending,
    state: {
      approve_list
    },
    actions: {
      addApprove,
      delApprove,
      onChangeApprove,
      onSubmit
    },
    formState,
    setValue,
    isGetting,
  }
}

export default useUpdateTeam
