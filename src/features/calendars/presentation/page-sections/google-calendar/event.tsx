import { ComponentType, useCallback, useState } from 'react'
import { EventProps } from 'react-big-calendar'
import { CalendarEvent } from './interface'
import { useContextCalendar } from 'features/calendars/shared/contexts/calendarProvider/CalendarProvider'

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
