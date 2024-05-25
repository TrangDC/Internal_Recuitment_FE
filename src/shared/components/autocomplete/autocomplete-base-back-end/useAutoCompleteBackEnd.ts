import { useQuery } from '@tanstack/react-query'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

interface IUseAutoComplete {
  queryKey: string[]
  queryString: IBuildQueryReturn
  variables: BaseRecord
}

function useAutoCompleteBackEnd<T>({
  queryKey,
  queryString,
  variables,
}: IUseAutoComplete) {
  const { data } = useQuery({
    queryKey: queryKey,
    gcTime:0,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(queryString.query, variables),
  })
  let options: T[] = []

  if (data && isRight(data)) {
    const response = unwrapEither(data)
    options =
      response?.[queryString.operation]?.edges?.map(
        (item: any) => item?.node
      ) ?? []
  }

  return {
    options,
  }
}

export default useAutoCompleteBackEnd
