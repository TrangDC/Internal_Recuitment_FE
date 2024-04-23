import { Tab, styled } from '@mui/material'
import { Box } from '@mui/system'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import GeneralInformation from '../page-sections/GeneralInformation'
import HistoryLog from '../page-sections/HistoryLog'

//  styled components
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  [theme.breakpoints.down(453)]: {
    '& .MuiButton-root': { order: 2 },
    '& .MuiTabs-root': {
      order: 3,
      width: '100%',
      '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
    },
  },
}))

const TabWrapper = styled(Tab)(({ theme }) => ({
  borderBottom: `1px solid #F1F9FF`,
  margin: 0,
  padding: '0 20px',
  height: '40px',
  backgroundColor: '#F1F9FF',
  boxShadow: 'rgba(96, 97, 112, 0.16) 0px 2px 4px 0px',

  '&.Mui-selected': {
    backgroundColor: 'white',
  },

  '&.Mui-selected .MuiTouchRipple-root': {
    color: theme.palette.primary[600],
    fontWeight: 600,
  },

  '& .MuiTouchRipple-root': {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '14.63px',
    color: theme.palette.grey[500],
  },
}))

const TabListWrapper = styled(TabList)(({ theme }) => ({
  width: 'fit-content',
  alignItems: 'center',
  borderRadius: '4px',
}))

const JobDetail = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>Candidate details</H5>
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabListWrapper
              onChange={handleChange}
            >
              <TabWrapper label="Genaral Information" value="1" />
              <TabWrapper label="History log" value="2" />
            </TabListWrapper>
          </Box>
          <TabPanel value="1">
            <HeadingWrapper>
              <GeneralInformation />
            </HeadingWrapper>
          </TabPanel>
          <TabPanel value="2">
            <HeadingWrapper>
                <HistoryLog />
            </HeadingWrapper>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default JobDetail
