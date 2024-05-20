import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'hiring'
  const getAllHiringTeam = buildQuery({
    operation: 'SelectionUsers',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          work_email
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
      filter: 'UserFilter',
      orderBy: 'UserOrder', 
      freeWord: 'UserFreeWord',
    },
  })
  // const createJobTitle = buildQuery({
  //   operation: 'CreateJobTitle',
  //   options: {
  //     type: 'mutation',
  //   },
  //   node: `
  //     data {
  //       id
  //     }
  //   `,
  //   params: {
  //     input: 'NewJobTitleInput!',
  //   },
  // })

  return {
    getAllHiringTeam,
    queryKey,
    // createJobTitle,
  }
}

export default useGraphql
