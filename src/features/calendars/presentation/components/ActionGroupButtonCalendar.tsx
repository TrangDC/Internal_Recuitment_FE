import { MoreHoriz } from '@mui/icons-material'
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  styled,
} from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { Span } from 'shared/components/Typography'

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
  iconButtonSx?: SxProps<Theme>
}

export const ActionGroupButtonCalendar = <T extends object>({
  actions,
  rowId,
  rowData,
  iconButtonSx,
}: IActionGroupButtons<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleMoreClose = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }
  if (actions.length === 0) return null
  return (
    <>
      <IconButton
        onClick={handleMoreOpen}
        sx={{ padding: '11px !important', ...iconButtonSx }}
      >
        <MoreHoriz sx={{ color: 'text.disabled' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {actions &&
          actions.map(({ Icon, title = '', disabled, onClick }, i) => (
            <StyleItemMenu
              key={i}
              onClick={(event) => {
                event.stopPropagation()
                onClick?.(rowId, rowData)
                handleMoreClose(event)
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
