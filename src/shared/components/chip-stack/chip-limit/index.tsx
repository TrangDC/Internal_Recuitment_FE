import { useMemo } from 'react'
import ChipField from '../chip-field'
import { Stack, Tooltip } from '@mui/material'
interface Props {
  chips: string[]
  limit?: number
}

const ChipsWithLimit = ({ chips, limit = chips.length }: Props) => {
  const label_chip = useMemo(() => {
    return chips.join(', ')
  }, [chips])

  return (
    <Tooltip title={label_chip} placement="top-start">
      <Stack display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={1}>
        {chips.slice(0, limit).map((chip, index) => (
          <ChipField key={index} label={chip} />
        ))}

        {chips.length > limit && (
          <ChipField label={`+${chips.length - limit}`} />
        )}
      </Stack>
    </Tooltip>
  )
}

export default ChipsWithLimit
