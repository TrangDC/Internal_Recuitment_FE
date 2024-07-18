import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_conversation_rate_report'
  const getCandidateConversionRateReport = GraphQLClientService.buildQuery({
    operation: 'ReportCandidateConversionRateChart',
    options: {
      type: 'query',
    },
    node: `
      data {
        applied
        interviewing
        offering
        hired
      }
    `,
  })
  return {
    getCandidateConversionRateReport,
    queryKey,
  }
}

export default useGraphql
