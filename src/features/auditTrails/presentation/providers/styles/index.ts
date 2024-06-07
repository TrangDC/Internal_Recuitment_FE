import { Box, Divider, styled } from '@mui/material'
import { Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import FlexRowAlign from 'shared/components/flexbox/FlexRowAlign'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'

export const DateFieldContainer = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  gap: '16px',
  flexDirection: 'column',
  minHeight: '76px',
  position: 'relative',
  overflow: 'hidden',
}))

export const DateFieldHeader = styled(FlexBox)(({ theme }) => ({
  gap: '12px',
}))

export const DateFieldIcon = styled(FlexRowAlign)(({ theme }) => ({
  width: '36px',
  height: '36px',
  backgroundColor: '#CADFF1',
  borderRadius: '99px',

  '& svg': {
    width: '12px',
  },
}))

export const DateFieldTime = styled(Box)(({ theme }) => ({
  '& p': {
    fontSize: '12px',
    lineHeight: '14.63px',
    fontWeight: 500,
    color: '#4D607A',
  },

  '& span': {
    fontSize: '13px',
    lineHeight: '15.85px',
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
}))

export const DateFieldBody = styled(FlexBox)(({ theme }) => ({
  gap: '12px',
  marginLeft: '45px',
  marginTop: '5px',
}))

export const DateFieldInformation = styled(Box)(({ theme }) => ({}))

export const StyleChip = styled(ChipFieldStatus)(({ theme }) => ({
  '& span': {
    color: 'white',
  },
}))

export const DateFieldDivison = styled(FlexBox)(({ theme }) => ({
  alignItems: 'center',
  gap: '8px',

  '& svg': {
    fontSize: '13px',
    color: theme.palette.primary[700],
  },
}))

export const StyleDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.text.secondary,
  position: 'absolute',
  width: '1px',
  height: '100%',
  top: '45px',
  left: '16px',
}))

export const HistoryWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '13px 16px 24px',
}))

export const FormWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const LogsWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
}))

export const FieldRecord = styled(FlexBox)(({ theme }) => ({
 gap: '8px',
 alignItems: 'center',
 color: '#002743',
}))

export const FieldOld = styled(Tiny)(({ theme }) => ({
  color: '#82868C',
  lineHeight: '15.85px'
 }))