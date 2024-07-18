import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_report_2'
  const getCandidateReport = GraphQLClientService.buildQuery({
    operation: 'GetCandidateReport',
    options: {
      type: 'query',
    },
    node: `
      data {
        stats_by_time {
          number_by_type {
            type 
            number
          }
          stats_per_time_period {
            from_date
            to_date
            total
            number_by_type {
              type 
              number
            }
          }
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
