import { EventProps } from 'react-big-calendar'
import { CalendarEvent } from './interface'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny10md, Tiny12 } from 'shared/components/Typography'
import dayjs from 'dayjs'
import { useContextCalendar } from 'features/calendars/shared/contexts/calendarProvider/CalendarProvider'
import ChipInterviewStatus from 'shared/components/chip/ChipInterviewStatus'
import CalendarActions from '../../components/interviewActions'

const CustomEvent = (props: EventProps<CalendarEvent>) => {
  const { useActionInterviewReturn } = useContextCalendar()
  const { event } = props
  return (
    <FlexBox flexDirection={'column'} alignItems={'start'} height={'100%'}>
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
      <FlexBox justifyContent={'end'} width={'100%'}>
        <CalendarActions
          useActionInterviewReturn={useActionInterviewReturn}
          event={event}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default CustomEvent
