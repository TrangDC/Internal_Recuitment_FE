import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { IconSortProps } from 'shared/interfaces'
import { styled } from '@mui/material'

const DivIcon = styled('div')(({ theme }) => ({
  visibility: 'hidden',
  transition: 'ease-in-out',

  '&.enabled_icon': {
    visibility: 'visible',
  },
  '& svg': {
    fontSize: '18px',
  },
}))

interface IconSort extends IconSortProps {
  className?: string | undefined
}

const IconSortBy = ({ type = false}: IconSort) => {
  return (
    <DivIcon className={`${!!type && 'enabled_icon'} iconSort`}>
      {type === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
    </DivIcon>
  )
}

export default IconSortBy
