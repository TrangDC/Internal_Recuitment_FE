import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import { columns } from '../../shared/constants/columns'
import useTeamTable from '../../hooks/useHiringTable'
import useActionTable from '../../hooks/useActionTable'
import EditHiringModal from '../screen-sections/EditHiringModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import EditIcon from 'shared/components/icons/EditIcon'
import IconScreen from 'shared/components/utils/IconScreen'
import HiringTeam from 'shared/components/icons/HiringTeams'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  DivHeaderWrapper,
} from 'features/candidates/presentation/providers/styles'
import { KeyboardEventHandler, useState } from 'react'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'

const HiringList = () => {
  const {
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable()
  const { useTableReturn } = useTeamTable()
  const { handleFreeWordMultiple } = useTableReturn
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
      // {
      //   id: 'change_status',
      //   onClick: (id) => {
      //     handleOpenDelete(id)
      //   },
      //   title: 'Change status',
      //   Icon: <EditIcon />,
      // },
    ],
    columns,
  })
  const [searchField, setSearchField] = useState('')

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWordMultiple({name: searchField, work_email: searchField})
    }
  }

  return (
    <Box pt={2} pb={4}>
      <IconScreen Icon={HiringTeam} textLable={'Hiring Team'} />
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          {/* <DivFilter>
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
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              }
            />
          </DivFilter> */}
          <DivHeaderWrapper>
            <CustomTextField
              id="outlined-basic"
              label={'Search by name, email'}
              variant="outlined"
              size="small"
              sx={{ width: '400px', fontSize: '13px' }}
              onChange={(e) => setSearchField(e.target.value)}
              onKeyUp={handleFreeWorld}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon
                        sx={{ fontSize: '16px' }}
                        onClick={() => {
                          handleFreeWordMultiple({name: searchField, work_email: searchField})
                        }}
                      />
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
      {openEdit && (
        <EditHiringModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
    </Box>
  )
}

export default HiringList
