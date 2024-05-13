import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { ButtonHeader, DivWrapperProcess, SpanGenaration } from '../../providers/styles'
import CustomTable from 'shared/components/table/CustomTable'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import { columnsInterview as columns } from '../../providers/constants/columns'
import { mockApiGetListInterview } from '../../providers/hooks/useInterviewTable'
import { Interview } from 'features/candidates/domain/interfaces'
import useActionTable from '../../providers/hooks/useActionTable'
import CreateInterviewModal from '../CreateInterviewModal'
import EditInterviewModal from '../EditInterviewModal'
import { useEffect, useState } from 'react'
import EyeIcon from 'shared/components/icons/EyeIcon'
import EditIcon from 'shared/components/icons/EditIcon'

const GenaralInformationInterview = () => {
  const {
    openCreate,
    setOpenCreate,
    // handleOpenDetail,
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable<Interview>()

  // const { useTableReturn } = useInterviewTable()
  const [useTableReturn, setUseTableReturn] = useState()
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(mockApiGetListInterview())
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
            // handleOpenDetail(id, rowData)
        },
        title: 'Detail',
        Icon: <EyeIcon />,
      },
    ],
    columns,
  })

  return (
    <DivWrapperProcess>
      <FlexBox alignItems={'center'}>
        <SpanGenaration>All Interview</SpanGenaration>
        <ButtonHeader
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreate(true)}
        >
          Add new interview
        </ButtonHeader>
      </FlexBox>
      <Box>
        {useTableReturn && (
          <CustomTable columns={colummTable} useTableReturn={useTableReturn} />
        )}
      </Box>
      {/* {openCreate && (
        <CreateInterviewModal open={openCreate} setOpen={setOpenCreate} />
      )} 
      {openEdit && (
        <EditInterviewModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )} */}
    </DivWrapperProcess>
  )
}

export default GenaralInformationInterview
