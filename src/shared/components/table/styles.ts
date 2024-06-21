import { TableCell, styled } from '@mui/material'

export const TableCellStyle = styled(TableCell)(({ theme }) => ({
 fontSize: '13px',
 fontWeight: 500,
 lineHeight: '15.85px',
 padding: '13px 16px',
 wordBreak: 'break-word',
 borderBottom: '1px solid #e3e6eb',
 display: 'table-cell',
 '&:first-of-type': {
  paddingLeft: '16px',
 },
 '&#action': {
    minWidth: '100px !important',
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    background: 'rgb(252, 252, 252)',
    zIndex: 2,
    position: 'sticky',
    right: 0,
  }
}))

export const HeadTableCell = styled(TableCellStyle)(({ theme }) => ({
  height: '48px',
  color: theme.palette.primary[800],
  backgroundColor: theme.palette.primary[50],
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
  display: 'table-cell',
  '&.column-sticky': {
    position: 'sticky',
  },
  '&:nth-last-child(1 of .column-sticky)': {
    BorderRight: '1px solid rgba(0, 0, 0, 0.15)',
  },
  
  '&#action': {
    minWidth: '100px !important',
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    background: 'rgb(252, 252, 252)',
    zIndex: 2,
    position: 'sticky',
    right: 0,
  }
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
