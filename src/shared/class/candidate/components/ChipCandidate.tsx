import { Chip, ChipProps, styled } from '@mui/material'
import { useMemo } from 'react'
import { CANDIDATE_STATUS } from 'features/candidatejob/shared/constants'
import { CandidateStatusEnum } from 'shared/schema'

const ChipStyled = styled(Chip)(({ theme }) => ({
  height: '20px',

  '& .MuiChip-label': {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '12.19px',
  },
}))

interface Props extends ChipProps {
  status: CandidateStatusEnum
}

const ChipCandidate = ({ ...props }: Props) => {
  const { status, ...chipProps } = props
  const field_status = useMemo(() => {
    return CANDIDATE_STATUS[status]
  }, [status])

  return (
    <ChipStyled
      label={field_status?.text}
      style={{
        backgroundColor: field_status?.backgroundColor,
        color: 'white',
      }}
      {...chipProps}
    />
  )
}

export default ChipCandidate
