import useGraphql from 'features/skillType/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useSkillTypeTable = (props: IUseCustomCommonTable) => {
  const { getAllSkillTypes, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllSkillTypes,
    queryKey,
    ...props,
  })

  return {
    useTableReturn,
  }
}

export default useSkillTypeTable
