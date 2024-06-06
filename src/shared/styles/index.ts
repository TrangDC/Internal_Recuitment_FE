import { Box, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TinyText } from 'shared/components/form/styles'

export const BoxWrapperOuterContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 2px 4px 0px rgba(96, 97, 112, 0.16)',
  overflow: 'hidden',
  marginTop: '20px',
}))

export const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 8,
  flexWrap: 'wrap',
  backgroundColor: theme.palette.background.paper,
  padding: '12px',
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  borderTopRightRadius: '8px',
  borderTopLeftRadius: '8px',
  [theme.breakpoints.down(453)]: {
    '& .MuiButton-root': { order: 2 },
    '& .MuiTabs-root': {
      order: 3,
      width: '100%',
      '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
    },
  },

  '& .MuiTextField-root': {
    marginTop: 0,
  },
}))

export const BtnPrimary = styled(FlexBox)(({ theme }) => ({
  marginLeft: 'auto',
  border: `1px solid ${theme.palette.primary[300]}`,
  backgroundColor: theme.palette.primary[50],
  fontSize: '13px',
  fontWeight: 600,
  color: theme.palette.primary[600],
  height: '40px',
  borderRadius: '4px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 20px 15px',
  gap: '10px',
  cursor: 'pointer',

  '& span': {
    margin: 0,
    marginTop: '5px',
  },

  '&.disabled': {
    cursor: 'not-allowed',
    backgroundColor: '#babfc5',
    border:  `1px solid #BABFC5`,
    color: '#ffffff'
  }
}))


export const BoxCircle = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  minHeight: '20px',
  background: '#1F84EB',
  borderRadius: '20px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  justifyContent: 'center',
}))

export const StyleTinyText = styled(TinyText)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 500,
}))

export const LinkText = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  cursor: 'pointer',
  color: 'rgb(31, 132, 235)'
}))

