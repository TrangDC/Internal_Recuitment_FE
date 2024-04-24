import { MoreHoriz } from '@mui/icons-material'
import { IconButton, ListItemIcon, Menu, MenuItem, styled } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { Span } from './Typography'

export const StyleListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto !important',
  marginRight: '8px'
}))

export const StyleLabel = styled(Span)(({ theme }) => ({
 fontSize: '13px',
 fontWeight: 500,
 lineHeight: '15.85px',
 color: theme.palette.grey[800]
}))

export type TOptionItem<T> = {
  disabled?: boolean
  onClick?: (id: string, row: T) => void
  title?: string
  Icon: ReactNode
  id: string
}

interface IActionGroupButtons<T> {
  actions: TOptionItem<T>[]
  rowId: string
  rowData: T
  Button?: ReactNode
}

export const ActionGroupButtons = <T extends object>({
  actions,
  rowId,
  rowData,
  Button,
}: IActionGroupButtons<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMoreClose = () => setAnchorEl(null)
  if (actions.length === 0) return null
  return (
    <>
      {Button ? (
        <IconButton
          onClick={handleMoreOpen}
          sx={{ padding: '11px !important' }}
        >
          {Button}
        </IconButton>
      ) : (
        <IconButton
          onClick={handleMoreOpen}
          sx={{ padding: '11px !important' }}
        >
          <MoreHoriz sx={{ color: 'text.disabled' }} />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
      >
        {actions &&
          actions.map(({ Icon, title = '', disabled, onClick }, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                onClick?.(rowId, rowData)
                handleMoreClose()
              }}
              disabled={disabled}
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <StyleListItemIcon>{Icon}</StyleListItemIcon>
              <StyleLabel>{title}</StyleLabel>
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}
