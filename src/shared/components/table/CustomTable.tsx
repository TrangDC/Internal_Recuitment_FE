import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
  styled
} from '@mui/material'
import AppPagination from '../AppPagination'
import { useMemo } from 'react'
import { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import { BodyTableCell, HeadTableCell } from './styles'
import { v4 as uuidv4 } from 'uuid'
import IconSortBy from './components/IconSortBy'
interface ICustomTable<T> {
  columns: ColumnDef<T, any>[]
  useTableReturn: IuseCustomTableReturn
}

const DivHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover .sort_enabled': {
    visibility: 'visible',
  },

  '& span': {
    flex: 1,
  },
}))

const CustomTable = <T extends object>(props: ICustomTable<T>) => {
  const { columns, useTableReturn } = props
  const { handleSorTable } = useTableReturn
  const { sortData, handleChangePage, totalPage, isLoading, variables } =
    useTableReturn
  const { pagination, sortBy } = variables
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
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: [sortBy].map((sort) => ({
        desc: sort.direction === 'DESC',
        id: sort.field,
      })),
    },
    sortDescFirst: true,
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
                <HeadTableCell
                  key={header.id}
                  onClick={(event) => {
                    header.column.getCanSort() && handleSorTable(header.id)
                  }}
                >
                  <DivHeader>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <IconSortBy
                      className={
                        header.column.getCanSort() ? 'sort_enabled' : undefined
                      }
                      type={header.column.getIsSorted()}
                    />
                  </DivHeader>
                </HeadTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {isLoading
            ? [...Array(pagination.perPage)].map((row) => (
                <TableRow key={uuidv4()}>
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
      </Table>
      <AppPagination
        count={totalPage}
        page={pagination.page}
        onChange={(_, page) => onChange(page)}
        defaultPage={1}
        variant="outlined"
      />
    </TableContainer>
  )
}

export default CustomTable
