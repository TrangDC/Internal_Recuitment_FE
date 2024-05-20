import { Calendar, dayjsLocalizer, SlotInfo } from 'react-big-calendar'
import dayjs from 'dayjs'
import './style.css'
import { Card } from '@mui/material'
import ToolBar from './toolBar/ToolBar'
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop'
import { CustomEvent } from '../../screens/index'
import { SyntheticEvent } from 'react'
import EventComponent from './event'
const djLocalizer = dayjsLocalizer(dayjs)

const DragAndDropCalendar = withDragAndDrop(Calendar)

interface ICalendars {
  onSelectSlot: (slotInfo: SlotInfo) => void
  myEvents: CustomEvent[]
  onDropEvent: (args: EventInteractionArgs<CustomEvent>) => void
  onSelectEvent: (
    event: CustomEvent,
    e: SyntheticEvent<HTMLElement, Event>
  ) => void
}

function eventStyleGetter(
  event: CustomEvent,
  _: Date,
  __: Date,
  isSelected: boolean
) {
  const style: React.CSSProperties = {
    backgroundColor: event.resource?.styles?.backgroundColor,
    borderRadius: '4px',
    opacity: 0.8,
    color: event.resource?.styles?.color,
    border: '0px',
    display: 'block',
    fontSize: '12px',
    fontWeight: '500',
    padding: '6px 10px 6px 10px',
  }
  return {
    style: style,
  }
}

function Calendars(props: ICalendars) {
  const { onSelectSlot, myEvents, onDropEvent, onSelectEvent } = props
  const today = new Date()
  return (
    <Card
      sx={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
      }}
    >
      <DragAndDropCalendar
        localizer={djLocalizer}
        defaultView="month"
        events={myEvents}
        components={{
          toolbar: ToolBar,
          event: EventComponent,
        }}
        views={['month', 'day', 'week']}
        style={{
          height: 650,
          backgroundColor: '#FCFCFC',
        }}
        selectable
        onSelectSlot={onSelectSlot}
        eventPropGetter={eventStyleGetter}
        defaultDate={today}
        onEventDrop={onDropEvent}
        popup
        onSelectEvent={onSelectEvent}
      />
    </Card>
  )
}

export default Calendars
