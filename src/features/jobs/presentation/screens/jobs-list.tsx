import { IconButton, InputAdornment } from '@mui/material'
import { Box, styled } from '@mui/system'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import Add from 'shared/components/icons/Add'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import { mockApiGetJobs } from '../providers/hooks/useJobTable'
import CreateJobModal from '../page-sections/CreateJobModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditJobModal from '../page-sections/EditJobModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import { ButtonHeader, DivFilter, DivHeaderWrapper } from '../providers/styles'
import ButtonFilter from 'shared/components/input-fields/ButtonFilter'
import { useEffect, useState } from 'react'
import EditIcon from 'shared/components/icons/EditIcon'
import EyeIcon from 'shared/components/icons/EyeIcon'
import { useNavigate } from 'react-router-dom'

//  styled components
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 8,
  flexWrap: 'wrap',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  padding: '12px',
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  marginTop: '20px',
  [theme.breakpoints.down(453)]: {
    '& .MuiButton-root': { order: 2 },
    '& .MuiTabs-root': {
      order: 3,
      width: '100%',
      '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
    },
  },

  '& .MuiTextField-root': {
    marginTop: 0,
  },
}))

const JobsList = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable()

  const navigate = useNavigate()

  // const { useTableReturn } = useJobTable()
  const [useTableReturn, setUseTableReturn] = useState()
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetJobs())
    }).then((response: any) => {
      setUseTableReturn(response)
    })
  }, [])

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
      {
        id: 'detail',
        onClick: (id, rowData) => {
          navigate('/dashboard/job-detail')
        },
        title: 'Detail',
        Icon: <EyeIcon />,
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

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>Jobs</H5>
        </FlexBox>
      </Box>
      <HeadingWrapper>
        <DivFilter>
          <ButtonFilter<BaseType> listData={team} inputLabel="Team" />
          <ButtonFilter<BaseType>
            listData={statusFilter}
            inputLabel="Status"
            multiple={false}
          />
        </DivFilter>
        <DivHeaderWrapper>
          <CustomTextField
            id="outlined-basic"
            label="Enter Jobs Title"
            variant="outlined"
            size="small"
            sx={{ width: '400px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ButtonHeader
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenCreate(true)}
          >
            Add a new job
          </ButtonHeader>
        </DivHeaderWrapper>
      </HeadingWrapper>
      <Box>
        {useTableReturn && (
          <CustomTable columns={colummTable} useTableReturn={useTableReturn} />
        )}
      </Box>
      {openCreate && (
        <CreateJobModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
    </Box>
  )
}

export default JobsList
