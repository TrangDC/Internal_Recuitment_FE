import { Box, Button, Divider, styled } from '@mui/material'
import { Span } from 'shared/components/Typography'

// styled components
export const StyleSpanName = styled('span')`
  font-size: 13px;
  font-weight: 500;
  line-height: 15.85px;
`

export const ButtonHeader = styled(Button)`
  margin-left: auto;
`

export const ButtonImport = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  border: `1px solid ${theme.palette.primary[300]}`,
  backgroundColor: theme.palette.primary[50],
  fontSize: '13px',
  fontWeight: 600,
  color: theme.palette.primary[600],

  '& span': {
    margin: 0,
    marginTop: '5px',
  }
}))

export const DivHeaderWrapper = styled('div')`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;
`

export const DivFilter = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
`

export const StyleDivider = styled(Divider)`
  margin: 0 40px;
`

export const DivContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const DivWrapperProcess = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}))

export const SpanGenaration = styled(Span)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.primary[800],
  lineHeight: '18.29px',
}))

export const DivField = styled(Box)(({ theme }) => ({  
    '& span': {
      width: '12px',
      fontWeight: 500,
      color: theme.palette.grey[500],
      lineHeight: '14.63px',
    },
  
    '& p': {
      color: theme.palette.grey[900],
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '15.85px',
    },
  }))
