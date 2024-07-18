import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'applicant_report_by_status'
  const getApplicantReportByStatus = GraphQLClientService.buildQuery({
    operation: 'ReportApplicationReportTable',
    options: {
      type: 'query',
    },
    node: `
      data {
        processing {
          invite_to_interview
          interviewing
          done
          cancelled
        }
        kiv {
          poor_professionalism
          poor_fit_and_engagement
          over_expectations
          over_qualification
          language_deficiency
          weak_technical_skills
          poor_interpersonal_skills
          poor_problem_solving_skills
          poor_management_skills
          candidate_withdrawal
          others
        }
        offered_lost {
          poor_professionalism
          poor_fit_and_engagement
          over_expectations
          over_qualification
          language_deficiency
          weak_technical_skills
          poor_interpersonal_skills
          poor_problem_solving_skills
          poor_management_skills
          candidate_withdrawal
          others
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
