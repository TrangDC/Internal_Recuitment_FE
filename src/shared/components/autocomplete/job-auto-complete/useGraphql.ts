import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'hiringJobs'

  const getAllHiringJobs = buildQuery({
    operation: 'GetAllHiringJobs',
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
      filter: 'HiringJobFilter',
      freeWord: 'HiringJobFreeWord',
      orderBy: 'HiringJobOrderBy!',
    },
  })

  return {
    queryKey,
    getAllHiringJobs,
  }
}

export default useGraphql
