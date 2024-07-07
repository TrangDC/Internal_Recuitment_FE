import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const queryKey = MODLUE_QUERY_KEY.EXPORT_TEMPLATE
const exportSampleCandidate = GraphQLClientService.buildQuery({
  operation: 'ExportSampleCandidate',
  options: {
    type: 'query',
  },
  node: `
      data 
    `,
  params: {
    lang: 'I18nLanguage!',
  },
})

const useExportSample = (lang: string = 'en') => {
  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(exportSampleCandidate.query, {
        lang,
      }),
  })

  const base64Example: string = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[exportSampleCandidate.operation]?.data
    }
    return ''
  }, [data])

  return {
    ...otherValue,
    base64Example,
  }
}

export default useExportSample
