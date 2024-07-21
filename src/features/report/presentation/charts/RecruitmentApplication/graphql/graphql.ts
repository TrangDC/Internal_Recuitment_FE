import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'recruitment_application'
  const getRecruitmentReport = GraphQLClientService.buildQuery({
    operation: 'ReportApplication',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          from_date
          to_date
          applied
          interviewing
          offering
          hired
          kiv
          offer_lost
          ex_staff
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
