import FlexBox from 'shared/components/flexbox/FlexBox'
import AppPagination from './AppPagination'
import { IPagination } from '../interface'
import PerPageSelected from './PerPageSelected'

type TablePaginationProps = {
  totalPage: number
  pagination: IPagination
  onChange: (value: number) => void
}

function TablePagination(props: TablePaginationProps) {
  const { totalPage, pagination, onChange } = props
  return (
    <AppPagination
      sx={{
        borderTop: '1px solid #e3e6eb',
      }}
      count={totalPage}
      page={pagination.page}
      onChange={(_, page) => onChange(page)}
      defaultPage={1}
      variant="outlined"
    />
  )
}

export default TablePagination
