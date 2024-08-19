import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13md, Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import dayjs from 'dayjs'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import BoxTextSquare from 'shared/components/utils/boxText'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { downloadOneFile } from 'features/candidatejob/shared/helper'

type FeedbackProps = {
  candidateJobFeedback: CandidateJobFeedback
}

function Feedback({ candidateJobFeedback }: FeedbackProps) {
  const [open, setOpen] = useState(false)
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
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
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <FlexBox gap={1}>
            <Text13sb marginLeft={1}>Feedback</Text13sb>
            <Text13sb color={'primary.600'}>
              {candidateJobFeedback.candidate_job.hiring_job.name}
            </Text13sb>
            <Tiny12md color={'grey.500'}>Created by</Tiny12md>
            <Tiny12md color={'primary.600'}>
              {candidateJobFeedback.owner.name}
            </Tiny12md>
            {candidateJobFeedback.edited && <BoxTextSquare content="Edited" />}
          </FlexBox>
        </FlexBox>
        <Tiny12md color={'grey.500'}>
          {dayjs(candidateJobFeedback.created_at).format('DD/MM/YYYY, HH:MM')}
        </Tiny12md>
      </FlexBox>
      <FlexBox flexDirection={'column'} marginLeft={4}>
        <Text13md>{candidateJobFeedback.feedback}</Text13md>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox marginLeft={4} gap={1}>
          {candidateJobFeedback.attachments.map((i) => (
            <ShowFile
              key={i.id}
              name={i.document_name}
              onClick={() => {
                if (i) {
                  downloadOneFile(i, handleGetUrlDownload)
                }
              }}
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
