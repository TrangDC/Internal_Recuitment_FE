import { IconButton, Tooltip } from '@mui/material'
import React, { ReactNode } from 'react'
import './style/index.css'

interface ITooltip {
  children: ReactNode
  title: string
}

const TooltipComponent = ({ children, title }: ITooltip) => {
  return (
    <Tooltip title={title}>
      <IconButton sx={{padding: 0}}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

export default TooltipComponent
