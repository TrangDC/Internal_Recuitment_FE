import { Box, styled } from '@mui/material'

export const EditorBoxWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #dadce0',
  padding: '5px',
  position: 'relative',
  borderRadius: '4px',
  transition: '250ms',

  '&.activeEditor': {
    borderColor: '#1a73e8',
  },

  '& .tox-tinymce': {
    border: 'none',
  },

  '& .tox-statusbar': {
    display: 'none !important',
  },

  '& .tox-edit-area': {
    '&::before': {
      border: 'none !important',
      outline: 'none !important',
    },
  },
}))

export const LabelEditor = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  top: '65px',
  left: '15px',
  color: '#80868b',
  transition: ' 250ms',

  '&.activeBox': {
    top: '-10px',
    padding: '0 10px',
    background: 'white',
    color: '#1a73e8',
    fontSize: '12px',
  },

  '&.existValue': {
    top: '-10px',
    padding: '0 10px',
    background: 'white',
    fontSize: '12px',
  },
}))
