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
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material'
import AppPagination from '../AppPagination'
import { CSSProperties, useEffect, useMemo } from 'react'
import { IuseCustomTableReturn } from 'shared/components/table/hooks/useCustomTable'
import { BodyTableCell, HeadTableCell } from './styles'
import { v4 as uuidv4 } from 'uuid'
import IconSortBy from './components/IconSortBy'
import { isEmpty } from 'lodash'
import Scrollbar from '../ScrollBar'
interface ICustomTable<T> {
  columns: ColumnDef<T, any>[]
  useTableReturn: IuseCustomTableReturn
}

declare module '@tanstack/react-table' {
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

  function setStickyColumn<T extends object>(column: Column<T>): CSSProperties {
    const meta = column.columnDef.meta
    const style = meta?.style ?? {}
    const isPinned = meta?.isPinned || false

    return {
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      position: isPinned ? 'sticky' : 'relative',
      zIndex: isPinned ? 2 : 1,
      width: 'auto',
      ...style,
    }
  }

  useEffect(() => {
    if (isEmpty(sortData) && pagination.page > 1 && !isLoading) {
      handleChangePage(pagination.page - 1)
    }
  }, [sortData])

  return (
    <Box
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #E3E6EB',
        width: '100%',
      }}
    >
      <TableContainer component={Paper}>
        <Scrollbar>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta
                    const stickyColumn = setStickyColumn<T>(header.column)

                    return (
                      <HeadTableCell
                        key={header.id}
                        onClick={() => {
                          header.column.getCanSort() &&
                            handleSorTable(header.id)
                        }}
                        {...header.column.columnDef.meta}
                        style={{ minWidth: '200px', width: 'auto', ...stickyColumn }}
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
                        const stickyColumn = setStickyColumn<T>(cell.column)

                        return (
                          <BodyTableCell
                            component="td"
                            scope="row"
                            key={cell.id}
                            style={{...stickyColumn}}
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
    </Box>
  )
}

export default CustomTable
