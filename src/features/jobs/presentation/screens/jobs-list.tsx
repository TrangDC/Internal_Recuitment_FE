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
import useJobTable from '../providers/hooks/useJobTable'
import CreateJobModal from '../page-sections/CreateJobModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditJobModal from '../page-sections/EditJobModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import { ButtonHeader, DivFilter, DivHeaderWrapper } from '../providers/styles'
import ButtonFilter from 'shared/components/input-fields/ButtonFilter'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteJobModal from '../page-sections/DeleteJobModal'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { KeyboardEventHandler } from 'react'
import { baseInstance } from 'shared/interfaces'
import { STATUS_DATA } from '../providers/constants'
import { getValueOfObj, transformListItem } from 'shared/utils/utils'
import useSelectTeam from 'shared/hooks/graphql/useSelecTeam'
import { Team } from 'features/teams/domain/interfaces'

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
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable()

  const navigate = useNavigate()

  const { useTableReturn } = useJobTable()
  const { handleFreeWord, handleFilter } = useTableReturn

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
        Icon: <SearchIconSmall />,
      },
      {
        id: 'delete',
        onClick: (id, rowData) => {
          handleOpenDelete(id)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    ],
    columns,
  })

  const { teams } = useSelectTeam();
  
  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

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
          <ButtonFilter<Team> listData={teams} inputLabel="Team" 
           callbackChange={(obj) => {
            handleFilter('team_ids', transformListItem(obj))
          }}
          />
          <ButtonFilter<baseInstance>
            listData={STATUS_DATA}
            inputLabel="Status"
            multiple={false}
            callbackChange={(obj) => {
              handleFilter('status', getValueOfObj({ key: 'value', obj }))
            }}
          />
        </DivFilter>
        <DivHeaderWrapper>
          <CustomTextField
            id="outlined-basic"
            label="Enter Jobs Title"
            variant="outlined"
            size="small"
            sx={{ width: '400px' }}
            onKeyUp={handleFreeWorld}
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

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default JobsList
