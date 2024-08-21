import {
  TabContext,
  TabList,
  TabListProps,
  TabPanel,
  TabPanelProps,
} from '@mui/lab'
import { Box, Tab, styled, SxProps } from '@mui/material'
import React, { useMemo, useState } from 'react'
import FlexBetween from '../flexbox/FlexBetween'
import FlexBox from '../flexbox/FlexBox'

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
  // height: '40px',
  backgroundColor: theme.palette.primary[50],
  boxShadow: 'rgba(96, 97, 112, 0.16) 0px 2px 4px 0px',
  fontSize: 12,
  lineHeight: '14.63px',
  fontWeight: 500,

  '&.Mui-selected': {
    backgroundColor: 'white',
    color: theme.palette.primary[600],
    fontWeight: 600,
  },

  '& .MuiTouchRipple-root': {
    lineHeight: '14.63px',
    color: theme.palette.grey[500],
  },
}))

const TabPanelStyle = styled(TabPanel)(({ theme }) => ({
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  borderTopRightRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0px 2px 4px 0px rgba(96, 97, 112, 0.16)',
  height: '100%',
}))

const TabListWrapper = styled(TabList)(({ theme }) => ({
  width: 'fit-content',
  alignItems: 'center',
  borderRadius: '4px',
  // minHeight: '40px',

  '&.vertical .MuiTabs-flexContainer': {
    height: 'auto',

    '& .MuiButtonBase-root': {
      borderRight: '1px solid #E3E6EB',
    },

    '& .MuiTab-root': {
      backgroundColor: 'white',
    },

    '& .Mui-selected ': {
      backgroundColor: '#F1F9FF',
    },
  },

  '&.vertical .MuiTabs-indicator': {
    left: 0,
  },

  '& .MuiTabs-flexContainer': {
    // height: '40px',
  },
}))

export interface RenderItem {
  label: string
  Component: React.FC
}

interface TabProps {
  renderItem: RenderItem[]
  TabListProps?: TabListProps
  tabWrapperSx?: SxProps
  tabPanelSx?: SxProps
  boxSx?: SxProps
}

const TabCustomize = ({
  renderItem,
  TabListProps,
  tabWrapperSx,
  boxSx,
  tabPanelSx,
}: TabProps) => {
  const [value, setValue] = useState<string>('0')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const orientationVertical = useMemo(() => {
    return TabListProps?.orientation === 'vertical'
  }, [])

  return (
    <TabContext value={value}>
      <FlexBox flexDirection={orientationVertical ? 'row' : 'column'}>
        <Box
          sx={{
            width: 'fit-content',
            boxShadow: '0px 2px 4px 0px rgba(96, 97, 112, 0.16)',
            ...boxSx,
          }}
        >
          <TabListWrapper
            onChange={handleChange}
            className={`${orientationVertical && 'vertical'}`}
            {...TabListProps}
          >
            {renderItem.map((item, index) => {
              return (
                <TabWrapper
                  key={index}
                  label={item.label}
                  value={index.toString()}
                  sx={tabWrapperSx}
                />
              )
            })}
          </TabListWrapper>
        </Box>
        <Box sx={{ width: '100%' }}>
          {renderItem.map((item, index) => {
            const { Component } = item
            return (
              <TabPanelStyle
                value={index.toString()}
                key={index}
                sx={tabPanelSx}
              >
                <HeadingWrapper height={'100%'}>
                  <Component />
                </HeadingWrapper>
              </TabPanelStyle>
            )
          })}
        </Box>
      </FlexBox>
    </TabContext>
  )
}

export default TabCustomize
