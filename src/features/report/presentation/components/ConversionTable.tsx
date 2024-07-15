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
import { Tiny } from 'shared/components/Typography'

type ColumnsType = {
  id: string
  name: string
}

type PercentageStatus = {
  value: number
  percentage: string
}

export type ConversionDataType = {
  team: string
  indicator: string
  applied: PercentageStatus
  interviewing: PercentageStatus
  offering: PercentageStatus
  hired: PercentageStatus
}

type TableFailedReasonProps = {
  data: ConversionDataType[]
  columns: ColumnsType[]
}

function ConversionTable(props: TableFailedReasonProps) {
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
                <TableRow key={item.team}>
                  <BodyTableCell component="td" scope="row">
                    {item.team}
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    <Tiny>Candidate counts</Tiny>
                    <Tiny>Conversion rate</Tiny>
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    <Tiny>{item.applied.value}</Tiny>
                    <Tiny>{item.applied.percentage}</Tiny>
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    <Tiny>{item.interviewing.value}</Tiny>
                    <Tiny>{item.interviewing.percentage}</Tiny>
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    <Tiny>{item.offering.value}</Tiny>
                    <Tiny>{item.offering.percentage}</Tiny>
                  </BodyTableCell>
                  <BodyTableCell component="td" scope="row">
                    <Tiny>{item.hired.value}</Tiny>
                    <Tiny>{item.hired.percentage}</Tiny>
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

export default ConversionTable
