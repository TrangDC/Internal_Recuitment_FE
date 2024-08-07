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
} from '../page-sections'
import { useBuildColumnTable, CustomTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import useFilterEmail from 'features/email/hooks/useFilterEmail'
import useActionTable from 'features/email/hooks/useActionTable'
import useEmailTable from 'features/email/hooks/useEmailTable'
import Mail from 'shared/components/icons/Mail'
import useBuildActionsTableEmail from 'features/email/hooks/useBuildActionsTableEmail'
import Cant from 'features/authorization/presentation/components/Cant'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import EventEmailAutocomplete from 'shared/components/autocomplete/event-email-autocomplete'
import { DivHeaderWrapper } from 'features/candidates/shared/styles'
import TabEmailDetail from '../page-sections/TabDetail'

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

  const { useSearchListReturn, useFilterReturn } = useFilterEmail()
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { search, handleSearch, searchRef } = useSearchListReturn

  const { useTableReturn } = useEmailTable({
    orderBy: { field: 'created_at', direction: 'DESC' },
    search,
    filters: dataFilterWithValue,
  })

  const { actions } = useBuildActionsTableEmail(useActionTableReturn)
  const { columnTable } = useBuildColumnTable({
    actions,
    columns,
  })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Mail} textLabel={'Email notification setting'} />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <FlexBox>
            <ControllerFilter
              control={controlFilter}
              title="Event"
              keyName={'event'}
              Node={({ onFilter, value }) => (
                <EventEmailAutocomplete
                  multiple={false}
                  value={value}
                  onChange={(data) => {
                    onFilter(data)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Event',
                    autoFocus: true,
                  }}
                />
              )}
            />
          </FlexBox>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by Email Subject"
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
          </DivHeaderWrapper>
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
        <TabEmailDetail
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          handleOpenModalEdit={handleOpenEdit}
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
