import {
  SEND_TO_LABEL,
  SEND_TO_VALUE,
} from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import {
  ROLES_EMAIL,
  SEND_TO_ENUM,
} from 'shared/schema/database/email_template'

export const GroupSendToAndRole = (
  send_to_data: SEND_TO_ENUM[],
  roles_data: ROLES_EMAIL[]
) => {
  const send_to =
    send_to_data?.reduce((current: string[], next) => {
      if (next === SEND_TO_VALUE.role) {
        return current
      }

      let name = SEND_TO_LABEL[next]
      current.push(name)

      return current
    }, []) ?? []
  const roles = roles_data?.map((option) => option.name) ?? []

  return [...send_to, ...roles]
}
