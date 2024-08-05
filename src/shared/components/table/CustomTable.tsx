import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
} from '@tanstack/react-table'
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material'
import { CSSProperties, useMemo } from 'react'
import { IuseCustomTableReturn } from 'shared/components/table/hooks/useCustomTable'
import { BodyTableCell, HeadTableCell } from './styles'
import { v4 as uuidv4 } from 'uuid'
import IconSortBy from './components/IconSortBy'
import Scrollbar from '../ScrollBar'
import TablePagination from './components/TablePagination'
interface ICustomTable<T> {
  columns: ColumnDef<T, any>[]
  useTableReturn: IuseCustomTableReturn
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    style?: CSSProperties
    isPinned?: 'left' | 'right' | false
  }
}

const DivHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover .iconSort': {
    visibility: 'visible',
  },

  '& span': {
    flex: 1,
  },
}))

const CustomTable = <T extends object>(props: ICustomTable<T>) => {
  const { columns, useTableReturn } = props
  const { handleSorTable } = useTableReturn

  const {
    sortData,
    handleChangePage,
    totalPage,
    isLoading,
    variables,
    handleChangePerPage,
    totalRecord,
  } = useTableReturn

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
      sorting:
        sortBy.field !== 'created_at'
          ? [sortBy].map((sort) => ({
              desc: sort.direction === 'DESC',
              id: sort.field,
            }))
          : undefined,
    },
    sortDescFirst: true,
  })

  function onChange(page: number) {
    handleChangePage(page)
  }

  function setStyleColumn<T extends object>(column: Column<T>): CSSProperties {
    const meta = column.columnDef.meta
    const style = meta?.style ?? {}

    return {
      width: column.getSize(),
      minWidth: column.getSize(),
      ...style,
    }
  }

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
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const styleColumn = setStyleColumn<T>(header.column)

                    return (
                      <HeadTableCell
                        key={header.id}
                        onClick={() => {
                          header.column.getCanSort() &&
                            handleSorTable(header.id)
                        }}
                        id={header.id}
                        {...header.column.columnDef.meta}
                        style={{ minWidth: '200px', ...styleColumn }}
                      >
                        <DivHeader>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.getCanSort() && (
                            <IconSortBy
                              type={header.column.getIsSorted()}
                              sorting={variables.sortBy}
                            />
                          )}
                        </DivHeader>
                      </HeadTableCell>
                    )
                  })}
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
                      {row.getVisibleCells().map((cell) => {
                        const styleColumn = setStyleColumn<T>(cell.column)
                        return (
                          <BodyTableCell
                            component="td"
                            scope="row"
                            key={cell.column.id}
                            id={`${cell.column.id}`}
                            style={{ ...styleColumn }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </BodyTableCell>
                        )
                      })}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      {sortData.length > 0 && (
        <TablePagination
          totalPage={totalPage}
          pagination={pagination}
          onChange={onChange}
          handleChangePerPage={handleChangePerPage}
          totalRecord={totalRecord}
        />
      )}
    </Box>
  )
}

export default CustomTable
