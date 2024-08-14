import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import dayjs from 'dayjs'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'

type FeedbackProps = {
  candidateJobFeedback: CandidateJobFeedback
}

function Feedback({ candidateJobFeedback }: FeedbackProps) {
  const [open, setOpen] = useState(true)
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
            <Text13sb marginLeft={1}>Feedback</Text13sb>
            <Text13sb color={'primary.600'}>
              {candidateJobFeedback.owner.name}
            </Text13sb>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox flexDirection={'column'}>
        <Tiny12md>
          {dayjs(candidateJobFeedback.created_at).format('HH:mm, dd/MM/yyyy')}
        </Tiny12md>
        <Text13sb>{candidateJobFeedback.feedback}</Text13sb>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox marginLeft={4} gap={1} flexDirection={'column'}>
          {candidateJobFeedback.attachments.map((i) => (
            <ShowFile
              key={i.id}
              name={i.document_name}
              IconEnd={<DownloadIcon />}
              containerSx={{
                width: 'auto',
              }}
            />
          ))}
        </FlexBox>
      </Collapse>
    </FlexBox>
  )
}

export default Feedback
