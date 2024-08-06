import {
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from '@mui/material'
import { TOptionItem } from './ActionGroupButtonCalendar'
import { Dispatch, SetStateAction } from 'react'
import { Span } from 'shared/components/Typography'

type MenuContextInterviewProps<T> = {
  anchorEl: HTMLDivElement | null
  setAnchorEl: Dispatch<SetStateAction<HTMLDivElement | null>>
  actions: TOptionItem<T>[]
  rowData: T
  rowId: string
}

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

function MenuContextInterview<T>({
  anchorEl,
  setAnchorEl,
  actions,
  rowData,
  rowId,
}: MenuContextInterviewProps<T>) {
  const handleMoreClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
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
        actions.map(({ Icon, title = '', disabled, onClick, id }) => (
          <StyleItemMenu
            onClick={(event) => {
              event.stopPropagation()
              onClick?.(rowId, rowData)
              handleMoreClose(event)
            }}
            disabled={
              typeof disabled === 'boolean' ? disabled : disabled?.(rowData)
            }
            key={id}
          >
            <StyleListItemIcon>{Icon}</StyleListItemIcon>
            <StyleLabel>
              {typeof title === 'string' ? title : title(rowData)}
            </StyleLabel>
          </StyleItemMenu>
        ))}
    </Menu>
  )
}

export default MenuContextInterview
