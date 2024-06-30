import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../providers/constants/columns'
import useSkillTypeTable from '../../providers/hooks/useSkillTypeTable'
import useActionTable from '../../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CreateSkillType, DeleteSkillType, EditSkillType } from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useFilterSkillType from '../../providers/hooks/useFilterSkillType'
import SearchInput from 'shared/components/table/components/SearchInput'
import IconScreen from 'shared/components/utils/IconScreen'
import SkillIcon from 'shared/components/icons/SkillIcon'

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
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconScreen Icon={SkillIcon} textLable="Skill type management" />
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
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
      </Box>
    </Box>
  )
}

export default SkillType
