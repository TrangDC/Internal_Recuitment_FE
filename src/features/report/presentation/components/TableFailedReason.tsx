import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Scrollbar from 'shared/components/ScrollBar'
import { BodyTableCell, HeadTableCell } from 'shared/components/table/styles'

type ColumnsType = {
  id: string
  name: string
}

type DataType = {
  name: string
  numberOfFailedReason: number
  percentage: string
}

type TableFailedReasonProps = {
  data: DataType[]
  columns: ColumnsType[]
}

function TableFailedReason(props: TableFailedReasonProps) {
  const { data, columns } = props
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <TableContainer>
        <Scrollbar>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <HeadTableCell key={column.id}>{column.name}</HeadTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <BodyTableCell component="td" scope="row">
                    {item.name}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    {item.numberOfFailedReason}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    {item.percentage}
                  </BodyTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Box>
  )
}

export default TableFailedReason
