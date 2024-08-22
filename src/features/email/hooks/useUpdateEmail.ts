import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/email/domain/graphql/graphql'
import { BaseRecord, DATA_KEYWORD_TEMPLATE } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { FormDataSchemaUpdate, schemaUpdate } from '../shared/constants/schema'
import { getContentStringHTML, RegexEmail } from 'shared/utils/utils'
import EmailTemplate, {
  UpdateEmailTemplateArguments,
} from 'shared/schema/database/email_template'
import {
  OPTIONS_VALUE_SEND_TO,
  SEND_TO_VALUE,
} from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import getKeywordEmail from '../shared/services/getKeywordEmail'
import { EVENT_EMAIL_ENUM } from 'shared/components/autocomplete/event-email-autocomplete'
import { replaceTemplateEmail } from '../shared/utils'

type UseEditTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

type valid_template = 'subject' | 'content' | 'signature'

function useUpdateEmail(props: UseEditTeamProps) {
  const { id, onSuccess } = props
  const { UpdateEmailTemplate, getEmailTemplate, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    EmailTemplate,
    FormDataSchemaUpdate,
    UpdateEmailTemplateArguments
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
        subject: `<p>${data?.subject}</p>`,
        cc: data?.cc ?? [],
        bcc: [],
        note: '',
        roleIds: [],
      }
    },
  })

  const { handleSubmit, control, formState, setValue, getValues, watch } =
    useFormReturn
  const [listKeyWord, setListKeyWord] = useState<DATA_KEYWORD_TEMPLATE[]>([])
  const [validTemplate, setValidTemplate] = useState<{
    subject: boolean
    content: boolean
    signature: boolean
  }>({ subject: true, content: true, signature: true })

  //data preview
  const form_values = getValues()
  const content = watch('content')
  const subject = watch('subject')
  const signature = watch('signature')
  const event = watch('event')

  const isValid =
    !formState.isValid ||
    !formState.isDirty ||
    !Object.keys(validTemplate).every(
      (item) => !!validTemplate[item as valid_template]
    )
  const { mutate, isPending } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const valueClone = cloneDeep(value)
      const send_to_default = valueClone.send_to

      const role_ids: string[] = send_to_default.filter((option) => {
        return !OPTIONS_VALUE_SEND_TO.includes(option)
      })
      const send_to = send_to_default.filter((option) => {
        return OPTIONS_VALUE_SEND_TO.includes(option)
      })

      if (!isEmpty(role_ids)) send_to.push(SEND_TO_VALUE.role)
      const payload: UpdateEmailTemplateArguments = {
        id,
        input: {
          roleIds: role_ids,
          send_to: send_to,
          subject: getContentStringHTML(value?.subject),
          bcc: [],
          cc: value?.cc ?? [],
          content: value?.content,
          event: value?.event,
          signature: value?.signature ?? '',
        },
        note,
      }
      mutate(payload)
    })()
  }

  function getValidCc(email_list: string[]) {
    return email_list.filter((email) => {
      return RegexEmail(email)
    })
  }

  function resetSendTo() {
    setValue('send_to', [], { shouldValidate: true })
    setValue('roleIds', [], { shouldValidate: true })
  }

  useEffect(() => {
    handleChangeTemplate(content ?? '', 'content')
  }, [content, listKeyWord])

  useEffect(() => {
    handleChangeTemplate(subject ?? '', 'subject')
  }, [subject, listKeyWord])

  useEffect(() => {
    handleChangeTemplate(signature ?? '', 'signature')
  }, [signature, listKeyWord])

  useEffect(() => {
    onChangeEvent(event as EVENT_EMAIL_ENUM)
  }, [event])

  async function onChangeEvent(event: EVENT_EMAIL_ENUM | '') {
    const response = await getKeywordEmail(event)
    setListKeyWord(response)
  }

  function handleChangeTemplate(
    value: string,
    type: 'signature' | 'content' | 'subject'
  ) {
    const response = replaceTemplateEmail(value, listKeyWord)
    setValidTemplate((prev) => ({
      ...prev,
      [type]: response.is_valid,
    }))
    setValue(type, response.result)
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      getValidCc,
      resetSendTo,
      onChangeEvent,
    },
    formState,
    setValue,
    isGetting,
    form_values,
    watch,
  }
}

export default useUpdateEmail
