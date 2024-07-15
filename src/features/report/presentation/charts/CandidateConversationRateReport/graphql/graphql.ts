import GraphQLClientService from 'services/refactor/graphql-service'
const useGraphql = () => {
  const queryKey = 'candidate_conversation_rate_report'
  const getCandidateConversionRateReport = GraphQLClientService.buildQuery({
    operation: 'GetCandidateJobStepReport',
    options: {
      type: 'query',
    },
    node: `
      data {
        candidate_job_status
        amount
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })
  return {
    getCandidateConversionRateReport,
    queryKey,
  }
}

export default useGraphql
