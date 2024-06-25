import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../providers/constants/columns'
import useCandidateTable from '../../providers/hooks/useSkillTable'
import useActionTable from '../../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CreateSkill, DeleteSkill, EditSkill } from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import DetailSkillModal from '../DetailSkill'
import useFilterSkills from '../../providers/hooks/useFilterSkills'
import SearchInput from 'shared/components/table/components/SearchInput'

const Skill = () => {
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
  } = useActionTable<Candidate>()
  const { useSearchListReturn } = useFilterSkills()
  const { handleSearch, search, searchRef } = useSearchListReturn
  const { useTableReturn } = useCandidateTable({
    search,
  })
  const translation = useTextTranslation()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id) => {
          handleOpenDetail(id)
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
        onClick: (id, rowData) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    ],
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
            <FlexBox gap={'10px'}>
              <ButtonAdd
                Icon={Add}
                textLable={'Add a new skill'}
                onClick={() => setOpenCreate(true)}
              />
            </FlexBox>
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

export default Skill
