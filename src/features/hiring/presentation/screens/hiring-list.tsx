import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useTeamTable from '../providers/hooks/useHiringTable'
import CreateHiringModal from '../page-sections/CreateHiringModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditHiringModal from '../page-sections/EditHiringModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import EditIcon from 'shared/components/icons/EditIcon'
import IconScreen from 'shared/components/utils/IconScreen'
import HiringTeam from 'shared/components/icons/HiringTeams'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  DivFilter,
  DivHeaderWrapper,
} from 'features/candidates/presentation/providers/styles'
import { BaseRecord, baseInstance } from 'shared/interfaces'
import ChangeStatusModal from '../page-sections/ChangeStatusModal'
import { transformListItem } from 'shared/utils/utils'
import { KeyboardEventHandler, useState } from 'react'
import ButtonFieldFilter from 'shared/components/input-fields/ButtonFieldFilter'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'

const HiringList = () => {
  const {
    openCreate,
    setOpenCreate,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable()
  const { useTableReturn } = useTeamTable()
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
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: 'Change status',
        Icon: <EditIcon />,
      },
    ],
    columns,
  })
  const [teams, setTeams] = useState<BaseRecord[]>([])

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

  return (
    <Box pt={2} pb={4}>
      <IconScreen Icon={HiringTeam} textLable={'Hiring Team'} />
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <DivFilter>
            <ButtonFieldFilter<baseInstance>
              inputLabel={'Teams'}
              listSelected={teams}
              setListSelected={setTeams}
              showLabel={'name'}
              node={
                <TeamsAutoComplete
                  name="team"
                  multiple={true}
                  value={transformListItem(teams, 'id')}
                  onCustomChange={setTeams}
                  onChange={() => {}}
                  open={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              }
            />
          </DivFilter>
          <DivHeaderWrapper>
            <CustomTextField
              id="outlined-basic"
              label={'Search by name, email'}
              variant="outlined"
              size="small"
              sx={{ width: '400px', fontSize: '13px' }}
              onKeyUp={handleFreeWorld}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={colummTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>
      {openCreate && (
        <CreateHiringModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditHiringModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
      {openDelete && (
        <ChangeStatusModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default HiringList
