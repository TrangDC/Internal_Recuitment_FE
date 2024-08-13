import { IconButton } from '@mui/material'
import DeleteIcon from 'shared/components/icons/DeleteIcon'

type DeleteBoxProps = {
  onClick: () => void
}

function DeleteBox(props: DeleteBoxProps) {
  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
        borderRadius: '4px',
        border: '1px solid #BABFC5',
        backgroundColor: '#FFFFFF',
      }}
      {...props}
    >
      <DeleteIcon sx={{ fontSize: '24px' }} />
    </IconButton>
  )
}

export default DeleteBox
