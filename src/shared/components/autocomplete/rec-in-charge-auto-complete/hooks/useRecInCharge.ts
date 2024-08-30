import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import GraphQLClientService from 'services/graphql-service'
import useGraphql from '../graphql/useGraphql'
import User from 'shared/schema/database/user'
import { IOption } from '../../autocomplete-base/interface'

export const REC_IN_CHARGE_STATE = {
  has_rec_in_charge: 'has_rec_in_charge',
}

const options_fixed: IOption[] = [
  {
    label: 'Not assigned',
    value: REC_IN_CHARGE_STATE.has_rec_in_charge,
  },
]

const useRecInCharge = () => {
  const { getAllUsers, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => GraphQLClientService.fetchGraphQL(getAllUsers),
  })

  const UserList: User[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return (
        response?.[getAllUsers.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      )
    }

    return []
  }, [data])

  const recInCharge: IOption[] = useMemo(() => {
    return [
      ...options_fixed,
      ...UserList.map((item) => ({ label: item.name, value: item.id })),
    ]
  }, [UserList])

  return {
    ...otherValue,
    recInCharge,
  }
}

export default useRecInCharge
