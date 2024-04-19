import { Chip, ChipProps, styled } from '@mui/material'

const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary[100],

  '&.MuiButtonBase-root span': {
    fontSize: '14px',
    fontWeight: 500,
  },

  '&.MuiButtonBase-root svg': {
    fontSize: '16px',
  },
}))

interface ChipFieldProps extends ChipProps {}

const ChipField = ({ ...props }: ChipFieldProps) => {
  return <ChipStyled {...props} />
}

export default ChipField
