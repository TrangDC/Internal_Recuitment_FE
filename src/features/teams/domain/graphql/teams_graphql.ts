import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const buildQueryReturn = buildQuery({
    operation: 'GetAllEmployees',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
            id
            fullName
            nickName
            companyAccountId
            code
            gender
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
      filter: 'EmployeeFilter',
      orderBy: 'EmployeeOrder',
      freeWord: 'EmployeeFreeWord',
    },
  })

  return {
    buildQueryReturn,
  }
}

export default useGraphql
