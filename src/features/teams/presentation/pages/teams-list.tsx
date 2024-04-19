import {
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import FlexBetween from 'shared/components/flexbox/FlexBetween'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5 } from 'shared/components/Typography'
import Add from 'shared/components/icons/Add'
import ShoppingBasket from 'shared/components/icons/ShoppingBasket'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useTeamTable, { mockApiGetTeams } from '../providers/hooks/useTeamTable'
import CreateTeamModal from '../providers/page-sections/CreateTeamModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import Accounts from 'shared/components/icons/Accounts'
import useActionTable from '../providers/hooks/useActionTable'
import EditTeamModal from '../providers/page-sections/EditTeamModal'
import DetailTeamModal from '../providers/page-sections/DetailTeamModal'
import { useEffect, useState } from 'react'
import { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'

//  styled components
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 8,
  flexWrap: 'wrap',
  backgroundColor: '#ffffff',
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
}))

const TeamList = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenDetail,
    handleOpenEdit,
    openDetail,
    openEdit,
    rowId,
    rowData,
    setOpenDetail,
    setOpenEdit,
  } = useActionTable()
  // const { useTableReturn } = useTeamTable()
  const [useTableReturn, setUseTableReturn] = useState<IuseCustomTableReturn>()
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetTeams())
    }).then((response: any) => {
      setUseTableReturn(response)
    })
  }, [])

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <Accounts />,
      },
      {
        id: 'detail',
        onClick: (id, rowData) => {
          handleOpenDetail(id, rowData)
        },
        title: 'Detail',
        Icon: <Accounts />,
      },
    ],
    columns,
  })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <ShoppingBasket sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>Teams</H5>
        </FlexBox>
      </Box>

      <HeadingWrapper>
        <CustomTextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
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
          Add team
        </Button>
      </HeadingWrapper>
      <Box>
        {useTableReturn && (
          <CustomTable columns={colummTable} useTableReturn={useTableReturn} />
        )}
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
    </Box>
  )
}

export default TeamList
