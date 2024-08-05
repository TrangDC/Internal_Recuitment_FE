import { IconButton, Tooltip, TooltipProps } from '@mui/material'
import ExPoint from '../icons/ExPoint'

function InformationTooltip(props: Omit<TooltipProps, 'children'>) {
  return (
    <Tooltip {...props}>
      <IconButton>
        <ExPoint />
      </IconButton>
    </Tooltip>
  )
}

export default InformationTooltip
