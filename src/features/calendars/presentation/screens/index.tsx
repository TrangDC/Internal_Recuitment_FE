import Calendars from '../page-sections/google-calendar'
import { SyntheticEvent, useCallback, useEffect, useRef } from 'react'
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
import ChangeCandidateInterviewStatusModal from '../page-sections/changeCandidateInterviewStatusModal'
import useActionInterview from 'features/calendars/hooks/calendar/useActionInterview'

function CalendarsScreen() {
  const useChangeInterviewStatusReturn = useActionInterview()
  const dragItemOutside = useRef<CalendarEvent>()
  const { handleCheckPermission } = useCheckEditInterviewPermission()
  const { myEvents, isLoading, handlePagination } = useGetAllInterview()
  const { onDragDropInterview } = useDragDropInterview({})
  const translation = useTextTranslation()
  const {
    openCreate,
    openDelete,
    eventId,
    openEdit,
    openDetail,
    setOpenCreate,
    setOpenDetail,
    setOpenDelete,
    setOpenEdit,
    handleOpenDetail,
    openCancelCandidateInterviewModal,
    openDoneCandidateInterviewModal,
    setOpenCancelCandidateInterviewModal,
    setOpenDoneCandidateInterviewModal,
  } = useChangeInterviewStatusReturn
  const location = useLocation()

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
      handleOpenDetail(event.resource.id)
    }
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
    const queryParams = new URLSearchParams(location.search)
    const interview_id = queryParams.get('interview_id')
    const is_open_detail = queryParams.get('is_open_detail')

    if (interview_id && is_open_detail && JSON.parse(is_open_detail)) {
      handleOpenDetail(interview_id)
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
          useActionInterviewReturn={useChangeInterviewStatusReturn}
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
          {openCreate && (
            <CreateInterviewModal open={openCreate} setOpen={setOpenCreate} />
          )}
          {openDetail && (
            <DetailInterviewModal
              open={openDetail}
              setOpen={setOpenDetail}
              id={eventId.current}
            />
          )}
          {openEdit && (
            <EditInterviewModal
              open={openEdit}
              id={eventId.current}
              setOpen={setOpenEdit}
            />
          )}
          {openDelete && (
            <DeleteInterviewModal
              open={openDelete}
              id={eventId.current}
              setOpen={setOpenDelete}
              onSuccess={() => {
                setOpenDetail(false)
              }}
            />
          )}
          {openCancelCandidateInterviewModal && (
            <ChangeCandidateInterviewStatusModal
              id={eventId.current}
              open={openCancelCandidateInterviewModal}
              setOpen={setOpenCancelCandidateInterviewModal}
              updateTo="cancelled"
            />
          )}
          {openDoneCandidateInterviewModal && (
            <ChangeCandidateInterviewStatusModal
              id={eventId.current}
              open={openDoneCandidateInterviewModal}
              setOpen={setOpenDoneCandidateInterviewModal}
              updateTo="done"
            />
          )}
        </CalendarProvider>
      </BoxWrapperOuterContainer>
    </Box>
  )
}

export default CalendarsScreen
