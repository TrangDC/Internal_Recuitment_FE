import useGraphql from 'features/skill/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useSkillTable = (props: IUseCustomCommonTable) => {
  const { getAllSkill, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllSkill,
    queryKey,
    ...props,
  })

  return {
    useTableReturn,
  }
}

export default useSkillTable
