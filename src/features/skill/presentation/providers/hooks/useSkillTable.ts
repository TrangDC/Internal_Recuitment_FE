import useGraphql from 'features/skill/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'

const useSkillTable = (variables = {}) => {
  const { getAllSkill, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllSkill,
    variables: {
      ...variables,
    },
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useSkillTable
