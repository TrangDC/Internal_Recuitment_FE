import GraphQLClientService from 'services/refactor/graphql-service'
const useGraphql = () => {
  const queryKey = 'candidate_job_step_report_by_team'
  const getCandidateJobStepReportByTeam = GraphQLClientService.buildQuery({
    operation: 'GetCandidateJobStepReportByTeam',
    options: {
      type: 'query',
    },
    node: `
      data {
       team {
          id
          name
       }
       candidate_job_step_by_status {
          candidate_job_status
          amount
       }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })
  return {
    getCandidateJobStepReportByTeam,
    queryKey,
  }
}

export default useGraphql
