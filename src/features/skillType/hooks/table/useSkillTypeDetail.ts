import useGraphql from 'features/skillType/domain/graphql/graphql'
import { useMemo } from 'react'
import useGetDetail from 'shared/hooks/crud-hook/useGetDetail'
import SkillType from 'shared/schema/database/skill_type'

const useSkillTypeDetail = (id: string) => {
  const { getSkillType, queryKey } = useGraphql()

  const { formData } = useGetDetail<SkillType>({
    id,
    oneBuildQuery: getSkillType,
    queryKey: queryKey,
  })

  const skill_type_detail = useMemo(() => {

    const response = {
      ...formData,
    }
    return response
  }, [formData])

  return {
    formData,
    skill_type_detail,
  }
}

export default useSkillTypeDetail
