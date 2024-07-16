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

  const { handleSubmit, control, formState, getValues, watch, resetField } = useFormReturn

  //preview data
  const form_values = getValues()
  watch(['content', 'subject', 'signature'])

  const isValid = !formState.isValid
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
    },
  }
}

export default useCreateEmail
