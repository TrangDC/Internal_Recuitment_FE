import { Box, Portal } from '@mui/material'
import { ReactNode, useRef } from 'react'

interface Props {
  children: ReactNode
  is_portal: boolean
}

const PortalComponent = ({ children, is_portal }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Box ref={containerRef}>
      <Portal
        container={() => {
          return is_portal
            ? document.querySelector('body')
            : containerRef.current
        }}
      >
        {children}
      </Portal>
    </Box>
  )
}

export default PortalComponent
