import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
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
import { ButtonHeader, DivFilter, DivHeaderWrapper, HeadingWrapper } from '../providers/styles'
import ButtonFilter from 'shared/components/input-fields/ButtonFilter'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteJobModal from '../page-sections/DeleteJobModal'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { KeyboardEventHandler } from 'react'
import { baseInstance } from 'shared/interfaces'
import { STATUS_DATA } from '../providers/constants'
import { convertEmptyToNull, getValueOfObj, transformListItem } from 'shared/utils/utils'
import useSelectTeam from 'shared/hooks/graphql/useSelecTeam'
import { Team } from 'features/teams/domain/interfaces'
import useTextTranslation from 'shared/constants/text'

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
  const translation = useTextTranslation()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'detail',
        onClick: (id, rowData) => {
          navigate(`/dashboard/job-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'delete',
        onClick: (id, rowData) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    ],
    columns,
  })

  const { teams } = useSelectTeam()

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
          <H5>{translation.MODLUE_JOBS.jobs}</H5>
        </FlexBox>
      </Box>
      <HeadingWrapper>
        <DivFilter>
          <ButtonFilter<Team>
            listData={teams}
            inputLabel={translation.MODLUE_TEAMS.teams}
            callbackChange={(obj) => {
              handleFilter('team_ids', convertEmptyToNull(transformListItem(obj)))
            }}
          />
          <ButtonFilter<baseInstance>
            listData={STATUS_DATA}
            inputLabel={translation.COMMON.status}
            multiple={false}
            callbackChange={(obj) => {
              handleFilter('status', getValueOfObj({ key: 'value', obj }))
            }}
          />
        </DivFilter>
        <DivHeaderWrapper>
          <CustomTextField
            id="outlined-basic"
            label={translation.MODLUE_JOBS.input_job_title}
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
            {translation.MODLUE_JOBS.add_a_new_job}
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
