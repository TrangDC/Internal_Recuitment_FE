import { Chip, ChipProps, styled } from '@mui/material'
import { useMemo } from 'react'
import { CandidateStatusEnum } from 'shared/schema'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'

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
    return application_data[status]
  }, [status])

  return (
    <ChipStyled
      label={field_status?.label}
      style={{
        backgroundColor: field_status?.backgroundColor,
        color: 'white',
      }}
      {...chipProps}
    />
  )
}

export default ChipCandidate
