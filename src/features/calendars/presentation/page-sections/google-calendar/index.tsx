import { Calendar, dayjsLocalizer, SlotInfo } from 'react-big-calendar'
import dayjs from 'dayjs'
import './style.css'
import { Card } from '@mui/material'
import ToolBar from './toolBar/ToolBar'
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop'
import { SyntheticEvent } from 'react'
import EventComponent from './event'
import { CalendarEvent, RangeDate } from './interface'
import { getColorEvent } from './functions'
const djLocalizer = dayjsLocalizer(dayjs)

const DragAndDropCalendar = withDragAndDrop(Calendar)

interface ICalendars {
  onSelectSlot: (slotInfo: SlotInfo) => void
  myEvents: CalendarEvent[]
  onDropEvent: (args: EventInteractionArgs<CalendarEvent>) => void
  onRangeChange: (date: Date[] | RangeDate) => void
  onSelectEvent: (
    event: CalendarEvent,
    e: SyntheticEvent<HTMLElement, Event>
  ) => void
}

function eventStyleGetter(
  event: CalendarEvent,
  _: Date,
  __: Date,
  isSelected: boolean
) {
  const style: React.CSSProperties = {
    backgroundColor: getColorEvent(event.resource?.styles?.colorId ?? 1)
      ?.backgroundColor,
    borderRadius: '4px',
    opacity: 0.8,
    color: getColorEvent(event.resource?.styles?.colorId ?? 1)?.color,
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
  const { onSelectSlot, myEvents, onDropEvent, onSelectEvent, onRangeChange } =
    props
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
        onRangeChange={onRangeChange}
      />
    </Card>
  )
}

export default Calendars
