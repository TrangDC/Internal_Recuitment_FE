import { Button, Divider, styled } from '@mui/material'

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
