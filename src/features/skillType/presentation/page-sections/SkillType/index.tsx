import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../providers/constants/columns'
import useSkillTypeTable from '../../providers/hooks/useSkillTypeTable'
import useActionTable from '../../providers/hooks/useActionTable'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import {
  DivContainerWrapper,
  DivHeaderWrapper,
} from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
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
import { CreateSkillType, DeleteSkillType, EditSkillType} from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'

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

  const navigate = useNavigate()

  const { useTableReturn } = useSkillTypeTable({
    filter: {
      is_black_list: false,
    },
  })
  const { handleFreeWordMultiple} = useTableReturn
  const translation = useTextTranslation()
  const [searchField, setSearchField] = useState('')

  const { colummTable } = useBuildColumnTable({
    actions: [
      // {
      //   id: 'detail',
      //   onClick: (id) => {
      //     navigate(`/dashboard/candidate-detail/${id}`)
      //   },
      //   title: translation.COMMON.detail,
      //   Icon: <SearchIconSmall />,
      // },
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
      handleFreeWordMultiple({name: searchField, phone: searchField, email: searchField})
    }
  }

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <DivHeaderWrapper>
            <CustomTextField
              label="Search by name"
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
                          handleFreeWordMultiple({name: searchField, phone: searchField, email: searchField})
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
                textLable={'Add skill type'}
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
