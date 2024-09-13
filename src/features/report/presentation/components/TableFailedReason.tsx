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
import { Span } from 'shared/components/Typography'

type ColumnsType = {
  id: string
  name: string
}

// export type FailedReasonDataTable = {
//   name: string
//   numberOfFailedReason: number
//   percentage: string
// }

export type FailedReasonDataTable = {
  name: string
  total: string
  failed_cv: number
  failed_interview: number
  offer_lost: number
}

export type TotalFailed = {
  total: number;
  failed_interview: string;
  offer_lost: string;
  failed_cv: string;
}

type TableFailedReasonProps = {
  data: FailedReasonDataTable[]
  columns: ColumnsType[]
  total: TotalFailed
}

function TableFailedReason(props: TableFailedReasonProps) {
  const { data, columns, total } = props

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
              <TableRow>
                <BodyTableCell component="td" scope="row">
                  <Span fontSize={'13px'} fontWeight={600} color={'#0B0E1E'}>Total</Span>
                </BodyTableCell>
                <BodyTableCell component="td" scope="row">
                  <Span fontSize={'13px'} fontWeight={600} color={'#0B0E1E'}>{total.total}</Span>
                </BodyTableCell>
                <BodyTableCell component="td" scope="row">
                  <Span fontSize={'13px'} fontWeight={600} color={'#0B0E1E'}> {total.failed_cv}</Span>
                </BodyTableCell>
                <BodyTableCell component="td" scope="row">
                  <Span fontSize={'13px'} fontWeight={600} color={'#0B0E1E'}> {total.failed_interview}</Span>
                </BodyTableCell>
                <BodyTableCell component="td" scope="row">
                  <Span fontSize={'13px'} fontWeight={600} color={'#0B0E1E'}> {total.offer_lost}</Span>
                </BodyTableCell>

              </TableRow>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <BodyTableCell component="td" scope="row">
                    {item.name}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    {item.total}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    {item.failed_cv}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    {item.failed_interview}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    {item.offer_lost}
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
