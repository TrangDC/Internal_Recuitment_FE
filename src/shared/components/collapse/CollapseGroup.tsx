import {
  Box,
  Collapse,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material'
import { Text13md } from '../Typography'
import ChevronUp from '../icons/ChevronUpIcon'
import ChevronDown from '../icons/ChevronDownIcon'
import { ReactNode } from 'react'

type CollapseGroupProps = {
  title: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
}

function CollapseContainer({
  title,
  open,
  setOpen,
  children,
}: CollapseGroupProps) {
  return (
    <Box
      sx={{
        border: '1px solid #E3E6EB',
        borderRadius: '4px',
      }}
      marginBottom={2}
    >
      <Box
        padding={'10px 16px 10px 8px'}
        sx={{ backgroundColor: '#F1F9FF', cursor: 'pointer' }}
        display={'flex'}
        alignItems={'center'}
        gap={1}
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronUp /> : <ChevronDown />}
        {title}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {children}
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  )
}

type CollapseHeaderProps = {
  children: ReactNode
  sx?: SxProps
}

function CollapseHeader({ children, sx }: CollapseHeaderProps) {
  return (
    <TableHead>
      <TableRow sx={sx}>{children}</TableRow>
    </TableHead>
  )
}

function CollapseBody({ children }: CollapseHeaderProps) {
  return <TableBody>{children}</TableBody>
}

type CollapseRowProps = {
  children: ReactNode
  sx?: SxProps
}

function CollapseRow({ children, sx }: CollapseRowProps) {
  return <TableRow sx={sx}>{children}</TableRow>
}

export const CollapseHeaderColumn = styled(TableCell)(({ theme }) => ({
  '&:first-child': {
    paddingLeft: 40,
  },
  color: theme.palette.primary[800],
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '15.85PX',
  borderTop: '1px solid #E3E6EB',
}))

export const CollapseBodyColumn = styled(TableCell)(({ theme }) => ({
  '&:first-child': {
    paddingLeft: 40,
  },
  color: theme.palette.grey[900],
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '15.85PX',
}))

const CollapseGroup = {
  CollapseHeader,
  CollapseContainer,
  CollapseBody,
  CollapseHeaderColumn,
  CollapseBodyColumn,
  CollapseRow,
}

export default CollapseGroup
