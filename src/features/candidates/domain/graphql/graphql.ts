import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'candidate'
  const getAllCandidates = buildQuery({
    operation: 'GetAllCandidates',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          email
          phone
          dob
          status
          is_black_list
          created_at
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
      filter: 'CandidateFilter',
      orderBy: 'CandidateOrder', 
      freeWord: 'CandidateFreeWord',
    },
  })
  const createCandidate = buildQuery({
    operation: 'CreateCandidate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateInput!',
    },
  })

  const updateCandidate = buildQuery({
    operation: 'UpdateCandidate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateCandidateInput!',
      id: 'ID!',
    },
  })

  const deleteCandidate = buildQuery({
    operation: 'DeleteCandidate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const blackListCandidate = buildQuery({
    operation: 'SetBlackListCandidate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        
      }
    `,
    params: {
      id: 'ID!',
      is_black_list: 'Boolean!',
    },
  })

  return {
    getAllCandidates,
    queryKey,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    blackListCandidate,
  }
}

export default useGraphql