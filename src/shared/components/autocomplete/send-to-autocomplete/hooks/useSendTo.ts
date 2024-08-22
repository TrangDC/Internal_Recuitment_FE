import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import { IOption } from '../../autocomplete-base/interface'
import Role from 'shared/schema/database/role'
import GraphQLClientService from 'services/graphql-service'

export const SEND_TO_VALUE = {
  interviewer: 'interviewer',
  job_request: 'job_request',
  team_manager: 'hiring_team_manager',
  team_member: 'hiring_team_member',
  role: 'role',
  candidate: 'candidate',
}

export const SEND_TO_LABEL = {
  interviewer: 'Interviewer',
  job_request: 'Requester',
  team_manager: 'Hiring team manager',
  team_member: 'Hiring team member',
  role: 'Role',
  candidate: 'Candidate',
}

const options_fixed: IOption[] = [
  {
    label: 'Interviewer',
    value: SEND_TO_VALUE.interviewer,
  },
  {
    label: 'Requester',
    value: SEND_TO_VALUE.job_request,
  },
  {
    label: 'Hiring team manager',
    value: SEND_TO_VALUE.team_manager,
  },
  {
    label: 'Hiring team member',
    value: SEND_TO_VALUE.team_member,
  },
  { label: 'Candidate', value: SEND_TO_VALUE.candidate },
]

export const OPTIONS_VALUE_SEND_TO = options_fixed.map((option) => option.value)

const useSendTo = () => {
  const { getAllRole, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => GraphQLClientService.fetchGraphQL(getAllRole),
  })

  const roles_data: Role[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return (
        response?.[getAllRole.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      )
    }

    return []
  }, [data])

  const options = useMemo(() => {
    const roles = roles_data.map((item) => ({
      label: item.name,
      value: item.id,
    }))
    return [...options_fixed, ...roles]
  }, [roles_data])

  const options_role = useMemo(() => {
    return roles_data.map((item) => ({ label: item.name, value: item.id }))
  }, [roles_data])

  return {
    ...otherValue,
    roles_data,
    options,
    options_fixed,
    options_role,
  }
}

export default useSendTo
