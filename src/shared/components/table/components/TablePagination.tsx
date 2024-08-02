import AppPagination from './AppPagination'
import { IPagination } from '../interface'
import PerPageSelected from './PerPageSelected'
import { Box } from '@mui/material'

type TablePaginationProps = {
  totalPage: number
  pagination: IPagination
  onChange: (value: number) => void
  handleChangePerPage: (value: number) => void
  totalRecord: number
}

function TablePagination(props: TablePaginationProps) {
  const { totalPage, pagination, onChange, handleChangePerPage, totalRecord } =
    props
  return (
    <Box position={'relative'}>
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
      <Box position={'absolute'} right={0} bottom={'10px'}>
        <PerPageSelected
          selectedProps={{
            onChange: (e) => handleChangePerPage(e.target.value as number),
            value: pagination.perPage,
          }}
          totalRecord={totalRecord}
        />
      </Box>
    </Box>
  )
}

export default TablePagination
