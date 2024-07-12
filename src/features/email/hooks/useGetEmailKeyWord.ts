import { useQuery } from '@tanstack/react-query'
import GraphQLClientService from 'services/refactor/graphql-service'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../domain/graphql/graphql'

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

const INIT_VALUE = {
  candidate: [],
  candidateJob: [],
  general: [],
  hiringJob: [],
  interview: [],
  link: [],
  team: [],
}

const useGetEmailKeyWord = () => {
  const { getAllEmailTemplateKeywords, queryKey_keyword } = useGraphql()

  const { data } = useQuery({
    queryKey: [queryKey_keyword],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllEmailTemplateKeywords.query),
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

  const options_keyWord = useMemo(() => {
    return Object.values(slash_command).flat()
  }, [slash_command])

  return {
    slash_command,
    options_keyWord,
  }
}

export default useGetEmailKeyWord