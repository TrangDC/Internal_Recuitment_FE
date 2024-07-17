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
        column_chart_data {
          total
          column_data {
            from_date
            to_date
            data {
              reference_type
              amount
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
