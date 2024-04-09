import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import AppPagination from '../AppPagination'
import { useMemo } from 'react'
import { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import { BodyTableCell, HeadTableCell } from './styles'

interface ICustomTable<T> {
  columns: ColumnDef<T, any>[]
  useTableReturn: IuseCustomTableReturn
}

const CustomTable = <T extends object>(props: ICustomTable<T>) => {
  const { columns, useTableReturn } = props
  const { sortData, pagination, handleChangePage, totalPage, loading } =
    useTableReturn
  const columnData = useMemo(() => columns, [columns])
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: sortData,
    columns: columnData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: pagination.page,
        pageSize: pagination.perPage,
      },
    },
  })

  function onChange(page: number) {
    handleChangePage(page)
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeadTableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </HeadTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {loading
            ? [...Array(pagination.perPage)].map((row) => (
                <TableRow key={row}>
                  {getHeaderGroups()
                    .map((x) => x.headers)
                    .flat()
                    .map((cell) => (
                      <BodyTableCell key={cell.id}>
                        <Skeleton />
                      </BodyTableCell>
                    ))}
                </TableRow>
              ))
            : getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <BodyTableCell component="th" scope="row" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </BodyTableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
        <AppPagination
          count={totalPage}
          page={pagination.page}
          onChange={(_, page) => onChange(page)}
          defaultPage={1}
        />
      </Table>
    </TableContainer>
  )
}

export default CustomTable
