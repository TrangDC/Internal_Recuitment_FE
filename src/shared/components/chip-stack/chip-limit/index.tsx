import { useMemo } from 'react'
import ChipField from '../chip-field'
import { Stack, SxProps, Tooltip } from '@mui/material'
interface Props {
  chips: string[]
  limit?: number
  show_tooltip?: boolean
  chipSx?: SxProps
}

const ChipsWithLimit = ({
  chips,
  limit = chips.length,
  show_tooltip = true,
  chipSx,
}: Props) => {
  const label_chip = useMemo(() => {
    if (!show_tooltip) return ''

    return chips.join(', ')
  }, [chips])

  return (
    <Tooltip title={label_chip} placement="top-start">
      <Stack display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={1}>
        {chips.slice(0, limit).map((chip, index) => (
          <ChipField key={index} label={chip} sx={chipSx} />
        ))}

        {chips.length > limit && (
          <ChipField label={`+${chips.length - limit}`} sx={chipSx} />
        )}
      </Stack>
    </Tooltip>
  )
}

export default ChipsWithLimit
