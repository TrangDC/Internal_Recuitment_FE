import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import { columns } from '../../shared/constants/columns'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  CreateEmailModal,
  DeleteEmailModal,
  EditTeamModal,
  DetailEmailModal,
} from '../page-sections'
import { useBuildColumnTable, CustomTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import useFilterEmail from 'features/email/hooks/useFilterEmail'
import useActionTable from 'features/email/hooks/useActionTable'
import useEmailTable from 'features/email/hooks/useEmailTable'
import Mail from 'shared/components/icons/Mail'
import useBuildActionsTableEmail from 'features/email/hooks/useBuildActionsTableEmail'
import Cant from 'features/authorization/presentation/components/Cant'

const EmailList = () => {
  const useActionTableReturn = useActionTable()
  const {
    openCreate,
    openDelete,
    setOpenCreate,
    openDetail,
    setOpenDetail,
    handleOpenEdit,
    openEdit,
    rowId,
    setOpenEdit,
    setOpenDelete,
  } = useActionTableReturn

  const { useSearchListReturn } = useFilterEmail()
  const { search, handleSearch, searchRef } = useSearchListReturn

  const { useTableReturn } = useEmailTable({
    orderBy: { field: 'created_at', direction: 'DESC' },
    search,
  })

  const { actions } = useBuildActionsTableEmail(useActionTableReturn)
  const { columnTable } = useBuildColumnTable({
    actions,
    columns,
  })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Mail} textLable={'Email notification setting'} />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <SearchInput
            ref={searchRef}
            onEnter={handleSearch}
            placeholder="Search by Event, Email Subject"
            onSearch={handleSearch}
          />
          <Cant
            module={'EMAIL_TEMPLATE'}
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
              textLable={'Add a new email'}
              onClick={() => setOpenCreate(true)}
            />
          </Cant>
        </HeadingWrapper>
        <Box>
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateEmailModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDetail && (
        <DetailEmailModal
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          handleOpenEdit={handleOpenEdit}
        />
      )}
      {openDelete && (
        <DeleteEmailModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default EmailList
