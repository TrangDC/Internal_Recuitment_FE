import { Box, Chip, styled } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'

export const ListInterviewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const StyleSpanName = styled('span')`
  font-size: 13px;
  font-weight: 500;
  line-height: 15.85px;
`

export const DivActionHeader = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
}))

export const BoxTitle = styled(Box)(({ theme }) => ({
  '& span': {
    color: theme.palette.primary[800],
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '18.29px',
  },
}))

export const BoxButton = styled(Box)(({ theme }) => ({
  '& button': {
    height: '26px',
    padding: '5px 10px 5px 8px',
    border: `1px solid #88CDFF`,
    borderRadius: '4px',
    backgroundColor: theme.palette.primary[50],
    color: theme.palette.primary[800],
    fontSize: '13px',
    fontWeight: 600,
  },
}))

export const BoxText = styled(Box)(({ theme }) => ({
  padding: '15px',
  border: '1px solid #E3E6EB',
  borderRadius: '4px',
  marginTop: '10px',
}))

export const ChipItem = styled(Chip)(({ theme }) => ({
  height: '24px',
  backgroundColor: theme.palette.primary[50],

  '& span': {
    fontSize: '14px',
    fontWeight: 500,
  },
}))
