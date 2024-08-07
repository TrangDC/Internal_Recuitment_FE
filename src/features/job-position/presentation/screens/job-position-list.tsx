import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import { columns } from '../../shared/constants/columns'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  CreateJobPositionModal,
  DeleteJobPositionModal,
  EditJobPositionModal,
} from '../page-sections'
import { useBuildColumnTable, CustomTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import useFilterJobPosition from 'features/job-position/hooks/useFilterJobPosition'
import useActionTable from 'features/job-position/hooks/useActionTable'
import useJobPositionTable from 'features/job-position/hooks/useJobPositionTable'
import Cant from 'features/authorization/presentation/components/Cant'
import useBuildActionsTableJobPosition from 'features/job-position/hooks/useBuildActionsTableJobPosition'
import Jobs from 'shared/components/icons/Jobs'

const JobPositionList = () => {
  const useActionTableReturn = useActionTable()
  const {
    openCreate,
    openDelete,
    setOpenCreate,
    openEdit,
    rowId,
    setOpenEdit,
    setOpenDelete,
  } = useActionTableReturn
  const { useSearchListReturn } = useFilterJobPosition()
  const { search, handleSearch, searchRef } = useSearchListReturn

  const { useTableReturn } = useJobPositionTable({
    search,
  })
  const { actions } = useBuildActionsTableJobPosition(useActionTableReturn)
  const { columnTable } = useBuildColumnTable({
    columns,
    actions: actions,
  })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={Jobs}
          textLabel="Job positions"
        />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <SearchInput
            ref={searchRef}
            onEnter={handleSearch}
            placeholder="Search by Job position name"
            onSearch={handleSearch}
          />
          <Cant
            module={'JOB_POSITION'}
            checkBy={{
              compare: 'hasAny',
              permissions: [
                'CREATE.everything',
                'CREATE.ownedOnly',
                'CREATE.teamOnly',
              ],
            }}
          >
            <ButtonAdd
              Icon={Add}
              textLable="Add a new job position"
              onClick={() => setOpenCreate(true)}
            />
          </Cant>
        </HeadingWrapper>
        <Box>
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateJobPositionModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditJobPositionModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDelete && (
        <DeleteJobPositionModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default JobPositionList
