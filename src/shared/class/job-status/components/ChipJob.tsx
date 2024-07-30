import { Chip, ChipProps, styled } from '@mui/material'
import { JobStatus } from '..'
import { useMemo } from 'react'
import { HiringJobStatus } from 'shared/schema/database/hiring_job'

const ChipStyled = styled(Chip)(({ theme }) => ({
  height: '20px',

  '& .MuiChip-label': {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '12.19px',
  },
}))

interface Props extends ChipProps {
  status: HiringJobStatus
}

const ChipJob = ({ ...props }: Props) => {
  const { status, ...chipProps } = props
  const field_status = useMemo(() => {
    return JobStatus.STATUS_STYLE[status]
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

export default ChipJob
