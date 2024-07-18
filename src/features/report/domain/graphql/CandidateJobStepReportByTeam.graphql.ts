import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_job_step_report_by_team'
  const reportCandidateConversionRateTable = GraphQLClientService.buildQuery({
    operation: 'ReportCandidateConversionRateTable',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          team_name
          applied
          interviewing
          offering
          hired
        }
      }
      pagination {
        page
        perPage
        total
      }
    `,
    params: {
      pagination: 'PaginationInput',
      orderBy: 'ReportOrderBy',
    },
  })
  return {
    reportCandidateConversionRateTable,
    queryKey,
  }
}

export default useGraphql
