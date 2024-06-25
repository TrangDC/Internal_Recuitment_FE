import { Box } from '@mui/system'
import EditIcon from 'shared/components/icons/EditIcon'
import IconScreen from 'shared/components/utils/IconScreen'
import HiringTeam from 'shared/components/icons/HiringTeams'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import { DivHeaderWrapper } from 'features/candidates/presentation/providers/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import useActionTable from 'features/hiring/hooks/useActionTable'
import useFilterHiringTeams from 'features/hiring/hooks/useFilterHiringTeams'
import EditHiringModal from '../screen-sections/EditHiringModal'
import useHiringTable from 'features/hiring/hooks/useHiringTable'
import { Hiring } from 'features/hiring/domain/interfaces'
import { columns } from 'features/hiring/shared/constants/columns'

const HiringList = () => {
  const { handleOpenEdit, openEdit, rowId, rowData, setOpenEdit } =
    useActionTable()
  const { useSearchListReturn } = useFilterHiringTeams()
  const { handleSearch, search, searchRef } = useSearchListReturn
  const { useTableReturn } = useHiringTable({
    search,
  })
  const { colummTable } = useBuildColumnTable<Hiring>({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
    ],
    columns,
  })
  return (
    <Box pt={2} pb={4}>
      <IconScreen Icon={HiringTeam} textLable={'Hiring Team'} />
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by name, email"
              onSearch={handleSearch}
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
