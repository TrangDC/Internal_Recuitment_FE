import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/email/domain/graphql/graphql'
import { NewEmailInput } from 'features/email/domain/interfaces'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { FormDataSchema, schema } from '../shared/constants/schema'
import { getContentStringHTML, RegexEmail } from 'shared/utils/utils'
import {
  OPTIONS_VALUE_SEND_TO,
  SEND_TO_VALUE,
} from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import { cloneDeep, isEmpty } from 'lodash'
import { EVENT_EMAIL_ENUM } from 'shared/components/autocomplete/event-email-autocomplete'
import getKeywordEmail from '../shared/services/getKeywordEmail'
import { replaceTemplateEmail } from '../shared/utils'
import { useEffect, useState } from 'react'
import { DATA_KEYWORD_TEMPLATE } from 'shared/interfaces'

type valid_template = 'subject' | 'content' | 'signature'

interface createEmailProps {
  callbackSuccess?: (value: any) => void
}

function useCreateEmail(props: createEmailProps = {}) {
  const { callbackSuccess } = props

  const { createEmailTemplate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewEmailInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createEmailTemplate,
    defaultValues: {
      content: '',
      event: '',
      send_to: [],
      signature: '',
      subject: '',
      cc: [],
      bcc: [],
      roleIds: [],
      note: ''
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, getValues, watch, resetField, setValue } = useFormReturn
  const [listKeyWord, setListKeyWord] = useState<DATA_KEYWORD_TEMPLATE[]>([]);
  const [validTemplate, setValidTemplate] = useState<{subject: boolean, content: boolean, signature: boolean}>({subject: true, content: true, signature: true})

  //preview data
  const form_values = getValues()
  const content = watch('content')
  const subject = watch('subject')
  const signature = watch('signature')
  const event = watch('event')
  
  const isValid = !formState.isValid || !Object.keys(validTemplate).every((item) => !!validTemplate[item as valid_template]);
  const { isPending, mutate } = useCreateReturn

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
      })
    })()
  }

  function getValidCc(email_list: string[]) {
    return email_list.filter((email) => {
      return RegexEmail(email)
    })
  }

  function resetSendTo() {
    resetField('send_to')
    resetField('roleIds')
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
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    form_values,
    watch,
    actions: {
      getValidCc,
      resetSendTo,
      setValue,
      onChangeEvent,
    },
  }
}

export default useCreateEmail
