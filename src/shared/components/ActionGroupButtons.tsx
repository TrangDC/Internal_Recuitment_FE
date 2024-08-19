import { MoreHoriz } from '@mui/icons-material'
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  SxProps,
  Theme,
} from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { Span } from './Typography'

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
  onClick?: (id: string, row: T) => void
  title?: string | ((rowData: T) => string)
  Icon: ReactNode
  id: string
}

interface IActionGroupButtons<T> {
  actions: TOptionItem<T>[]
  rowId: string
  rowData: T
  Button?: ReactNode
  iconButtonSx?: SxProps<Theme>
}

export const ActionGroupButtons = <T extends object>({
  actions,
  rowId,
  rowData,
  Button,
  iconButtonSx,
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
          sx={{ padding: '11px', ...iconButtonSx }}
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
                onClick?.(rowId, rowData)
                handleMoreClose()
              }}
              disabled={
                typeof disabled === 'boolean' ? disabled : disabled?.(rowData)
              }
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <StyleListItemIcon>{Icon}</StyleListItemIcon>
              <StyleLabel sx={{ color: '#0B0E1E' }}>
                {typeof title === 'string' ? title : title(rowData)}
              </StyleLabel>
            </StyleItemMenu>
          ))}
      </Menu>
    </>
  )
}
