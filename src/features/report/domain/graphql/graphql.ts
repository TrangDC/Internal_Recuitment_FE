import GraphQLClientService from 'services/refactor/graphql-service'
const useGraphql = () => {
  const queryKey = 'applicant_report_by_status'
  const getApplicantReportByStatus = GraphQLClientService.buildQuery({
    operation: 'GetCandidateJobReportByStatus',
    options: {
      type: 'query',
    },
    node: `
      data {
        processing_candidate_job_data {
          status
          amount
        }
        kiv_candidate_job_data {
          failed_reason
          amount
        }
        offer_lost_candidate_job_data {
          failed_reason
          amount
        }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })
  return {
    getApplicantReportByStatus,
    queryKey,
  }
}

export default useGraphql
