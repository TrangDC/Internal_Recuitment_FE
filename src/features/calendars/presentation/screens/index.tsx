import Calendars from '../page-sections/google-calendar'
import { SyntheticEvent, useCallback, useState } from 'react'
import { Event as EventCalendar, SlotInfo } from 'react-big-calendar'
import CreateInterviewModal from '../page-sections/createInterviewModal'
import { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { EventColor } from '../page-sections/google-calendar/interface'
import DetailIntefviewModal from '../page-sections/detailInterviewModal'
import CalendarProvider from '../providers/contexts/calendarProvider/CalendarProvider'

interface CustomResource {
  id: string
  interviewer?: string
  styles?: EventColor
}

export interface CustomEvent extends EventCalendar {
  allDay?: boolean
  resource?: CustomResource
  title?: React.ReactNode | undefined
  start?: Date | undefined
  end?: Date | undefined
}

const event: CustomEvent[] = [
  {
    title: 'Long Event',
    start: new Date(2024, 3, 7),
    end: new Date(2024, 3, 10),
    resource: {
      id: '1',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },

  {
    title: 'DTS STARTS',
    start: new Date(2024, 2, 13, 0, 0, 0),
    end: new Date(2024, 2, 20, 0, 0, 0),
    resource: {
      id: '2',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },

  {
    title: 'DTS ENDS',
    start: new Date(2024, 10, 6, 0, 0, 0),
    end: new Date(2024, 10, 13, 0, 0, 0),
    resource: {
      id: '3',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },

  {
    title: 'Some Event',
    start: new Date(2024, 3, 9, 0, 0, 0),
    end: new Date(2024, 3, 9, 0, 0, 0),
    allDay: true,
    resource: {
      id: '4',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },

  {
    title: 'Some Other Event',
    start: new Date(2024, 3, 9, 8, 0, 0),
    end: new Date(2024, 3, 10, 11, 30, 0),
    resource: {
      id: '5',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },
  {
    title: 'Conference',
    start: new Date(2024, 3, 11),
    end: new Date(2024, 3, 13),
    resource: {
      id: '6',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },
  {
    title: 'Meeting',
    start: new Date(2024, 3, 12, 10, 30, 0, 0),
    end: new Date(2024, 3, 12, 12, 30, 0, 0),
    resource: {
      id: '7',
      styles: {
        id: 1,
        backgroundColor: '#ABF9E0',
        color: '#167E8D',
      },
    },
  },
]

function CalendarsScreen() {
  const [openCreateInterView, setOpenCreateInterView] = useState(false)
  const [openDetailInterView, setOpenDetailInterView] = useState(false)
  const [myEvents, setEvents] = useState<CustomEvent[]>(event)
  const handleSelectSlot = useCallback(
    ({ start, end }: SlotInfo) => {
      setOpenCreateInterView(true)
      // const eventColor = randomColor()
      // if (title) {
      //   setEvents((prev) => [
      //     ...prev,
      //     { start, end, title, resource: { id: uuidv4(), styles: eventColor } },
      //   ])
      // }
    },
    [setEvents]
  )

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs<CustomEvent>) => {
      const { allDay } = event

      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false
      }

      setEvents((prev) => {
        const existing =
          prev.find((ev) => ev.resource?.id === event.resource?.id) ?? null
        const filtered = prev.filter(
          (ev) => ev.resource?.id !== event.resource?.id
        )

        const newEvent: CustomEvent = {
          ...existing,
          start: new Date(start),
          end: new Date(end),
          allDay: event.allDay,
          resource: existing ? existing.resource : event.resource,
          title: existing ? existing.title : event.title,
        }

        return [...filtered, newEvent]
      })
    },
    [setEvents]
  )

  function onSelectEvent(
    event: CustomEvent,
    e: SyntheticEvent<HTMLElement, Event>
  ) {
    e.stopPropagation()
    setOpenDetailInterView(true)
  }

  function handleDeleteEvent(id: string) {
    const removeEvent = myEvents.filter((o) => o.resource?.id !== id)
    setEvents(removeEvent)
  }
  return (
    <CalendarProvider
      setOpenCreateInterView={setOpenCreateInterView}
      handleDeleteEvent={handleDeleteEvent}
    >
      <Calendars
        onSelectSlot={handleSelectSlot}
        myEvents={myEvents}
        onDropEvent={moveEvent}
        onSelectEvent={onSelectEvent}
      />
      {openCreateInterView && (
        <CreateInterviewModal
          open={openCreateInterView}
          setOpen={setOpenCreateInterView}
        />
      )}
      {openDetailInterView && (
        <DetailIntefviewModal
          open={openDetailInterView}
          setOpen={setOpenDetailInterView}
        />
      )}
    </CalendarProvider>
  )
}

export default CalendarsScreen
