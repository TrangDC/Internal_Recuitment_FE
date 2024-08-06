import {
  SEND_TO_LABEL,
  SEND_TO_VALUE,
} from 'shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo'
import { DATA_KEYWORD_TEMPLATE } from 'shared/interfaces'
import { SEND_TO_ENUM } from 'shared/schema/database/email_template'
import Role from 'shared/schema/database/role'

export const GroupSendToAndRole = (
  send_to_data: SEND_TO_ENUM[],
  roles_data: Role[]
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
  let is_valid = true;

  const dataMap = new Map(data.map(item => [item.key, item.value]));

  //regex check tag <del>{{*}}
  /**
   * p1: <del>{{*}}</del>
   * p2: {{*}}
   * p3: <del><a href="{{*}}">{{*}}</a></del>
   * p4: <a href="{{*}}">{{*}}</a>
   */
  
  const regex = /<del>{{ (.*?) }}<\/del>|{{ (.*?) }}|<del><a[^>]*href="{{ (.*?) }}"[^>]*>.*?<\/a><\/del>|<a[^>]*href="{{ (.*?) }}"[^>]*>.*?<\/a>/g;

  const result = template.replace(regex, (match, p1, p2, p3, p4) => {
    const key = p1 || p2 || p3 || p4;
    let value = match;

    if (dataMap.has(key)) {
      if (p1 && !p2) {
        value = `{{ ${key} }}`;
      } else if (p3 && !p4) {
        value = match.replace(/<\/?del>/g, '');
      }
    } else {
      is_valid = false;
      if (!p1 && p2) {
        value = `<del>{{ ${key} }}</del>`;
      } else if (!p3 && p4) {
        value = `<del>${match}</del>`;
      }
    }

    return value;
  });

  return {
    is_valid,
    result,
  };
};


export const replaceLink = (content: string) => {
  return content.replace(/href="[^"]*"/g, 'href="#"')
}

export function cleanDelTags(content: string) {
  const regex = /<del>{{ (.*?) }}(.*?)<\/del>/g

  return content.replace(regex, (match, p1, p2) => {
    return `<del>{{ ${p1} }}</del>${p2}`
  })
}
