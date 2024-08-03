import { useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getKeyName } from '../../utils/utils'
import ListCheckBoxDetail from './ListCheckBoxDetail'
import useGetCountChecked from '../../hooks/useGetCountChecked'
import FlexBox from 'shared/components/flexbox/FlexBox'

function HiringTeamPermissionGroupDetail({
  roleTemplate,
}: PermissionGroupProps) {
  const { watch } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.HIRING_TEAMS?.CREATE
  const editAction = roleTemplate?.HIRING_TEAMS?.EDIT
  const deleteAction = roleTemplate?.HIRING_TEAMS?.DELETE
  const viewAction = roleTemplate?.HIRING_TEAMS?.VIEW

  const viewData = watch(getKeyName(viewAction.id))
  const editData = watch(getKeyName(editAction.id))
  const createData = watch(getKeyName(createAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const state = [createData, viewData, editData, deleteData]

  const countChecked = useGetCountChecked(state)

  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={
        <FlexBox justifyContent={'center'} gap={1}>
          <Text13md color={'grey.900'}>Hiring teams</Text13md>
          <Tiny12md color={'text.500'}>
            {countChecked}/{state.length}
          </Tiny12md>
        </FlexBox>
      }
    >
      <CollapseGroup.CollapseHeader
        sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}
      >
        <CollapseGroup.CollapseHeaderColumn>
          Name
        </CollapseGroup.CollapseHeaderColumn>
        <CollapseGroup.CollapseHeaderColumn align="left">
          Owned Only
        </CollapseGroup.CollapseHeaderColumn>
        <CollapseGroup.CollapseHeaderColumn align="left">
          Team Only
        </CollapseGroup.CollapseHeaderColumn>
        <CollapseGroup.CollapseHeaderColumn align="left">
          Everything
        </CollapseGroup.CollapseHeaderColumn>
      </CollapseGroup.CollapseHeader>
      <CollapseGroup.CollapseBody>
        <ListCheckBoxDetail customPermission={viewAction} value={viewData} />
        <ListCheckBoxDetail
          customPermission={createAction}
          value={createData}
        />
        <ListCheckBoxDetail customPermission={editAction} value={editData} />
        <ListCheckBoxDetail
          hiddenBorder
          customPermission={deleteAction}
          value={deleteData}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default HiringTeamPermissionGroupDetail
