import { ContentCut } from '@mui/icons-material'
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { ComponentType, useCallback, useState } from 'react'
import { EventProps } from 'react-big-calendar'
import { useContextCalendar } from '../../providers/contexts/calendarProvider/CalendarProvider'
import { CalendarEvent } from './interface'

type ActionMenu = 'DELETE'

const EventComponent: ComponentType<EventProps<CalendarEvent>> = (event) => {
  const { handleDeleteEvent } = useContextCalendar()
  const [anchorEl, setAnchorEl] = useState<null | Element>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleRightClick = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault()
      setAnchorEl(e.currentTarget)
    },
    []
  )

  const handleMenuItemClick = (action: ActionMenu, e: React.MouseEvent) => {
    e.stopPropagation()
    if (action === 'DELETE') {
      handleDeleteEvent(event.event.resource?.id ?? '')
    }
  }

  return (
    <div>
      <div onContextMenu={handleRightClick}>{event.title}</div>
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(e) => handleMenuItemClick('DELETE', e)}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu> */}
    </div>
  )
}

export default EventComponent
