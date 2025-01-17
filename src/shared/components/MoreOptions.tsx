import { Menu, MenuItem } from '@mui/material'
import { FC } from 'react'
import { Small } from './Typography'
import PencilIcon from 'shared/components/icons//PencilIcon'
import DeleteIcon from 'shared/components/icons//DeleteIcon'

// component props interface

interface MoreOptionsProps {
  open?: boolean
  anchorEl: HTMLElement | null
  handleMoreClose: () => void
}

const MoreOptions: FC<MoreOptionsProps> = ({ anchorEl, handleMoreClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMoreClose}
    >
      <MenuItem
        onClick={handleMoreClose}
        sx={{ '&:hover': { color: 'primary.main' } }}
      >
        <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Edit</Small>
      </MenuItem>

      <MenuItem
        onClick={handleMoreClose}
        sx={{ '&:hover': { color: 'primary.main' } }}
      >
        <DeleteIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Remove</Small>
      </MenuItem>
    </Menu>
  )
}

export default MoreOptions
