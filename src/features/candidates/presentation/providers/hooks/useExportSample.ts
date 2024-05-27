import { useQuery } from '@tanstack/react-query'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const queryKey = 'export-sample'
const exportSampleCandidate = buildQuery({
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

const useExportSample = (lang: string = "en") => {
    const { data, ...otherValue } = useQuery({
        queryKey: [queryKey],
        queryFn: async () =>
            fetchGraphQL<BaseRecord>(exportSampleCandidate.query, {
                lang,
            }),
    })

    const base64Example: string =
        data?.[exportSampleCandidate.operation]?.data ?? ""

    return {
        ...otherValue,
        base64Example,
    }
}

export default useExportSample
