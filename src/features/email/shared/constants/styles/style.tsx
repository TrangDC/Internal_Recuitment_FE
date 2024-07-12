import { Box, styled } from '@mui/material'
import { Text13md } from 'shared/components/Typography'

export const BoxWrapperContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px'
}))


export const BoxWrapperEditor = styled(Box)(({ theme }) => ({
  '& .editor__wrapper': {
    padding: 0
  },

  '& .editor__wrapper .tox-tinymce': {
    height: '40px !important'
  },

  '& .editor__label': {
    top: '10px'
  }
}))

export const TextWrapper = styled(Text13md)(({ theme }) => ({
  color: 'grey.900',
  fontWeight: 600,
  
  '& ul': {
    paddingLeft: '25px'
  }
}))