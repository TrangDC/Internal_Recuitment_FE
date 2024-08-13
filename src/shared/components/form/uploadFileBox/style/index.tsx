import { styled } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'

export const ItemFile = styled(FlexBox)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: '6px 6px 6px 10px',
  border: `1px solid #88CDFF`,
  minHeight: '45px',
  alignItems: 'center',
  gap: '20px',
  backgroundColor: '#F1F9FF',
  borderRadius: '4px',

  '&.error_file': {
    borderColor: '#FF316F',
    backgroundColor: '#fcf4f2',
  },

  '&.error_file .name_file p': {
    color: 'red',
  },

  '&.error_file .name_file span': {
    color: 'red',
  },
}))

export const NameFIle = styled(FlexBox)(({ theme }) => ({
  flexDirection: 'column',

  '& p': {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.grey[600],
  },

  '& span': {
    fontSize: '12px',
    fontWeight: 500,
    color: theme.palette.grey[400],
  },
}))
