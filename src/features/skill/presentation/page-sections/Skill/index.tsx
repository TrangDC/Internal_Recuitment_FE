import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../providers/constants/columns'
import useCandidateTable from '../../providers/hooks/useSkillTable'
import useActionTable from '../../providers/hooks/useActionTable'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import {
  DivContainerWrapper,
  DivHeaderWrapper,
} from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import {
  KeyboardEventHandler,
  useState,
} from 'react'
import useTextTranslation from 'shared/constants/text'
import {
  BoxWrapperOuterContainer,
  HeadingWrapper,
} from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { CreateSkill, DeleteSkill, EditSkill} from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import DetailSkillModal from '../DetailSkill'

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

  const { useTableReturn } = useCandidateTable()
  const { handleFreeWordMultiple} = useTableReturn
  const translation = useTextTranslation()

  const [searchField, setSearchField] = useState('')

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

  const handleFreeWorld: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13) {
      handleFreeWordMultiple({name: searchField})
    }
  }

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <DivHeaderWrapper>
            <CustomTextField
              label="Search by skill name"
              variant="outlined"
              size="small"
              sx={{ width: '400px', fontSize: '13px' }}
              onKeyUp={handleFreeWorld}
              onChange={(e) => setSearchField(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon
                        sx={{ fontSize: '16px' }}
                        onClick={() => {
                          handleFreeWordMultiple({name: searchField})
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FlexBox gap={'10px'}>
              <ButtonAdd
                Icon={Add}
                textLable={'Add skill'}
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
        <CreateSkill open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditSkill
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
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
