import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../providers/constants/columns'
import useSkillTypeTable from '../../providers/hooks/useSkillTypeTable'
import useActionTable from '../../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CreateSkillType, DeleteSkillType, EditSkillType } from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useFilterSkillType from '../../providers/hooks/useFilterSkillType'
import SearchInput from 'shared/components/table/components/SearchInput'

const SkillType = () => {
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
  } = useActionTable<Candidate>()

  const { useSearchListReturn } = useFilterSkillType()
  const { handleSearch, search, searchRef } = useSearchListReturn

  const { useTableReturn } = useSkillTypeTable({
    search,
  })
  const translation = useTextTranslation()
  const { colummTable } = useBuildColumnTable({
    actions: [
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
              placeholder="Search by skill type name"
              onSearch={handleSearch}
            />
            <FlexBox gap={'10px'}>
              <ButtonAdd
                Icon={Add}
                textLable={'Add a new skill type'}
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

export default SkillType
