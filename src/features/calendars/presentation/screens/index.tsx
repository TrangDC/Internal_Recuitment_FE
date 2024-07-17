import Calendars from '../page-sections/google-calendar'
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import { SlotInfo } from 'react-big-calendar'
import CreateInterviewModal from '../page-sections/createInterviewModal'
import {
  DragFromOutsideItemArgs,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop'
import { CalendarEvent } from '../page-sections/google-calendar/interface'
import DetailInterviewModal from '../page-sections/detailInterviewModal'
import EditInterviewModal from '../page-sections/editInterviewModal'
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
import DeleteInterviewModal from '../page-sections/deleteInterviewModal'
import useGetAllInterview from 'features/calendars/hooks/useGetAllInterview'
import useDragDropInterview from 'features/calendars/hooks/useDragDropInterview'
import CalendarProvider from 'features/calendars/shared/contexts/calendarProvider/CalendarProvider'
import useCheckEditInterviewPermission from 'features/calendars/permission/hooks/useCheckEditInterviewPermission'
import { useLocation } from 'react-router-dom'

function CalendarsScreen() {
  const [openCreateInterView, setOpenCreateInterView] = useState(false)
  const [openDetailInterView, setOpenDetailInterView] = useState(false)
  const [openEditInterView, setOpenEditInterView] = useState(false)
  const [openDeleteInterView, setOpenDeleteInterView] = useState(false)
  const eventId = useRef<string>('')
  const dragItemOutside = useRef<CalendarEvent>()
  const { handleCheckPermission } = useCheckEditInterviewPermission()
  const { myEvents, isLoading, handlePagination } = useGetAllInterview()
  const { onDragDropInterview } = useDragDropInterview({})
  const translation = useTextTranslation()

  const location = useLocation();

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
      const cantEdit = handleCheckPermission({
        candidateJobOfTeamId: event.resource?.teamId ?? '',
        interviewers: event.resource?.interviewer ?? [],
      })
      console.log('teamId', event.resource?.teamId)
      console.log('interviewers', event.resource?.interviewer)
      console.log('cantEdit', cantEdit)
      if (!cantEdit) return
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

  function handleDeleteEvent(id: string) {
    eventId.current = id
    setOpenDeleteInterView(true)
  }

  function handleEditEvent(id: string) {
    eventId.current = id
    setOpenEditInterView(true)
  }

  function handleDragStart(event: CalendarEvent) {
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const interview_id = queryParams.get('interview_id');
    const is_open_detail = queryParams.get('is_open_detail');

    if(interview_id && is_open_detail && JSON.parse(is_open_detail)) {
      eventId.current = interview_id
      setOpenDetailInterView(true)
    }
  }, [])
  
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
            <DetailInterviewModal
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
          {openDeleteInterView && (
            <DeleteInterviewModal
              open={openDeleteInterView}
              id={eventId.current}
              setOpen={setOpenDeleteInterView}
              onSuccess={() => {
                setOpenDetailInterView(false)
              }}
            />
          )}
        </CalendarProvider>
      </BoxWrapperOuterContainer>
    </Box>
  )
}

export default CalendarsScreen
