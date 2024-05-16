import { Box, styled } from '@mui/material'
import FlexBetween from 'shared/components/flexbox/FlexBetween'

export const BoxWrapperOuterContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 2px 4px 0px rgba(96, 97, 112, 0.16)',
}))

export const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
    gap: 8,
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
    padding: '12px',
    borderWidth: '0px 0px 1px 0px',
    borderStyle: 'solid',
    borderColor: '#E3E6EB',
    marginTop: '20px',
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
