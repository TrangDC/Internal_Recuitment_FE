import { Chip, ChipProps, styled } from '@mui/material'
import { CANDIDATE_STYLE, TYPE_CANDIDATE_STATUS } from '../index'
import { useMemo } from 'react'

const ChipStyled = styled(Chip)(({ theme }) => ({
  height: '20px',

  '& .MuiChip-label': {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '12.19px',
  },
}))

interface Props extends ChipProps {
  status: TYPE_CANDIDATE_STATUS
}

const ChipCandidate = ({ ...props }: Props) => {
  const { status, ...chipProps } = props
  const field_status = useMemo(() => {
    return CANDIDATE_STYLE[status]
  }, [status])

  return (
    <ChipStyled
      label={field_status?.label}
      style={{
        backgroundColor: field_status?.backgroundColor,
        color: field_status?.color,
      }}
      {...chipProps}
    />
  )
}

export default ChipCandidate
