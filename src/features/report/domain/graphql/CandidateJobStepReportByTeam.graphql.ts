import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidate_job_step_report_by_team'
  const reportCandidateConversionRateByHiringTeam = GraphQLClientService.buildQuery({
    operation: 'ReportCandidateConversionRateByHiringTeam',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          hiring_team_name
          applied
          interviewing
          offering
          hired
          job_position_name
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

  const reportCandidateConversionRateByJobPosition = GraphQLClientService.buildQuery({
    operation: 'ReportCandidateConversionRateByJobPosition',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          hiring_team_name
          applied
          interviewing
          offering
          hired
          job_position_name
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
    reportCandidateConversionRateByHiringTeam,
    reportCandidateConversionRateByJobPosition,
    queryKey,
  }
}

export default useGraphql
