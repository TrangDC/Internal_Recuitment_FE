import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'recruitment_application'
  const getRecruitmentReport = GraphQLClientService.buildQuery({
    operation: 'GetRecruitmentReport',
    options: {
      type: 'query',
    },
    node: `
      data {
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
