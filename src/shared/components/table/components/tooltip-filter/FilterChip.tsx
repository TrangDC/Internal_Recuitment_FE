import { Chip, IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

interface IFilterChip {
  label: string
  handleDelete?: () => void
}
const FilterChip = (props: IFilterChip) => {
  const { label = '', handleDelete } = props

  return label ? (
    <Chip
      label={label}
      sx={{
        backgroundColor: '#F1F9FF',
        fontSize: '14px',
        color: '#121625',
        lineHeight: '21px',
        fontWeight: 500,
        marginRight: 0.5,
        marginBottom: 0.5,
      }}
      onDelete={handleDelete}
      deleteIcon={
        <IconButton sx={{ fontSize: '16px' }} size="small">
          <CancelIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      }
    />
  ) : (
    <></>
  )
}

export default FilterChip
