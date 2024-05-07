import {
  IconButton,
  InputAdornment,
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
import { mockApiGetCandiates } from '../providers/hooks/useCandidateTable'
import CreateCandiateModal from '../page-sections/CreateCandidateModal/index'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditCandidateModal from '../page-sections/EditCandidateModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import {
  ButtonHeader,
  ButtonImport,
  DivHeaderWrapper,
} from '../providers/styles'
import Import from 'shared/components/icons/ImportIcon'
import { Candidate } from 'features/candidates/domain/interfaces'
import { useEffect, useState } from 'react'
import EditIcon from 'shared/components/icons/EditIcon'
import EyeIcon from 'shared/components/icons/EyeIcon'
import { useNavigate } from 'react-router-dom'

//  styled components
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 8,
  flexWrap: 'wrap',
  flexDirection: 'column',
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
}))

const JobsList = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable<Candidate>()

  const navigate = useNavigate()

  // const { useTableReturn } = useCandidateTable()
  const [useTableReturn, setUseTableReturn] = useState()
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetCandiates())
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
        Icon: <EditIcon />,
      },
      {
        id: 'detail',
        onClick: (id, rowData) => {
          navigate('/dashboard/candidate-detail')
        },
        title: 'Detail',
        Icon: <EyeIcon />,
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
          <H5>Candidates</H5>
        </FlexBox>
      </Box>
      <HeadingWrapper>
        <DivHeaderWrapper>
          <CustomTextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ width: '400px' }}
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
          <FlexBox gap={'10px'}>
          <ButtonImport
            startIcon={<Import />}
            onClick={() => setOpenCreate(true)}
          >
            Import
          </ButtonImport>
          <ButtonHeader
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenCreate(true)}
          >
            Add new candidate
          </ButtonHeader>
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
      {/* {openCreate && (
        <CreateCandiateModal open={openCreate} setOpen={setOpenCreate} />
      )} 
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )} */}
    </Box>
  )
}

export default JobsList
