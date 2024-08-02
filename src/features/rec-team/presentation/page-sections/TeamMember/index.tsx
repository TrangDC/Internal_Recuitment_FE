import FlexBox from 'shared/components/flexbox/FlexBox'
import { columns_user } from '../../../shared/constants/columns'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import {
  BoxCircle,
  BtnPrimary,
  DivWrapperProcess,
  SpanGeneration,
  WrapperBox,
} from 'shared/styles'
import { Span } from 'shared/components/Typography'
import { TinyText } from 'shared/components/form/styles'
import useActionTable from 'features/user/hooks/table/useActionTable'
import useBuildActionsTableUser from 'features/user/hooks/table/useBuildActionsTableUser'
import User from 'shared/schema/database/user'
import useUserTable from 'features/user/hooks/table/useUserTable'
import EditUserModal from 'features/user/presentation/screen-sections/EditUserModal'
import DetailUserModal from 'features/user/presentation/screen-sections/DetaiUserModal'

const TeamMember = () => {
  const { id } = useParams()
  const { useTableReturn } = useUserTable({
    filters: {
      rec_team_ids: [id]
    },
  })
  const { totalRecord } = useTableReturn
  const navigate = useNavigate()

  const {
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
    handleOpenDetail,
    openDetail,
    setOpenDetail,
  } = useActionTable()

  const { actions } = useBuildActionsTableUser({
    handleOpenEdit,
    handleOpenDetail,
  })

  const { columnTable } = useBuildColumnTable<User>({
    actions: actions,
    columns: columns_user,
    handleOpenDetail,
  })

  return (
    <DivWrapperProcess>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <FlexBox gap={1.25}>
          <SpanGeneration sx={{ fontWeight: 500 }}>
            Team's member
          </SpanGeneration>
          <BoxCircle>
            <TinyText> {totalRecord}</TinyText>
          </BoxCircle>
        </FlexBox>
        <FlexBox gap={1.25} flexWrap={'wrap'}>
          <BtnPrimary onClick={() => navigate('/dashboard/users')}>
            <Span>View all</Span>
          </BtnPrimary>
        </FlexBox>
      </FlexBox>
      <WrapperBox>
        {useTableReturn && (
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        )}
      </WrapperBox>

      {openEdit && (
        <EditUserModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
      {openDetail && (
        <DetailUserModal
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          rowData={rowData.current}
          handleOpenEdit={handleOpenEdit}
        />
      )}
    </DivWrapperProcess>
  )
}

export default TeamMember
