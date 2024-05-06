import { TableCell, styled } from '@mui/material'

export const TableCellStyle = styled(TableCell)(({ theme }) => ({
 fontSize: '13px',
 fontWeight: 500,
 lineHeight: '15.85px',
 padding: '13px 16px',
 wordBreak: 'break-word',
 borderBottom: '1px solid #e3e6eb',
 '&:first-of-type': {
  paddingLeft: '16px',
 }
}))

export const HeadTableCell = styled(TableCellStyle)(({ theme }) => ({
  height: '48px',
  color: theme.palette.primary[800],
  backgroundColor: theme.palette.primary.light,
  '&.column-sticky, &.action-column': {
    zIndex: 5,
  },
  '&:nth-last-child(1 of .column-sticky)': {
    BorderRight: '1px solid rgba(0, 0, 0, 0.15)',
  },
  '&:nth-child(1 of .headerGroup)': {
    BorderLeft: '1px solid #e3e6eb',
  },
}))

export const BodyTableCell = styled(TableCellStyle)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  '&.column-sticky': {
    position: 'sticky',
  },
  '&:nth-last-child(1 of .column-sticky)': {
    BorderRight: '1px solid rgba(0, 0, 0, 0.15)',
  },
}))


export const ActionBodyTableCell = styled(TableCell)`
  background-color: #fcfcfc;
  position: sticky;
  right: 0px;
  max-width: 58px;
  min-width: 58px;
  width: 58px;
  padding: 0px;
  z-index: 2;
  display: table-cell;
  text-align: center;
  border-bottom: 1px solid #e3e6eb;
`
