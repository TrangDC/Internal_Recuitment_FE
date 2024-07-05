import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import useGraphql from '../domain/graphql/graphql'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useRoleTemplateTable = (props: IUseCustomCommonTable) => {
  const { getAllRoles, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllRoles,
    ...props,
    orderBy: {
      direction: 'ASC',
      field: 'name',
    },
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useRoleTemplateTable
