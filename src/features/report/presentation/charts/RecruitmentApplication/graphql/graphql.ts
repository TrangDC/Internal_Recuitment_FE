import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'recruitment_application'
  const getRecruitmentReport = GraphQLClientService.buildQuery({
    operation: 'GetCandidateJobReport',
    options: {
      type: 'query',
    },
    node: `
      data {
        total
        column_data {
          from_date
          to_date
          data {
            status
            amount
          }
        }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })
  return {
    getRecruitmentReport,
    queryKey,
  }
}

export default useGraphql
