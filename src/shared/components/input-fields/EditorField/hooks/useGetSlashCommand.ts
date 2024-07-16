import { useQuery } from '@tanstack/react-query'
import GraphQLClientService from 'services/refactor/graphql-service'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import { EVENT_EMAIL_ENUM } from 'shared/components/autocomplete/event-email-autocomplete'

export type slash_command_record = {
  key: string
  value: string
}

type slash_command = {
  candidate: slash_command_record[]
  candidateJob: slash_command_record[]
  general: slash_command_record[]
  hiringJob: slash_command_record[]
  interview: slash_command_record[]
  link: slash_command_record[]
  team: slash_command_record[]
}

export type options_slash = {
  attribute: slash_command_record[]
  link: slash_command_record[]
}

const INIT_VALUE = {
  candidate: [],
  candidateJob: [],
  general: [],
  hiringJob: [],
  interview: [],
  link: [],
  team: [],
}

export type SLASH_COMMAND_TYPE = Array<keyof typeof INIT_VALUE>;

interface Props {
  type: Array<'attribute' | 'link'>
  attribute_command?: SLASH_COMMAND_TYPE
  filter?: {
    event: EVENT_EMAIL_ENUM
  }
}

type slash_type = 'attribute' | 'link'

const useGetSlashCommand = ({ type, attribute_command = [], filter = {event: 'updating_interview'} }: Props) => {
  const { getAllEmailTemplateKeywords, queryKey } = useGraphql()

  const { data } = useQuery({
    queryKey: [queryKey, filter],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllEmailTemplateKeywords.query, {filter: filter}),
  })

  const slash_command: slash_command = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return (
        response?.[getAllEmailTemplateKeywords.operation]?.data ?? INIT_VALUE
      )
    }

    return INIT_VALUE
  }, [data])

  const options_slash: options_slash = useMemo(() => {
    const { link, ...attribute } = slash_command
    const attribute_slash = Object.values(attribute).flat()
   
    const result: options_slash = {
      link: link,
      attribute: attribute_slash,
    }

    for (const property in result) {
      if (!type.includes(property as slash_type)) {
        result[property as slash_type] = []
      }
    }

    return result
  }, [slash_command, attribute_command])

  return {
    slash_command,
    options_slash,
  }
}

export default useGetSlashCommand
