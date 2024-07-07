import useGraphql from 'features/skill/domain/graphql/graphql'
import { Skill } from 'features/skill/domain/interfaces'
import useGetDetail from 'shared/hooks/crud-hook/useGetDetail'

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
