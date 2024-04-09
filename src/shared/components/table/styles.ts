import { TableCell, styled } from '@mui/material'

const TableCellStyle = styled(TableCell)`
  font-size: 13px;
  font-weight: 500;
  color: #00508a;
  line-height: 15.85px;
  padding: 13px 16px;
  word-break: break-word;
  border-bottom: 1px solid #e3e6eb;
  &:first-of-type {
    padding-left: 16px;
  }
`
export const HeadTableCell = styled(TableCellStyle)`
  &.column-sticky,
  &.action-column {
    z-index: 5;
  }
  &:nth-last-child(1 of .column-sticky) {
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
  &:nth-child(1 of .headerGroup) {
    border-left: 1px solid #e3e6eb;
  }
`

export const BodyTableCell = styled(TableCellStyle)`
  background-color: #ffffff;
  &.column-sticky {
    position: sticky;
  }
  &:nth-last-child(1 of .column-sticky) {
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
`

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
