import useGraphql from '../graphql'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { SkillTypeTree } from '../interface'

function useGetSkillType() {
  const { getAllSkillTypes, queryKey } = useGraphql()
  const [options, setOptions] = useState<SkillTypeTree[]>([])
  const searchRef = useRef<HTMLInputElement | null>(null)

  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllSkillTypes, {
        // filter: {
        //   candidate_job_id: id,
        // },
      }),
  })

  const skill_types = useMemo(() => {
    if (data && isRight(data)) {
      const data_skill: SkillTypeTree[] =
        unwrapEither(data)?.[getAllSkillTypes.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []

      return data_skill.filter((skill_type) => {
        return !isEmpty(skill_type.skills)
      })
    }
    return []
  }, [data])

  useEffect(() => {
    if (skill_types && Array.isArray(skill_types)) {
      setOptions(skill_types)
    }
  }, [skill_types])

  const handleSearch = () => {
    if (!searchRef.current) return
    const search = searchRef.current?.value

    const skill_filter = cloneDeep(skill_types).reduce(
      (current: SkillTypeTree[], next: SkillTypeTree) => {
        const filter_by_name = next.skills.filter((skill) => {
          return skill.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        })
        next.skills = filter_by_name
        return !isEmpty(filter_by_name) ? [...current, next] : current
      },
      []
    )

    setOptions(skill_filter)
  }

  const handleReset = () => {
    if (searchRef.current) {
      searchRef.current.value = ''
      handleSearch()
    }
  }

  return {
    options,
    searchRef,
    actions: {
      handleSearch,
      handleReset,
    },
  }
}

export default useGetSkillType
