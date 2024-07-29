import FlexBox from 'shared/components/flexbox/FlexBox'
import ToolBarButton from './ToolBarButton'
import { ToolbarProps } from 'react-big-calendar'
import AddNewButton from './AddNewButton'
import RenderDatePickerCalendar from './RenderDatePickerCalendar'
import { ChosenDateType } from './DatePickerCalendar'
import { Button, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { buttonToolBarList } from '../constant'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useContextCalendar } from 'features/calendars/shared/contexts/calendarProvider/CalendarProvider'
import Cant from 'features/authorization/presentation/components/Cant'

function ToolBar(props: ToolbarProps) {
  const { view, onView, onNavigate, date } = props
  const { useActionInterviewReturn } = useContextCalendar()
  const { setOpenCreate } = useActionInterviewReturn
  function handleChangeDate(value: ChosenDateType) {
    if (value) onNavigate('DATE', value.toDate())
  }

  function handleOpenCreateInterview() {
    setOpenCreate(true)
  }
  return (
    <FlexBox
      padding={'10px'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <FlexBox alignItems={'center'} justifyContent={'center'} gap={1}>
        <Button
          size="small"
          variant="text"
          onClick={() => onNavigate('TODAY')}
          sx={{
            border: '1px solid #E3E6EB',
            fontSize: '15px',
            padding: '6px',
            height: '40px',
          }}
        >
          Today
        </Button>
        <IconButton aria-label="prev" onClick={() => onNavigate('PREV')}>
          <ArrowBackIosNewIcon sx={{ fontSize: '18px' }} />
        </IconButton>

        <IconButton aria-label="next" onClick={() => onNavigate('NEXT')}>
          <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
        </IconButton>
        <RenderDatePickerCalendar
          view={view}
          onChange={handleChangeDate}
          defaultDate={date}
        />
      </FlexBox>
      <FlexBox gap={2}>
        <FlexBox
          gap={1}
          border={'1px solid'}
          borderColor={'grey.200'}
          borderRadius={'4px'}
          padding={'5px'}
          height={40}
          sx={{
            backgroundColor: 'white',
          }}
        >
          {buttonToolBarList.map((o) => (
            <ToolBarButton
              key={o.view}
              variant={o.view === view ? 'contained' : 'outlined'}
              onClick={() => onView(o.view)}
            >
              {o.title}
            </ToolBarButton>
          ))}
        </FlexBox>
        <Cant
          module="INTERVIEWS"
          checkBy={{
            compare: 'hasAny',
            permissions: ['CREATE.everything', 'CREATE.teamOnly'],
          }}
        >
          <AddNewButton
            sx={{ height: '40px' }}
            onClick={handleOpenCreateInterview}
          >
            Add new Interview
          </AddNewButton>
        </Cant>
      </FlexBox>
    </FlexBox>
  )
}

export default ToolBar
