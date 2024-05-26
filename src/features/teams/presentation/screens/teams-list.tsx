import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useTeamTable from '../providers/hooks/useTeamTable'
import CreateTeamModal from '../page-sections/CreateTeamModal/index'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditTeamModal from '../page-sections/EditTeamModal/index'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteTeamModal from '../page-sections/DeleteTeamModal'
import { KeyboardEventHandler, useState } from 'react'
import useTextTranslation from 'shared/constants/text'
import { useNavigate } from 'react-router-dom'
import TeamIcon from 'shared/components/icons/Team'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'

const TeamList = () => {
  const {
    openCreate,
    openDelete,
    setOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
    setOpenDelete,
  } = useActionTable()
  const { useTableReturn } = useTeamTable({
    orderBy: { field: 'newest_applied', direction: 'DESC' },
  })
  const { handleFreeWord } = useTableReturn
  const [searchField, setSearchField] = useState('')

  const translation = useTextTranslation()
  const navigate = useNavigate()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/team-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
        disabled: (rowData) => {
          return !rowData.is_able_to_delete;
        }
      },
    ],
    columns,
  })

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={TeamIcon}
          textLable={translation.MODLUE_TEAMS.teams}
        />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <CustomTextField
            id="outlined-basic"
            label={"Search by Team's name"}
            variant="outlined"
            size="small"
            sx={{ width: '400px', fontSize: '13px' }}
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            onKeyUp={handleFreeWorld}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon
                      sx={{ fontSize: '16px' }}
                      onClick={() => {
                        handleFreeWord('name', searchField)
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ButtonAdd
            Icon={Add}
            textLable={translation.MODLUE_TEAMS.add_a_new_team}
            onClick={() => setOpenCreate(true)}
          />
        </HeadingWrapper>
        <Box>
          <CustomTable columns={colummTable} useTableReturn={useTableReturn} />
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateTeamModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
      {openDelete && (
        <DeleteTeamModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default TeamList
