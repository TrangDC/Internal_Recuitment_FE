import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB_POSITION

  const getAllJobPositions = GraphQLClientService.buildQuery({
    operation: 'GetAllJobPositions',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          description
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
      filter: 'JobPositionFilter',
      orderBy: 'JobPositionOrder',
      freeWord: 'JobPositionFreeWord',
    },
  })

  const createJobPosition = GraphQLClientService.buildQuery({
    operation: 'CreateJobPosition',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewJobPositionInput!',
      note: 'String!',
    },
  })

  const updateJobPosition  = GraphQLClientService.buildQuery({
    operation: 'UpdateJobPosition',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateJobPositionInput!',
      id: 'ID!',
      note: 'String!',
    },
  })

  const deleteJobPosition = GraphQLClientService.buildQuery({
    operation: 'DeleteJobPosition',
    options: {
      type: 'mutation',
    },
    node: '',
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getJobPosition = GraphQLClientService.buildQuery({
    operation: 'GetJobPosition',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        description
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    getAllJobPositions,
    queryKey,
    createJobPosition,
    updateJobPosition,
    deleteJobPosition,
    getJobPosition,
  }
}

export default useGraphql
