import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_report'
  const getCandidateReport = GraphQLClientService.buildQuery({
    operation: 'ReportCandidateLCC',
    options: {
      type: 'query',
    },
    node: `
      data {
        total
        non_black_list
        recruitment {
          eb
          rec
          hiring_platform
          reference
          headhunt
        }
      }
    `,
  })
  return {
    getCandidateReport,
    queryKey,
  }
}

export default useGraphql
