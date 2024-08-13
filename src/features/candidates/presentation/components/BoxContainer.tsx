import { Box, BoxProps } from '@mui/material'

function BoxContainer(props: BoxProps) {
  return (
    <Box
      padding={2}
      border={'1px solid #E3E6EB'}
      sx={{ backgroundColor: '#F0F1F8' }}
      borderRadius={1}
      {...props}
    >
      {props.children}
    </Box>
  )
}

export default BoxContainer
