import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import {
  CreateSkillType,
  EditSkillType,
  DeleteSkillType,
} from '../page-sections'
import { columns } from '../providers/constants/columns'
import useFilterSkillType from '../providers/hooks/useFilterSkillType'
import useSkillTypeTable from '../providers/hooks/useSkillTypeTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../providers/styles'
import useSkillTypeListPermissionActionTable from 'features/skillType/permission/useSkillTypeListPermissionActionTable'
import useActionTable from '../providers/hooks/useActionTable'
import { SkillType } from 'features/skillType/domain/interfaces'
import Cant from 'features/authorization/presentation/components/Cant'

const SkillTypeList = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    rowId,
    setOpenEdit,
  } = useActionTable<SkillType>()

  const { useSearchListReturn } = useFilterSkillType()
  const { handleSearch, search, searchRef } = useSearchListReturn

  const { useTableReturn } = useSkillTypeTable({
    search,
  })
  const { actions } = useSkillTypeListPermissionActionTable({
    handleOpenDelete,
    handleOpenEdit,
  })
  const { columnTable } = useBuildColumnTable({
    actions: actions,
    columns,
  })

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by skill type name"
              onSearch={handleSearch}
            />
            <Cant
              module="SKILL_TYPES"
              checkBy={{
                compare: 'hasAny',
                permissions: ['CREATE.everything'],
              }}
            >
              <FlexBox gap={'10px'}>
                <ButtonAdd
                  Icon={Add}
                  textLable={'Add a new skill type'}
                  onClick={() => setOpenCreate(true)}
                />
              </FlexBox>
            </Cant>
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={columnTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateSkillType open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditSkillType
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDelete && (
        <DeleteSkillType
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </DivContainerWrapper>
  )
}

export default SkillTypeList
