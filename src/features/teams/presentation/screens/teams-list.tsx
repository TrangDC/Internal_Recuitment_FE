import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import { columns } from '../providers/constants/columns'
import useTeamTable from '../providers/hooks/useTeamTable'
import useActionTable from '../providers/hooks/useActionTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'
import { useNavigate } from 'react-router-dom'
import TeamIcon from 'shared/components/icons/Team'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  CreateTeamModal,
  DeleteTeamModal,
  EditTeamModal,
} from '../page-sections'
import { useBuildColumnTable, CustomTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import useFilterTeams from '../providers/hooks/useFilterTeams'

const TeamList = () => {
  const {
    openCreate,
    openDelete,
    setOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    openEdit,
    rowId,
    setOpenEdit,
    setOpenDelete,
  } = useActionTable()

  const { useSearchListReturn } = useFilterTeams()
  const { search, handleSearch, searchRef } = useSearchListReturn

  const { useTableReturn } = useTeamTable({
    orderBy: { field: 'newest_applied', direction: 'DESC' },
    search,
  })
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
        onClick: (id) => {
          handleOpenEdit(id)
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
      },
    ],
    columns,
  })

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
          <SearchInput
            ref={searchRef}
            onEnter={handleSearch}
            placeholder="Search by Team's name"
            onSearch={handleSearch}
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
