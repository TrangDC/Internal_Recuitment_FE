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
          failed_cv
          failed_interview
          offer_lost
          ex_staff
        }
      }
    `,
    params: {
      filter: ' ReportFilter!',
    },
  })

  const getAllTeam = GraphQLClientService.buildQuery({
    operation: 'GetAllHiringTeams',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
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
      filter: 'HiringTeamFilter',
      orderBy: 'HiringTeamOrderBy!',
      freeWord: 'HiringTeamFreeWord',
    },
  })

  return {
    getRecruitmentReport,
    queryKey,
    getAllTeam
  }
}

export default useGraphql
