import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Link, Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ChipInterviewStatus from 'shared/components/chip/ChipInterviewStatus'
import ChipLimit from 'shared/components/chip-stack/chip-limit'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import { formatDateToString, getTime } from 'shared/utils/date'
import dayjs from 'dayjs'
import BoxTextSquare from 'shared/components/utils/boxText'

type InterviewProps = {
  candidateInterview: CandidateInterview
}

function Interview({ candidateInterview }: InterviewProps) {
  const [open, setOpen] = useState(true)
  const interviewers: string[] = candidateInterview.interviewer.map(
    (i) => i.name
  )
  return (
    <FlexBox
      flexDirection={'column'}
      padding={2}
      width={'100%'}
      border={'1px solid #E3E6EB'}
      borderRadius={'4px'}
      marginTop={'16px'}
    >
      <FlexBox
        height={'24px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={1}
        width={'100%'}
      >
        <FlexBox alignItems={'center'}
        //  onClick={() => setOpen((prev) => !prev)}
         >
          {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
          <FlexBox gap={1}>
            <Text13sb marginLeft={1}>{candidateInterview.title}</Text13sb>
            <Link
              href={`/dashboard/job-detail/${candidateInterview.candidate_job.hiring_job.id}`}
              target="_blank"
              color={'primary.600'}
            >
              {candidateInterview.candidate_job.hiring_job.name}
            </Link>
            <Tiny12md color={'grey.500'}>Created by</Tiny12md>
            <Tiny12md color={'primary.600'}>
              {candidateInterview.owner.name}
            </Tiny12md>
            {candidateInterview.edited && <BoxTextSquare content="Edited" />}
          </FlexBox>
        </FlexBox>
        <Tiny12md color={'grey.500'}>
          {formatDateToString(
            new Date(candidateInterview.created_at),
            'DD/MM/YYYY'
          )}
          {', '}
          {getTime(new Date(candidateInterview.created_at))}
        </Tiny12md>
      </FlexBox>
      <FlexBox gap={3} marginLeft={1}>
        <FlexBox flexDirection={'column'}>
          <Tiny12md color={'grey.500'}>Date and time</Tiny12md>
          <Text13sb>
            {dayjs(candidateInterview.interview_date).format('DD/MM/YYYY')},{' '}
            {dayjs(candidateInterview.start_from).format('HH:mm')} -{' '}
            {dayjs(candidateInterview.end_at).format('HH:mm')}
          </Text13sb>
        </FlexBox>
        <FlexBox flexDirection={'column'}>
          <Tiny12md color={'grey.500'}>Status</Tiny12md>
          <ChipInterviewStatus status={candidateInterview.status} />
        </FlexBox>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox marginLeft={1} gap={1} flexDirection={'column'} marginTop={1}>
          <FlexBox flexDirection={'column'}>
            <Tiny12md color={'grey.500'}>Interviewers</Tiny12md>
            <FlexBox>
              <ChipLimit chips={interviewers} limit={3} />
            </FlexBox>
          </FlexBox>
          <FlexBox flexDirection={'column'}>
            <Tiny12md color={'grey.500'}>Location</Tiny12md>
            <Text13sb>{candidateInterview.location} </Text13sb>
          </FlexBox>
          <FlexBox flexDirection={'column'}>
            <Tiny12md color={'grey.500'}>Description</Tiny12md>
            <Text13sb>{candidateInterview.description}</Text13sb>
          </FlexBox>
        </FlexBox>
      </Collapse>
    </FlexBox>
  )
}

export default Interview
