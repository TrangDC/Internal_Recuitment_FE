import { MoreHoriz } from '@mui/icons-material'
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { Span } from '../Typography'

export const StyleListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto !important',
  marginRight: '8px',
}))

export const StyleLabel = styled(Span)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '15.85px',
  color: theme.palette.grey[800],
}))

export const StyleItemMenu = styled(MenuItem)(({ theme }) => ({
  minWidth: '192px',
  maxWidth: '100%',
  height: '36px',
}))

export type TOptionItem<T> = {
  disabled?: boolean | ((rowData: T) => boolean)
  onClick?: () => void
  title?: string
  Icon: ReactNode
  id: string
}

interface IMenuItemComponent<T> {
  actions: TOptionItem<T>[]
  Button?: ReactNode
}

export const MenuItemComponent = <T extends object>({
  actions,
  Button,
}: IMenuItemComponent<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMoreClose = () => setAnchorEl(null)
  if (actions.length === 0) return null
  return (
    <>
      {Button ? (
        //@ts-ignore
        <Box onClick={handleMoreOpen}>{Button}</Box>
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
            <StyleItemMenu
              key={i}
              onClick={() => {
                onClick?.()
                handleMoreClose()
              }}
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <StyleListItemIcon>{Icon}</StyleListItemIcon>
              <StyleLabel sx={{ color: '#0B0E1E' }}>{title}</StyleLabel>
            </StyleItemMenu>
          ))}
      </Menu>
    </>
  )
}
