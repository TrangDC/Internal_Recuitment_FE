import {
  SEND_TO_LABEL,
  SEND_TO_VALUE,
} from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import { DATA_KEYWORD_TEMPLATE } from 'shared/interfaces'
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

export const replaceTemplateEmail = (
  template: string,
  data: DATA_KEYWORD_TEMPLATE[]
): { is_valid: boolean; result: string } => {
  let is_valid = true
  const regex = /<del>{{ (.*?) }}<\/del>|{{ (.*?) }}/g

  const result = template.replace(regex, (match, p1, p2) => {
    const key = p1 || p2
    let value = match

    const found = data.find((item) => item.key === key)

    if (found) {
      if (p1) {
        value = `{{ ${key} }}`
      }
    } else {
      is_valid = false
      if (!p1) {
        value = `<del>{{ ${key} }}</del>`
      }
    }

    return value
  })

  return {
    is_valid,
    result,
  }
}

export const replaceLink = (content: string) => {

  return content.replace(/href="[^"]*"/g, 'href="#"');
}

export function cleanDelTags(content: string) {
  const regex = /<del>{{ (.*?) }}(.*?)<\/del>/g

  return content.replace(regex, (match, p1, p2) => {
    return `<del>{{ ${p1} }}</del>${p2}`
  })
}
