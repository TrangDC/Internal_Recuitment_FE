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
  sorting: {field: string, direction: 'ASC' | 'DESC'}
}

const IconSortBy = ({ type = false, sorting}: IconSort) => {

  return (
    <DivIcon className={`${!!type && 'enabled_icon'} iconSort`}>
      {sorting.direction === 'ASC' ?  <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </DivIcon>
  )
}

export default IconSortBy
