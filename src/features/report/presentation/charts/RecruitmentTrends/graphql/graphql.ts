import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_report_2'
  const getCandidateReport = GraphQLClientService.buildQuery({
    operation: 'ReportCandidateColumnChart',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          from_date
          to_date
          eb
          rec
          hiring_platform
          reference
          headhunt
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
