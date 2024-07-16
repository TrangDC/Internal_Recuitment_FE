import { Box, Portal } from '@mui/material'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  is_portal: boolean
}

const PortalComponent = ({ children, is_portal }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainer(containerRef.current)
  }, [])

  return (
    <Box ref={containerRef}>
      <Portal
        container={() => {
          return is_portal ? document.body : container
        }}
      >
        {children}
      </Portal>
    </Box>
  )
}

export default PortalComponent
