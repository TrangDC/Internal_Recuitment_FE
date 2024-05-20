import { Button, ButtonProps, styled } from '@mui/material'
import { FC } from 'react'

const ButtonStyled = styled(Button)<ButtonProps>(() => ({
  minWidth: 'auto',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  lineHeight: '15.85px',
  fontSize: '13px',
  fontWeight: '600',
  gap: '10px',
  whiteSpace: 'nowrap',
  borderRadius: '4px',
  backgroundColor: '#2499EF',
  '.MuiButton-startIcon': {
    marginRight: '0px',
    fontSize: '15px !important',
    '.MuiSvgIcon-root': {
      fontSize: '15px',
    },
  },
  '&.MuiButton-outlined': {
    backgroundColor: '#F1F9FF',
    border: '1px solid #88CDFF',
    color: '#1F84EB',
  },
  '&.Mui-disabled': {
    backgroundColor: '#babfc5',
    border: '1px solid #BABFC5',
    color: '#ffffff',
  },
}))

const AppButton: FC<ButtonProps> = (props) => {
  return <ButtonStyled {...props}></ButtonStyled>
}

export default AppButton
