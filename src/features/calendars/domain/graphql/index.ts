import GraphQLClientService from "services/refactor/graphql-service"
const useGraphql = () => {
  const queryKey = 'news'
  const getAllNews = GraphQLClientService.buildQuery({
    operation: 'GetAllNews',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          title
          status
          content
          is_highlight
          description
          thumbnail
          published_date
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
      filter: 'NewsFilter',
      orderBy: 'NewsOrder',
      freeWord: 'NewsFreeWord',
    },
  })
  const createNews = GraphQLClientService.buildQuery({
    operation: 'CreateNews',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewNewsInput!',
    },
  })

  const getNews = GraphQLClientService.buildQuery({
    operation: 'GetNews',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        title
        status
        description
        content
        thumbnail
        is_show_published_date
        is_highlight
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const updateNews = GraphQLClientService.buildQuery({
    operation: 'UpdateNews',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      id: 'ID!',
      input: 'UpdateNewsInput!',
    },
  })

  const deleteNews = GraphQLClientService.buildQuery({
    operation: 'DeleteNews',
    options: {
      type: 'mutation',
    },
    params: {
      id: 'ID!',
    },
  })

  const highlightNews = GraphQLClientService.buildQuery({
    operation: 'HighlightNews',
    options: {
      type: 'mutation',
    },
    params: {
      id: 'ID!',
    },
  })

  const disableHighlightNews = GraphQLClientService.buildQuery({
    operation: 'DisableHighlightNews',
    options: {
      type: 'mutation',
    },
    params: {
      id: 'ID!',
    },
  })

  const reorderNews = GraphQLClientService.buildQuery({
    operation: 'ReorderNews',
    options: {
      type: 'mutation',
    },
    params: {
      input: '[NewsReorder!]!',
    },
  })

  const updateNewsStatus = GraphQLClientService.buildQuery({
    operation: 'UpdateNewsStatus',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      id: 'ID!',
      input: 'UpdateNewsStatusInput!',
    },
  })

  return {
    getAllNews,
    queryKey,
    createNews,
    updateNews,
    deleteNews,
    getNews,
    highlightNews,
    reorderNews,
    updateNewsStatus,
    disableHighlightNews,
  }
}

export default useGraphql
