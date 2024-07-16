import { useFilterTable } from 'shared/components/table'
import { EmailFilter } from '../shared/constants/schema-filter'

function useFilterEmail() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<EmailFilter>({
    search: {
      searchKey: ['subject'],
    },
    filter: {
      defaultFilter: {
        event: '',
      },
      formatDataWithValue: (data) => {
        return {
          event: data?.event?.value
        }
      },
    },
    page: 'email-template',
    shouldCacheData: true,
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterEmail
