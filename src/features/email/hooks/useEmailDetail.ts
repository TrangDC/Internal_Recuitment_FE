import useGraphql from 'features/email/domain/graphql/graphql'
import { useMemo } from 'react'
import { EVENT_EMAIL } from 'shared/components/autocomplete/event-email-autocomplete'
import useGetDetail from 'shared/hooks/crud-hook/useGetDetail'
import EmailTemplate from 'shared/schema/database/email_template'
import { GroupSendToAndRole } from '../shared/utils'

const useEmailDetail = (id: string) => {
  const { getEmailTemplate, queryKey } = useGraphql()

  const { formData } = useGetDetail<EmailTemplate>({
    id,
    oneBuildQuery: getEmailTemplate,
    queryKey: queryKey,
  })

  const email_detail = useMemo(() => {
    const send_to = GroupSendToAndRole(formData?.send_to, formData?.roles)

    const response = {
      ...formData,
      event: EVENT_EMAIL?.[formData?.event]?.label ?? '',
      send_to: send_to
    }
    return response
  }, [formData])

  return {
    formData,
    email_detail,
  }
}

export default useEmailDetail
