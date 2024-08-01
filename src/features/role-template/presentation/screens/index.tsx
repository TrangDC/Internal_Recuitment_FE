import { Box } from '@mui/system'
import Settings from 'shared/components/icons/Settings'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { Add } from '@mui/icons-material'
import { columns } from 'features/role-template/shared/constants/columns'
import DeleteRoleTemplateModal from '../screen-sections/deleteRoleTemplateModal'
import SearchInput from 'shared/components/table/components/SearchInput'
import DetailRoleTemplateModal from '../screen-sections/detailRoleTemplateModal'
import Cant from 'features/authorization/presentation/components/Cant'
import CreateRoleTemplateModal from '../screen-sections/createRoleTemplateModal'
import EditRoleTemplateModal from '../screen-sections/editRoleTemplateModal'
import useActionRoleTemplate from 'features/role-template/hooks/table/useActionRoleTemplate'
import useFilterRoleTemplate from 'features/role-template/hooks/table/useFilterRoleTemplate'
import useRoleTemplateTable from 'features/role-template/hooks/table/useRoleTemplateTable'
import useBuildActionsTableRoleTemplate from 'features/role-template/hooks/table/useBuildActionsTableRoleTemplate'

const RoleTemplateList = () => {
  const {
    openEdit,
    handleOpenEdit,
    openCreate,
    rowId,
    openDelete,
    handleOpenDelete,
    setOpenDelete,
    setOpenCreate,
    setOpenEdit,
    handleOpenDetail,
    openDetail,
    setOpenDetail,
  } = useActionRoleTemplate()
  const { useSearchListReturn } = useFilterRoleTemplate()
  const { search, handleSearch, searchRef } = useSearchListReturn
  const { useTableReturn } = useRoleTemplateTable({
    search,
  })
  const { actions } = useBuildActionsTableRoleTemplate({
    handleOpenDelete,
    handleOpenDetail,
    handleOpenEdit,
  })
  const { columnTable } = useBuildColumnTable({
    actions: actions,
    columns,
    handleOpenDetail,
  })
  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Settings} textLable={'Role template'} />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <SearchInput
            ref={searchRef}
            onEnter={handleSearch}
            placeholder="Search by Role's Name"
            onSearch={handleSearch}
          />
          <Cant
            module="ROLES_TEMPLATE"
            checkBy={{
              compare: 'hasAny',
              permissions: ['CREATE.everything'],
            }}
          >
            <ButtonAdd
              Icon={Add}
              textLable={'Add role template'}
              onClick={() => setOpenCreate(true)}
            />
          </Cant>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={columnTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
        {openCreate && (
          <CreateRoleTemplateModal open={openCreate} setOpen={setOpenCreate} />
        )}
        {openEdit && (
          <EditRoleTemplateModal
            open={openEdit}
            setOpen={setOpenEdit}
            id={rowId.current}
          />
        )}
        {openDelete && (
          <DeleteRoleTemplateModal
            open={openDelete}
            setOpen={setOpenDelete}
            id={rowId.current}
          />
        )}
        {openDetail && (
          <DetailRoleTemplateModal
            open={openDetail}
            setOpen={setOpenDetail}
            id={rowId.current}
            handleOpenEdit={handleOpenEdit}
          />
        )}
      </BoxWrapperOuterContainer>
    </Box>
  )
}

export default RoleTemplateList
