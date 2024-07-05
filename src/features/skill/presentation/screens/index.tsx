import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../providers/constants/columns'
import useSkillTypeTable from '../providers/hooks/useSkillTable'
import useActionTable from '../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../providers/styles'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CreateSkill, DeleteSkill, EditSkill } from '../page-sections'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useFilterSkills from '../providers/hooks/useFilterSkills'
import SearchInput from 'shared/components/table/components/SearchInput'
import Cant from 'features/authorization/presentation/components/Cant'
import useSkillListPermissionActionTable from 'features/skill/permission/useSkillListPermissionActionTable'
import { Skill } from 'features/skill/domain/interfaces'
import DetailSkillModal from '../page-sections/DetailSkill'

const SkillList = () => {
  const {
    openCreate,
    openDetail,
    setOpenDetail,
    setOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    rowId,
    setOpenEdit,
  } = useActionTable<Skill>()
  const { useSearchListReturn } = useFilterSkills()
  const { handleSearch, search, searchRef } = useSearchListReturn
  const { useTableReturn } = useSkillTypeTable({
    search,
  })
  const { actions } = useSkillListPermissionActionTable({
    handleOpenDelete,
    handleOpenDetail,
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
              placeholder="Search by skill name"
              onSearch={handleSearch}
            />
            <Cant
              module="SKILLS"
              checkBy={{
                compare: 'hasAny',
                permissions: ['CREATE.everything'],
              }}
            >
              <FlexBox gap={'10px'}>
                <ButtonAdd
                  Icon={Add}
                  textLable={'Add a new skill'}
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

      {openCreate && <CreateSkill open={openCreate} setOpen={setOpenCreate} />}
      {openEdit && (
        <EditSkill open={openEdit} setOpen={setOpenEdit} id={rowId.current} />
      )}
      {openDelete && (
        <DeleteSkill
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
      {openDetail && (
        <DetailSkillModal
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          handleOpenEdit={handleOpenEdit}
        />
      )}
    </DivContainerWrapper>
  )
}

export default SkillList
