import Calendars from '../page-sections/google-calendar'
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import { SlotInfo } from 'react-big-calendar'
import CreateInterviewModal from '../page-sections/createInterviewModal'
import {
  DragFromOutsideItemArgs,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop'
import { CalendarEvent } from '../page-sections/google-calendar/interface'
import DetailIntefviewModal from '../page-sections/detailInterviewModal'
import CalendarProvider from '../providers/contexts/calendarProvider/CalendarProvider'
import useGetAllInterview from '../providers/hooks/useGetAllInterview'
import EditInterviewModal from '../page-sections/editInterviewModal'
import useDragDropInterview from '../providers/hooks/useDragDropInterview'
import { convertToUTC } from 'shared/utils/date'
import { isDate } from 'lodash'
import {
  convertToRootDate,
  ruleDragDropCalendar,
} from '../page-sections/google-calendar/functions'
import { Box } from '@mui/material'
import IconScreen from 'shared/components/utils/IconScreen'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer } from 'shared/styles'
import duotone from 'shared/components/icons'

function CalendarsScreen() {
  const [openCreateInterView, setOpenCreateInterView] = useState(false)
  const [openDetailInterView, setOpenDetailInterView] = useState(false)
  const [openEditInterView, setOpenEditInterView] = useState(false)
  const eventId = useRef<string>('')
  const dragItemOutside = useRef<CalendarEvent>()
  const { myEvents, isLoading, handlePagination } = useGetAllInterview()
  const { onDragDropInterview } = useDragDropInterview({})
  const translation = useTextTranslation()

  const handleSelectSlot = useCallback(({ start, end }: SlotInfo) => {
    // setOpenCreateInterView(true)
  }, [])

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs<CalendarEvent>) => {
      const { allDay } = event
      if (isDate(start) && isDate(end) && event.start) {
        ruleDragDropCalendar(event.start, start, end, () => {
          if (!allDay && droppedOnAllDaySlot) {
            event.allDay = true
          }
          if (allDay && !droppedOnAllDaySlot) {
            event.allDay = false
          }
          const endUTC = convertToUTC(end)
          const startUTC = convertToUTC(start)
          onDragDropInterview({
            id: event.resource?.id ?? '',
            input: {
              end_at: endUTC.toISOString(),
              start_from: startUTC.toISOString(),
              interview_date: startUTC.toISOString(),
            },
          })
        })
      }
    },

    [onDragDropInterview]
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

  function handleDeleteEvent(id: string) {}

  function handleEditEvent(id: string) {
    eventId.current = id
    setOpenEditInterView(true)
  }

  function handleDragStart(event: CalendarEvent) {
    console.log('event', event)
    dragItemOutside.current = event
  }

  function onDropFromOutside(args: DragFromOutsideItemArgs) {
    if (
      dragItemOutside.current?.end &&
      dragItemOutside.current?.start &&
      isDate(args.start)
    ) {
      const id = dragItemOutside.current.resource?.id ?? ''
      const start = dragItemOutside.current?.start
      const end = dragItemOutside.current?.end
      const dropToDate = args.start
      const { newEnd, newStart } = convertToRootDate(start, end, dropToDate)
      ruleDragDropCalendar(start, newStart, newEnd, () => {
        onDragDropInterview({
          id: id,
          input: {
            end_at: newEnd.toISOString(),
            start_from: newStart.toISOString(),
            interview_date: dropToDate.toISOString(),
          },
        })
      })
    }
  }
  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={duotone.Calender}
          textLable={translation.MODLUE_CALENDAR.canlendar}
        />
      </Box>
      <BoxWrapperOuterContainer>
        <CalendarProvider
          setOpenCreateInterView={setOpenCreateInterView}
          handleDeleteEvent={handleDeleteEvent}
          handleEditEvent={handleEditEvent}
        >
          <Calendars
            onSelectSlot={handleSelectSlot}
            myEvents={myEvents}
            onDropEvent={moveEvent}
            onSelectEvent={onSelectEvent}
            onRangeChange={handlePagination}
            isLoading={isLoading}
            handleDragStart={handleDragStart}
            onDropFromOutside={onDropFromOutside}
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
      </BoxWrapperOuterContainer>
    </Box>
  )
}

export default CalendarsScreen
