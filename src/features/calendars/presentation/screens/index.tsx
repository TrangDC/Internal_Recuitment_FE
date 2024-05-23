import Calendars from '../page-sections/google-calendar'
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import { SlotInfo } from 'react-big-calendar'
import CreateInterviewModal from '../page-sections/createInterviewModal'
import { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { CalendarEvent } from '../page-sections/google-calendar/interface'
import DetailIntefviewModal from '../page-sections/detailInterviewModal'
import CalendarProvider from '../providers/contexts/calendarProvider/CalendarProvider'
import useGetAllInterview from '../providers/hooks/useGetAllInterview'
import EditInterviewModal from '../page-sections/editInterviewModal'

const event: CalendarEvent[] = [
  {
    title: 'Long Event',
    start: new Date(2024, 3, 7),
    end: new Date(2024, 3, 10),
    resource: {
      id: '1',
      styles: {
        colorId: 1,
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
        colorId: 1,
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
        colorId: 1,
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
        colorId: 1,
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
        colorId: 1,
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
        colorId: 1,
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
        colorId: 1,
      },
    },
  },
  {
    title: 'Meeting 1',
    start: new Date(2024, 3, 12, 11, 30, 0, 0),
    end: new Date(2024, 3, 12, 13, 50, 0, 0),
    resource: {
      id: '7',
      styles: {
        colorId: 1,
      },
    },
  },
  {
    title: 'Meeting',
    start: new Date(2024, 3, 12, 11, 30, 0, 0),
    end: new Date(2024, 3, 12, 13, 50, 0, 0),
    resource: {
      id: '7',
      styles: {
        colorId: 1,
      },
    },
  },
  {
    title: 'Meeting',
    start: new Date(2024, 3, 12, 11, 30, 0, 0),
    end: new Date(2024, 3, 12, 13, 50, 0, 0),
    resource: {
      id: '7',
      styles: {
        colorId: 1,
      },
    },
  },
  {
    title: 'Meeting',
    start: new Date(2024, 3, 12, 11, 30, 0, 0),
    end: new Date(2024, 3, 12, 13, 50, 0, 0),
    resource: {
      id: '7',
      styles: {
        colorId: 1,
      },
    },
  },
]

function CalendarsScreen() {
  const [openCreateInterView, setOpenCreateInterView] = useState(false)
  const [openDetailInterView, setOpenDetailInterView] = useState(false)
  const [openEditInterView, setOpenEditInterView] = useState(false)
  const eventId = useRef<string>('')
  const [myEvents, setEvents] = useState<CalendarEvent[]>(event)
  const {
    myEvents: myEvents1,
    isLoading,
    handlePagination,
  } = useGetAllInterview()
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
    }: EventInteractionArgs<CalendarEvent>) => {
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

        const newEvent: CalendarEvent = {
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
    event: CalendarEvent,
    e: SyntheticEvent<HTMLElement, Event>
  ) {
    e.stopPropagation()
    if (event.resource?.id) {
      eventId.current = event.resource?.id
      setOpenDetailInterView(true)
    }
  }

  function handleDeleteEvent(id: string) {
    const removeEvent = myEvents.filter((o) => o.resource?.id !== id)
    setEvents(removeEvent)
  }

  function handleEditEvent(id: string) {
    eventId.current = id
    setOpenEditInterView(true)
  }
  return (
    <CalendarProvider
      setOpenCreateInterView={setOpenCreateInterView}
      handleDeleteEvent={handleDeleteEvent}
      handleEditEvent={handleEditEvent}
    >
      <Calendars
        onSelectSlot={handleSelectSlot}
        myEvents={myEvents1}
        onDropEvent={moveEvent}
        onSelectEvent={onSelectEvent}
        onRangeChange={handlePagination}
        isLoading={isLoading}
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
          id={eventId.current}
        />
      )}
      {openEditInterView && (
        <EditInterviewModal
          open={openEditInterView}
          id={eventId.current}
          setOpen={setOpenEditInterView}
        />
      )}
    </CalendarProvider>
  )
}

export default CalendarsScreen
