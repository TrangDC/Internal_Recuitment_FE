import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ChipInterviewStatus from 'shared/components/chip/ChipInterviewStatus'
import ChipLimit from 'shared/components/chip-stack/chip-limit'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import { formatDateToString, getTime } from 'shared/utils/date'

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
        <FlexBox alignItems={'center'} onClick={() => setOpen((prev) => !prev)}>
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          <FlexBox gap={1}>
            <Text13sb marginLeft={1}>Tech Interview</Text13sb>
            <Text13sb color={'primary.600'}>
              {candidateInterview.title}
            </Text13sb>
          </FlexBox>
        </FlexBox>
        <Tiny12md>
          {formatDateToString(
            new Date(candidateInterview.interview_date),
            'ddd, MMM D'
          )}
          {', '}
          {getTime(new Date(candidateInterview.start_from))} -{' '}
          {getTime(new Date(candidateInterview.end_at))}
        </Tiny12md>
      </FlexBox>
      <FlexBox gap={3} marginLeft={4}>
        <FlexBox flexDirection={'column'}>
          <Tiny12md>Date and time</Tiny12md>
          <Text13sb>20/08/2024, 14:30 - 16:30</Text13sb>
        </FlexBox>
        <FlexBox flexDirection={'column'}>
          <Tiny12md>Status</Tiny12md>
          <ChipInterviewStatus status={candidateInterview.status} />
        </FlexBox>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox marginLeft={4} gap={1} flexDirection={'column'}>
          <FlexBox flexDirection={'column'}>
            <Tiny12md>Interviewers</Tiny12md>
            <FlexBox>
              <ChipLimit chips={interviewers} limit={3} />
            </FlexBox>
          </FlexBox>
          <FlexBox flexDirection={'column'}>
            <Tiny12md>Location</Tiny12md>
            <Text13sb>{candidateInterview.location} </Text13sb>
          </FlexBox>
          <FlexBox flexDirection={'column'}>
            <Tiny12md>Description</Tiny12md>
            <Text13sb>{candidateInterview.description}</Text13sb>
          </FlexBox>
        </FlexBox>
      </Collapse>
    </FlexBox>
  )
}

export default Interview
