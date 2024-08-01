import useGraphql from 'features/skillType/domain/graphql/graphql'
import useGetDetail from 'shared/hooks/crud-hook/useGetDetail'
import SkillType from 'shared/schema/database/skill_type'

type UseGetSkillProps = {
  id: string
}

function useGetTypeSkill({ id }: UseGetSkillProps) {
  const { getSkillType, queryKey } = useGraphql()

  const { formData } = useGetDetail<SkillType>({
    id,
    oneBuildQuery: getSkillType,
    queryKey: queryKey,
  })

  return {
    formData,
  }
}

export default useGetTypeSkill
