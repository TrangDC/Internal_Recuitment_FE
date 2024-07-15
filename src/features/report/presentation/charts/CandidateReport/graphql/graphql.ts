import GraphQLClientService from 'services/refactor/graphql-service'
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
        blacklist
        pie_chart_data {
          reference_type
          amount
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
