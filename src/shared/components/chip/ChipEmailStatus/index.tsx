import { Chip, ChipProps, styled } from '@mui/material'
import { useMemo } from 'react'
import { EmailStatus } from './constants'
import { OutgoingEmailStatus } from 'shared/schema/database/out_going_email'

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

const ChipEmailStatus = ({ ...props }: Props) => {
  const { status, ...chipProps } = props
  const field_status = useMemo(() => {
    return EmailStatus.getDataByStatus(status as OutgoingEmailStatus)
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

export default ChipEmailStatus
