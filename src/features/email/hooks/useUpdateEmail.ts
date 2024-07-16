import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/email/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { FormDataSchemaUpdate, schemaUpdate } from '../shared/constants/schema'
import { UpdateEmailInput } from '../domain/interfaces'
import { getContentStringHTML, RegexEmail } from 'shared/utils/utils'
import EmailTemplate from 'shared/schema/database/email_template'
import {
  OPTIONS_VALUE_SEND_TO,
  SEND_TO_VALUE,
} from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import { cloneDeep, isEmpty } from 'lodash'

type UseEditTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateEmail(props: UseEditTeamProps) {
  const { id, onSuccess } = props
  const { UpdateEmailTemplate, getEmailTemplate, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    EmailTemplate,
    FormDataSchemaUpdate,
    UpdateEmailInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: UpdateEmailTemplate,
    oneBuildQuery: getEmailTemplate,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const send_to =
        data?.send_to?.filter((option) => option !== SEND_TO_VALUE.role) ?? []
      const roles = data?.roles?.map((option) => option.id) ?? []

      return {
        event: data?.event ?? '',
        send_to: [...send_to, ...roles],
        content: data?.content ?? '',
        signature: data?.signature ?? '',
        subject: data?.subject ?? '',
        cc: data?.cc ?? [],
        bcc: [],
        note: '',
        roleIds: [],
      }
    },
  })

  const { handleSubmit, control, formState, setValue, getValues, watch } =
    useFormReturn

  //data preview
  const form_values = getValues()
  watch(['content', 'subject', 'signature'])

  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      const valueClone = cloneDeep(value)
      const send_to_default = valueClone.send_to

      const role_ids = send_to_default.filter((option) => {
        return !OPTIONS_VALUE_SEND_TO.includes(option)
      })
      const send_to = send_to_default.filter((option) => {
        return OPTIONS_VALUE_SEND_TO.includes(option)
      })

      if (!isEmpty(role_ids)) send_to.push(SEND_TO_VALUE.role)

      mutate({
        ...valueClone,
        roleIds: role_ids,
        send_to: send_to,
        subject: getContentStringHTML(value?.subject)
      } as UpdateEmailInput)
    })()
  }

  function getValidCc(email_list: string[]) {
    return email_list.filter((email) => {
      return RegexEmail(email)
    })
  }

  function resetSendTo() {
    setValue('send_to', [])
    setValue('roleIds', [])
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      getValidCc,
      resetSendTo
    },
    formState,
    setValue,
    isGetting,
    form_values,
    watch
  }
}

export default useUpdateEmail
