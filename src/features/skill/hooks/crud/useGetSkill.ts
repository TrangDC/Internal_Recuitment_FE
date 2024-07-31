import useGraphql from 'features/skill/domain/graphql/graphql'
import useGetDetail from 'shared/hooks/crud-hook/useGetDetail'
import Skill from 'shared/schema/database/skill'

type UseGetSkillProps = {
  id: string
}

function useGetSkill({ id }: UseGetSkillProps) {
  const { getSkillDetail, queryKey } = useGraphql()

  const { formData } = useGetDetail<Skill>({
    id,
    oneBuildQuery:getSkillDetail,
    queryKey: queryKey,
  })

  return {
    formData,
  }
}

export default useGetSkill
