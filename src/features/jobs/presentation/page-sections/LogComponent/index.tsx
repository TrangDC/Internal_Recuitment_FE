import { Box, Divider, styled } from '@mui/material'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import DateIcon from 'shared/components/icons/DateIcon'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlexRowAlign from 'shared/components/flexbox/FlexRowAlign'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus';

const DateFieldContainer = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  gap: '16px',
  flexDirection: 'column'
}))

const DateFieldHeader = styled(FlexBox)(({ theme }) => ({
  gap: '12px',
}))

const DateFieldIcon = styled(FlexRowAlign)(({ theme }) => ({
  width: '36px',
  height: '36px',
  backgroundColor: '#CADFF1',
  borderRadius: '99px',

  '& svg': {
    width: '12px',
  },
}))

const DateFieldTime = styled(Box)(({ theme }) => ({
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

const DateFieldBody = styled(FlexBox)(({ theme }) => ({
  gap: '12px',

  '& hr': {
    minHeight: '24px',
    height: 'auto',
    color: theme.palette.grey[900],
    margin: '0 15px',
  }
}))

const DateFieldInformation = styled(Box)(({ theme }) => ({}))

const StyleChip = styled(ChipFieldStatus)(({ theme }) => ({
  backgroundColor: theme.palette.primary[500],
  
  '& span': {
    color: 'white',
  }
}))

const DateFieldDivison = styled(FlexBox)(({ theme }) => ({
  alignItems: 'center',
  gap: '8px',

  '& svg': {
    fontSize: '13px',
    color: theme.palette.primary[700]
  }
}))

const StyleDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.text.secondary
}))

const LogsComponent = () => {
  return (
        <FlexBox flexDirection={'column'} gap={'16px'}>
          <DateFieldContainer>
            <DateFieldHeader>
              <DateFieldIcon>
                <DateIcon />
              </DateFieldIcon>
              <DateFieldTime>
                <Span>UPDATE 16-08-2023 04:18:07</Span>
                <Tiny>Reason: 8</Tiny>
              </DateFieldTime>
            </DateFieldHeader>
            <DateFieldBody>
              <StyleDivider orientation="vertical"  />
              <DateFieldInformation>
                <FlexBox alignItems={'center'} gap={'8px'}>
                  <Tiny>Job name</Tiny>
                  <StyleChip label="Update" />
                </FlexBox>
                <FlexBox alignItems={'center'} gap={'8px'}>
                  <Span>Team: </Span>
                  <DateFieldDivison>
                    <Tiny>D2</Tiny> <ArrowForwardIcon/> <Tiny>D4</Tiny>
                  </DateFieldDivison>
                </FlexBox>
              </DateFieldInformation>
            </DateFieldBody>
          </DateFieldContainer>

          <DateFieldContainer>
            <DateFieldHeader>
              <DateFieldIcon>
                <DateIcon />
              </DateFieldIcon>
              <DateFieldTime>
                <Span>UPDATE 16-08-2023 04:18:07</Span>
                <Tiny>Reason: 8</Tiny>
              </DateFieldTime>
            </DateFieldHeader>
            <DateFieldBody>
            <StyleDivider orientation="vertical"  />
            </DateFieldBody>
          </DateFieldContainer>

          <DateFieldContainer>
            <DateFieldHeader>
              <DateFieldIcon>
                <DateIcon />
              </DateFieldIcon>
              <DateFieldTime>
                <Span>UPDATE 16-08-2023 04:18:07</Span>
                <Tiny>Reason: 8</Tiny>
              </DateFieldTime>
            </DateFieldHeader>
            <DateFieldBody>
            <StyleDivider orientation="vertical"  />
            </DateFieldBody>
          </DateFieldContainer>
        </FlexBox>
  )
}

export default LogsComponent