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
import { useState } from 'react'
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
  watch(['content', 'subject', 'signature'])

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

  async function onChangeEvent(event: EVENT_EMAIL_ENUM | '') {
    const response = await getKeywordEmail(event);
    setListKeyWord(response)
    
    changeEmailByEvent('signature', response)
    changeEmailByEvent('content', response)
    changeEmailByEvent('subject', response)
  }

  function changeEmailByEvent (name: string, response: DATA_KEYWORD_TEMPLATE[]) {
    //@ts-ignore
    const value = getValues(name)
    const result = replaceTemplateEmail(value ?? '', response)
 
    //@ts-ignore
    setValue(name, result.result)
    setValidTemplate((prev) => ({
      ...prev,
      [name]: result.is_valid
    }))
  }

  function handleChangeEmail (value: string, type: string) {
    if(isEmpty(listKeyWord)) return value;

    const result = replaceTemplateEmail(value, listKeyWord)
    console.log("🚀 ~ onChange:", result)
    setValidTemplate((prev) => ({
      ...prev,
      [type]: result.is_valid
    }))
    return result.result;
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
      handleChangeEmail
    },
  }
}

export default useCreateEmail
