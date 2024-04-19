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
