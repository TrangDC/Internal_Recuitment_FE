import useGraphql from '../graphql'
import { SkillType } from 'features/skillType/domain/interfaces'
import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'

function useGetSkillType() {
  const { getAllSkillTypes, queryKey } = useGraphql()
  const [options, setOptions] = useState<SkillType[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      fetchGraphQL<BaseRecord>(getAllSkillTypes.query, {
        // filter: {
        //   candidate_job_id: id,
        // },
      }),
  })

  const skill_types = useMemo(() => {
    return data?.[getAllSkillTypes.operation]?.edges?.map((item: any) => item?.node) ?? []
  }, [data])

  useEffect(() => {
    if (skill_types && Array.isArray(skill_types)) {
      setOptions(skill_types)
    }
  }, [skill_types])

  const handleSearch = () => {
    if(!searchRef.current) return;
    const search = searchRef.current?.value;

    const skill_filter = cloneDeep(skill_types).reduce((current: SkillType[], next: SkillType) => {
      const filter_by_name = next.skills.filter((skill) => {
        return skill.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      })
      next.skills = filter_by_name;
      return !isEmpty(filter_by_name) ? [...current, next] : current;
    }, [])

    setOptions(skill_filter)
  }

  const handleReset = () => {
    if(searchRef.current) {
      searchRef.current.value = '';
      handleSearch()
    }
  }

  return {
    options,
    searchRef,
    actions: {
      handleSearch,
      handleReset,
    }
  }
}

export default useGetSkillType
