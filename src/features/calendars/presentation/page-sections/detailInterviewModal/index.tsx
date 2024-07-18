import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Scrollbar from 'shared/components/ScrollBar'
import {
  H5,
  Tiny12md,
  Text13md,
  Text15sb,
  LinkText,
} from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ChipField from 'shared/components/input-fields/ChipField'
import BaseModal from 'shared/components/modal'
import { formatDateToString, getTime, isPast } from 'shared/utils/date'
import { Fragment } from 'react/jsx-runtime'
import { useContextCalendar } from 'features/calendars/shared/contexts/calendarProvider/CalendarProvider'
import useGetInterview from 'features/calendars/hooks/useGetInterview'
import DeleteInterviewButtonPermission from 'features/calendars/permission/components/DeleteInterviewButtonPermission'
import EditInterviewButtonPermission from 'features/calendars/permission/components/EditInterviewButtonPermission'
import {
  GetLocationName,
  LOCATION_INTERVIEW_STATE,
} from 'shared/components/autocomplete/location-interview-autocomplete'
import { LinkText as Link } from 'shared/styles'
import { useMemo } from 'react'
interface IDetailIntefviewModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

const labelStyle = {
  '& .MuiChip-label': {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
  },
}

function DetailInterviewModal(props: IDetailIntefviewModal) {
  const { open, setOpen, id } = props
  const { handleEditEvent, handleDeleteEvent } = useContextCalendar()
  const { useFormReturn, navigateToCandidate, navigateToCandidateJob } =
    useGetInterview({
      id: id,
    })

  const { getValues, watch } = useFormReturn
  const start_from = watch('start_from')
  const candidateJobOfTeamId = getValues('candidateJobOfTeamId')

  const show_meeting_link = useMemo(() => {
    return getValues('location') === LOCATION_INTERVIEW_STATE.ONLINE
  }, [getValues('location')])
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <Box>
        <FlexBox
          borderBottom={'1px solid '}
          borderColor={'grey.200'}
          padding={2}
        >
          <FlexBox flexDirection={'column'} gap={1} width={'100%'}>
            <FlexBox justifyContent={'space-between'} alignItems={'center'}>
              <Text13md color={'grey.500'}>
                {formatDateToString(getValues('interview_date'), 'ddd, MMM D')}
                {', '}
                {getTime(getValues('start_from'))} -{' '}
                {getTime(getValues('end_at'))}
              </Text13md>
              <FlexBox gap={1}>
                {start_from && isPast(start_from) && (
                  <Fragment>
                    <EditInterviewButtonPermission
                      candidateJobOfTeamId={candidateJobOfTeamId}
                      interviewers={getValues('interviewer')}
                      onClick={() => {
                        handleEditEvent(id)
                        setOpen(false)
                      }}
                    />
                    <DeleteInterviewButtonPermission
                      onClick={() => {
                        handleDeleteEvent(id)
                      }}
                      candidateJobOfTeamId={candidateJobOfTeamId}
                      interviewers={getValues('interviewer')}
                    />
                  </Fragment>
                )}
                <CloseIcon
                  sx={{
                    height: '24px',
                    width: '24px',
                    color: '#82868C',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setOpen(false)
                  }}
                />
              </FlexBox>
            </FlexBox>
            <H5 color={'grey.900'}>{getValues('title')}</H5>
          </FlexBox>
          <FlexBox></FlexBox>
        </FlexBox>
        <Scrollbar sx={{ minHeight: '233px', maxHeight: '500px' }}>
          <Box padding={2}>
            <FlexBox
              alignItems={'center'}
              gap={4}
              borderBottom={'1px solid '}
              borderColor={'grey.200'}
              width={'100%'}
              paddingBottom={2}
            >
              <FlexBox flexDirection={'column'} height={'35px'} gap={1}>
                <Tiny12md color={'grey.500'}>Team</Tiny12md>
                <Text15sb color={'grey.900'}>{getValues('team')}</Text15sb>
              </FlexBox>
              <FlexBox flexDirection={'column'} height={'35px'} gap={1}>
                <Tiny12md color={'grey.500'}>Job</Tiny12md>
                <LinkText onClick={navigateToCandidateJob}>
                  {getValues('job')}
                </LinkText>
              </FlexBox>
              <FlexBox flexDirection={'column'} height={'35px'} gap={1}>
                <Tiny12md color={'grey.500'}>Candidate name</Tiny12md>
                <LinkText onClick={navigateToCandidate}>
                  {getValues('candidateName')}
                </LinkText>
              </FlexBox>
              <FlexBox flexDirection={'column'} height={'35px'} gap={1}>
                <Tiny12md color={'grey.500'}>Candidate phone</Tiny12md>
                <Text15sb color={'grey.900'}>{getValues('phone')}</Text15sb>
              </FlexBox>
            </FlexBox>
            <Box>
              <Box marginTop={3}>
                <Tiny12md color={'grey.500'}>Interviewers</Tiny12md>
                <FlexBox
                  alignItems={'center'}
                  gap={1}
                  width={'100%'}
                  marginTop={1}
                >
                  {getValues('interviewer')?.map((o) => (
                    <ChipField
                      key={o.id}
                      label={o.name}
                      sx={labelStyle}
                    ></ChipField>
                  ))}
                </FlexBox>
              </Box>
              <Box marginTop={3}>
                <Tiny12md color={'grey.500'}>Location</Tiny12md>
                <Text13md color={'grey.900'}>
                  {GetLocationName(getValues('location'))}
                </Text13md>
              </Box>

              {show_meeting_link && (
                <Box marginTop={3}>
                  <Tiny12md color={'grey.500'}>Meeting link</Tiny12md>
                  <Text13md color={'grey.900'}>
                    <Link
                      to={getValues('meeting_link') as string}
                      target="_blank"
                    >
                      {getValues('meeting_link')}
                    </Link>
                  </Text13md>
                </Box>
              )}
              <Box marginTop={3}>
                <Tiny12md color={'grey.500'}>Description</Tiny12md>
                <Text13md color={'grey.900'}>
                  {getValues('description')}
                </Text13md>
              </Box>
            </Box>
          </Box>
        </Scrollbar>
      </Box>
    </BaseModal.Wrapper>
  )
}

export default DetailInterviewModal
