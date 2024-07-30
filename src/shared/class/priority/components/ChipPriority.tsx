import { Chip, ChipProps, styled } from '@mui/material'
import { PRIORITY_STYLE } from '../index'
import { useMemo } from 'react'
import _ from 'lodash'

const ChipStyled = styled(Chip)(({ theme }) => ({
  height: '20px',

  '& .MuiChip-label': {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '12.19px',
  },
}))

interface Props extends ChipProps {
  status: number
}

const ChipPriority = ({ ...props }: Props) => {
  const { status, ...chipProps } = props
  const field_status = useMemo(() => {
    return _.get(PRIORITY_STYLE, status)
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

export default ChipPriority
