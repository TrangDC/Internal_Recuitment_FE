import { Box } from '@mui/material'
import { ReactNode } from 'react'
type FilterContainerProps = {
  children: ReactNode
  minWidth?: string
  maxWidth?: string
}
function FilterContainer(props: FilterContainerProps) {
  const { children, maxWidth = '500px', minWidth = '200px' } = props
  return (
    <Box
      sx={{
        minWidth: minWidth,
        maxWidth: maxWidth,
        backgroundColor: 'primary.light',
        padding: '12px 16px',
        boxShadow: '0px 2px 4px 0px #28293D0A , 0px 8px 16px 0px #60617029',
      }}
    >
      {children}
    </Box>
  )
}

export default FilterContainer
