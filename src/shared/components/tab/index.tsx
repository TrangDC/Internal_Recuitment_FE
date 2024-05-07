import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, styled } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from '../flexbox/FlexBetween'

//  styled components
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
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
  backgroundColor: theme.palette.primary.light,
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
  minHeight: '40px',

  '& .MuiTabs-flexContainer': {
    height: '40px'
  }
}))

interface renderItem {
  label: string
  Component: React.FC
}

interface TabProps {
  renderItem: renderItem[]
}

const TabCustomize = ({ renderItem }: TabProps) => {
  const [value, setValue] = useState<string>('0')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <TabListWrapper onChange={handleChange}>
          {renderItem.map((item, index) => {
            return (
              <TabWrapper
                key={index}
                label={item.label}
                value={index.toString()}
              />
            )
          })}
        </TabListWrapper>
      </Box>
      {renderItem.map((item, index) => {
        const { Component } = item
        return (
          <TabPanel value={index.toString()} key={index}>
            <HeadingWrapper>
              <Component />
            </HeadingWrapper>
          </TabPanel>
        )
      })}
    </TabContext>
  )
}

export default TabCustomize
