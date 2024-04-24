import { Chip, styled } from '@mui/material'

const ChipStyled = styled(Chip)(({ theme }) => ({
    height: '20px',
  
    '& .MuiChip-label': {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: '12.19px',
    },
  }))

const ChipFieldStatus = ({...props}) => {
    return <ChipStyled {...props} />
}

export default ChipFieldStatus