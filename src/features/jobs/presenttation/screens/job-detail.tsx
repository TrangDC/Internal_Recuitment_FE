import { AppBar, IconButton, InputAdornment, Tab, Tabs } from '@mui/material'
import { Box, styled } from '@mui/system'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import Add from 'shared/components/icons/Add'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useTeamTable from '../providers/hooks/useJobTable'
import CreateJobModal from '../page-sections/CreateJobModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import Accounts from 'shared/components/icons/Accounts'
import useActionTable from '../providers/hooks/useActionTable'
import EditJobModal from '../page-sections/EditJobModal'
import DetailJobModal from '../page-sections/DetailJobModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import { ButtonHeader, DivFilter, DivHeaderWrapper } from '../providers/styles'
import ButtonFilter from 'shared/components/input-fields/ButtonFilter'
import { useTheme } from '@emotion/react'
import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import GeneralInformation from '../page-sections/GeneralInformation'

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
  const {
    openCreate,
    setOpenCreate,
    handleOpenDetail,
    handleOpenEdit,
    openDetail,
    openEdit,
    rowId,
    rowData,
    setOpenDetail,
    setOpenEdit,
  } = useActionTable()
  const { useTableReturn } = useTeamTable()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <Accounts />,
      },
      {
        id: 'detail',
        onClick: (id, rowData) => {
          handleOpenDetail(id, rowData)
        },
        title: 'Detail',
        Icon: <Accounts />,
      },
    ],
    columns,
  })

  type BaseType = {
    id: number
    name: string
  }

  const team: BaseType[] = [
    {
      id: 1,
      name: 'DES',
    },
    {
      id: 2,
      name: 'D1',
    },
    {
      id: 3,
      name: 'D2',
    },
    {
      id: 3,
      name: 'D3',
    },
    {
      id: 3,
      name: 'D4',
    },
    {
      id: 3,
      name: 'Sale',
    },
  ]

  const all: BaseType[] = [
    {
      id: 1,
      name: 'Sofware Engineer',
    },
    {
      id: 2,
      name: 'Automation Tester',
    },
    {
      id: 3,
      name: 'Quality Assurence',
    },
    {
      id: 3,
      name: 'AI Engineer',
    },
    {
      id: 3,
      name: 'Senior Frontend',
    },
    {
      id: 3,
      name: 'Junior Devops',
    },
  ]

  const statusFilter: BaseType[] = [
    {
      id: 1,
      name: 'OPEN',
    },
    {
      id: 1,
      name: 'CLOSED',
    },
  ]

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
          <H5>Job details</H5>
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabListWrapper
              onChange={handleChange}
              aria-label="lab API tabs example"
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
            <HeadingWrapper>Item two</HeadingWrapper>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default JobDetail
