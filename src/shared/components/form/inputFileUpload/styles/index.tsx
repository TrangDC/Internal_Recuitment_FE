import { Box, styled } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'

export const InputFileContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed #88CDFF',
  cursor: 'pointer',
  height: '100%',
  padding: '5px',
  textAlign: 'center',
  borderRadius: '8px',
  minHeight: '88px',
  marginTop: '10px',
}))

export const InputFileWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
}))

export const ListFile = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  flexDirection: 'column',
  gap: '10px',
}))

export const FlexBoxContainer = styled(FlexBox)(({ theme }) => ({
  height: '100%',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '12px 16px 16px 16px',
}))

export const TextWrapper = styled(FlexBox)(({ theme }) => ({
  justifyContent: 'center',
  gap: '4px',
  alignItems: 'center',
  flexWrap: 'wrap',

  '& p': {
    fontSize: '13px',
    fontWeight: 500,
    color: theme.palette.grey[600],
  },

  '& span': {
    fontSize: '13px',
    fontWeight: 600,
    color: '#2499EF',
  },
}))

export const ItemFile = styled(FlexBox)(({ theme }) => ({
  width: '100%',
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
