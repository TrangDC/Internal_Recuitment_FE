import { EventProps } from 'react-big-calendar'
import { CalendarEvent } from './interface'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny10md, Tiny12 } from 'shared/components/Typography'
import dayjs from 'dayjs'
import { useContextCalendar } from 'features/calendars/shared/contexts/calendarProvider/CalendarProvider'
import ChipInterviewStatus from 'shared/components/chip/ChipInterviewStatus'
import { Fragment, useState } from 'react'
import MenuContextInterview from '../../components/MenuContextInterview'
import useBuildActionsTableCalendar from 'features/calendars/hooks/calendar/useBuildActionsTableCalendar'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkActionPermissionCalendar from 'features/calendars/permission/utils/checkActionPermissionCalendar'

const CustomEvent = (props: EventProps<CalendarEvent>) => {
  const { useActionInterviewReturn } = useContextCalendar()
  const { event } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const { actions } = useBuildActionsTableCalendar({
    ...useActionInterviewReturn,
    event,
  })

  const { role, user } = useAuthorization()
  const newActions = checkActionPermissionCalendar({
    actions: actions,
    me: user,
    role,
    rowData: event,
  })

  function onClickRight(event: React.MouseEvent<HTMLDivElement>) {
    if (newActions.length === 0) return
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  return (
    <Fragment>
      <FlexBox
        flexDirection={'column'}
        alignItems={'start'}
        height={'100%'}
        onContextMenu={onClickRight}
      >
        <FlexBox alignItems={'center'} gap={1}>
          <ChipInterviewStatus
            status={event.resource?.status ?? ''}
            size="small"
          />
          <Tiny10md gap={1} display={'flex'}>
            {`${dayjs(event?.start).format('HH:mm')} - ${dayjs(event?.end).format('HH:mm')}`}
          </Tiny10md>
        </FlexBox>
        <Box flex={1}>
          <Tiny12 marginTop={'5px'}>{event.title}</Tiny12>
        </Box>
      </FlexBox>
      <MenuContextInterview<CalendarEvent>
        anchorEl={anchorEl}
        actions={newActions}
        setAnchorEl={setAnchorEl}
        rowData={event}
        rowId={event?.resource?.id ?? ''}
      />
    </Fragment>
  )
}

export default CustomEvent
