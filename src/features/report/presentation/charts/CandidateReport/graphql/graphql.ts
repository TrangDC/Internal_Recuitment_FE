import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_report'
  const getCandidateReport = GraphQLClientService.buildQuery({
    operation: 'GetCandidateReport',
    options: {
      type: 'query',
    },
    node: `
      data {
        total
        blacklist_number
        number_by_ref_type {
          type
          number
        }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })
  return {
    getCandidateReport,
    queryKey,
  }
}

export default useGraphql
