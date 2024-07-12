import useGraphql from 'features/email/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useEmailTable = (props: IUseCustomCommonTable) => {
  const { getAllEmailTemplates, queryKey } = useGraphql()
  const { search, filters } = props

  const useTableReturn = useCustomTable({
    buildQuery: getAllEmailTemplates,
    queryKey,
    filters,
    search,
  })

  return {
    useTableReturn,
  }
}

export default useEmailTable
