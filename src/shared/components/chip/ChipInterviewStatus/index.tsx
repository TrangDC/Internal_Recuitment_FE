import { Chip, ChipProps, styled } from '@mui/material'
import { useMemo } from 'react'
import { InterviewStatus } from './constants'

const ChipStyled = styled(Chip)(({ theme }) => ({
  height: '20px',

  '& .MuiChip-label': {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '12.19px',
  },
}))

interface Props extends ChipProps {
  status: string
}

const ChipInterviewStatus = ({ ...props }: Props) => {
  const { status, ...chipProps } = props
  const field_status = useMemo(() => {
    return InterviewStatus.STATUS_STYLE[status]
  }, [status])

  return (
    <ChipStyled
      label={field_status?.text}
      style={{
        backgroundColor: field_status?.backgroundColor,
        color: field_status?.color,
      }}
      {...chipProps}
    />
  )
}

export default ChipInterviewStatus
