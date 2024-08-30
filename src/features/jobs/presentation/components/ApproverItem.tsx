import { TimelineConnector, TimelineItem, TimelineSeparator } from '@mui/lab'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import BlockIcon from 'shared/components/icons/Block'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { ReactNode } from 'react'
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded'
export type ApproveStatus = 'accepted' | 'pending' | 'rejected' | 'waiting'

type ApproveStatusStyled = {
  [T in ApproveStatus]: ReactNode
}
type ApproverItemProps = {
  nameApprover: string
  emailApprover: string
  index: number
  status: ApproveStatus
  lastItem: boolean
}

const colorStatus: ApproveStatusStyled = {
  accepted: (
    <CheckCircleOutlineIcon sx={{ fontSize: '24px', color: '#2CC5BD' }} />
  ),
  pending: (
    <ErrorOutlineRoundedIcon sx={{ fontSize: '24px', color: '#FFAF46' }} />
  ),
  rejected: (
    <DoDisturbAltRoundedIcon sx={{ fontSize: '24px', color: '#FC105C' }} />
  ),
  waiting: <BlockIcon sx={{ fontSize: '24px', color: '#82868C' }} />,
}

function ApproverItem({
  emailApprover,
  nameApprover,
  index,
  status,
  lastItem,
}: ApproverItemProps) {
  const Icon = colorStatus[status]
  return (
    <TimelineItem>
      <TimelineSeparator>
        {Icon}
        {!lastItem && (
          <TimelineConnector
            sx={{ marginTop: '10px', marginBottom: '10px', color: '#4D607A' }}
          />
        )}
      </TimelineSeparator>
      <Box marginLeft={1}>
        <Tiny12md>Approver {index}</Tiny12md>
        <Text13sb>{nameApprover}</Text13sb>
        <FlexBox gap={1} alignItems={'center'}>
          <MailRoundedIcon sx={{ fontSize: '12px', color: '#82868C' }} />
          <Tiny12md color={'#82868C'}>{emailApprover}</Tiny12md>
        </FlexBox>
      </Box>
    </TimelineItem>
  )
}

export default ApproverItem
