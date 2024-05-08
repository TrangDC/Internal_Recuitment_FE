import { Button, IconButton, InputAdornment } from '@mui/material'
import { Box, styled } from '@mui/system'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import Add from 'shared/components/icons/Add'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useTeamTable from '../providers/hooks/useTeamTable'
import CreateTeamModal from '../page-sections/CreateTeamModal/index'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditTeamModal from '../page-sections/EditTeamModal/index'
import DetailTeamModal from '../page-sections/DetailTeamModal/index'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteTeamModal from '../page-sections/DeleteTeamModal'
import { KeyboardEventHandler } from 'react'
import useTextTranslation from 'shared/constants/text'
//  styled components
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 8,
  flexWrap: 'wrap',
  backgroundColor: theme.palette.background.paper,
  padding: '12px',
  borderWidth: '0px 0px 1px 0px',
  borderStyle: 'solid',
  borderColor: '#E3E6EB',
  marginTop: '20px',
  [theme.breakpoints.down(453)]: {
    '& .MuiButton-root': { order: 2 },
    '& .MuiTabs-root': {
      order: 3,
      width: '100%',
      '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
    },
  },

  '& .MuiTextField-root': {
    marginTop: 0,
  },
}))

const TeamList = () => {
  const {
    openCreate,
    openDelete,
    setOpenCreate,
    handleOpenDetail,
    handleOpenEdit,
    handleOpenDelete,
    openDetail,
    openEdit,
    rowId,
    rowData,
    setOpenDetail,
    setOpenEdit,
    setOpenDelete,
  } = useActionTable()
  const { useTableReturn } = useTeamTable()
  const { handleFreeWord } = useTableReturn

  const translation = useTextTranslation();

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'detail',
        onClick: (id, rowData) => {
          handleOpenDetail(id, rowData)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    ],
    columns,
  })

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>{translation.MODLUE_TEAMS.teams}</H5>
        </FlexBox>
      </Box>
      <HeadingWrapper>
        <CustomTextField
          id="outlined-basic"
          label={translation.MODLUE_TEAMS.input_team_name}
          variant="outlined"
          size="small"
          onKeyUp={handleFreeWorld}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreate(true)}
        >
          {translation.MODLUE_TEAMS.add_a_new_team}
        </Button>
      </HeadingWrapper>
      <Box>
        <CustomTable columns={colummTable} useTableReturn={useTableReturn} />
      </Box>
      {openCreate && (
        <CreateTeamModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
      {openDetail && (
        <DetailTeamModal
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}

      {openDelete && (
        <DeleteTeamModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default TeamList
