import { Calendar, dayjsLocalizer, SlotInfo, View } from 'react-big-calendar'
import dayjs from 'dayjs'
import './style.css'
import { Card } from '@mui/material'
import ToolBar from './toolBar/ToolBar'
import withDragAndDrop, {
  DragFromOutsideItemArgs,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop'
import React, { SyntheticEvent, useState } from 'react'
import { CalendarEvent, RangeDate } from './interface'
import BackdropLoading from './BackdropLoading'
import { getColorEvent } from './functions'
import CustomHeaders from './Header'

const djLocalizer = dayjsLocalizer(dayjs)

const DragAndDropCalendar = withDragAndDrop(Calendar)

interface ICalendars {
  onSelectSlot: (slotInfo: SlotInfo) => void
  myEvents: CalendarEvent[]
  isLoading: boolean
  onDropEvent: (args: EventInteractionArgs<CalendarEvent>) => void
  onRangeChange: (date: Date[] | RangeDate, view?: View | undefined) => void
  handleDragStart: (event: CalendarEvent) => void
  onDropFromOutside: (args: DragFromOutsideItemArgs) => void
  onSelectEvent: (
    event: CalendarEvent,
    e: SyntheticEvent<HTMLElement, Event>
  ) => void
}

function Calendars(props: ICalendars) {
  const {
    onSelectSlot,
    myEvents,
    onDropEvent,
    onSelectEvent,
    onRangeChange,
    handleDragStart,
    onDropFromOutside,
    isLoading,
  } = props
  const today = new Date()
  const [currentView, setCurrentView] = useState<View>('week')
  const handleViewChange = (view: View) => {
    setCurrentView(view)
  }

  function eventStyleGetter(
    event: CalendarEvent,
    start: Date,
    _: Date,
    isSeleted: boolean
  ) {
    const makeStyle = getColorEvent(start)
    const style: React.CSSProperties = {
      backgroundColor: makeStyle.backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: makeStyle.color,
      display: 'block',
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '14.63px',
      padding: '6px 10px 6px 10px',
      transition: 'background 20ms ease-in 0s',
      boxShadow:
        'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
      borderColor: currentView === 'month' ? 'unset' : '#B6DEFC',
    }
    return {
      style: style,
      className: 'custom-event',
      title: `${event.title} (custom title)`,
    }
  }

  const slotPropGetter = (date: Date) => {
    const style: React.CSSProperties = {
      color: '#2A2E37',
      fontSize: '15px',
      fontWeight: '500',
      lineHeight: '18.29px',
    }
    // Default: No additional styles
    return {
      style,
      className: 'custom-event',
    }
  }

  return (
    <Card
      sx={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
        position: 'relative',
      }}
    >
      <DragAndDropCalendar
        localizer={djLocalizer}
        defaultView="month"
        events={myEvents}
        view={currentView}
        components={{
          toolbar: ToolBar,
          week: {
            header: CustomHeaders,
          },
          day: {
            header: CustomHeaders,
          },
        }}
        views={['month', 'day', 'week']}
        style={{
          height: 750,
          backgroundColor: '#FCFCFC',
        }}
        defaultDate={today}
        popup
        timeslots={1}
        resizable={false}
        onSelectSlot={onSelectSlot}
        onView={handleViewChange}
        onEventDrop={onDropEvent}
        onSelectEvent={onSelectEvent}
        onDropFromOutside={onDropFromOutside}
        onRangeChange={onRangeChange}
        handleDragStart={handleDragStart}
        eventPropGetter={eventStyleGetter}
        slotPropGetter={slotPropGetter}
        formats={{ timeGutterFormat: 'HH:mm' }}
        scrollToTime={today}
        showMultiDayTimes
      />
      <BackdropLoading isLoading={isLoading} />
    </Card>
  )
}

export default Calendars
