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

  const reportProcessingApplication = GraphQLClientService.buildQuery({
    operation: 'ReportProcessingApplication',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          from_date
          to_date
          actual_interview
          cancel
        }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })

  const reportFailedApplication = GraphQLClientService.buildQuery({
    operation: 'ReportFailedApplication',
    options: {
      type: 'query',
    },
    node: `
      data {
        failed_cv {
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
        failed_interview {
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
        offer_lost {
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

  const reportHiredApplication = GraphQLClientService.buildQuery({
    operation: 'ReportHiredApplication',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          job_position_name
          intern
          fresher
          junior
          middle
          senior
          manager
          director
        }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })

  return {
    getApplicantReportByStatus,
    reportProcessingApplication,
    reportFailedApplication,
    reportHiredApplication,
    queryKey,
  }
}

export default useGraphql
