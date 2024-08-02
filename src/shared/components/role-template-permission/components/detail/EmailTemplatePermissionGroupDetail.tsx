import { useEffect, useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getKeyName } from '../../utils/utils'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetCountChecked from '../../hooks/useGetCountChecked'
import ListCheckBoxDetail from './ListCheckBoxDetail'

function EmailTemplatePermissionGroupDetail({
  roleTemplate,
}: PermissionGroupProps) {
  const { watch, setValue } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.EMAIL_TEMPLATE?.CREATE
  const editAction = roleTemplate?.EMAIL_TEMPLATE?.EDIT
  const deleteAction = roleTemplate?.EMAIL_TEMPLATE?.DELETE
  const viewAction = roleTemplate?.EMAIL_TEMPLATE?.VIEW
  const changeStatusAction = roleTemplate?.EMAIL_TEMPLATE?.CHANGE_STATUS

  const viewData = watch(getKeyName(viewAction.id))
  const createData = watch(getKeyName(createAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const editData = watch(getKeyName(editAction.id))
  const changeStatusData = watch(getKeyName(changeStatusAction.id))

  const state = [createData, deleteData, viewData, editData, changeStatusData]
  const disabled = !(
    viewData.for_all ||
    viewData.for_owner ||
    viewData.for_team
  )
  useEffect(() => {
    if (disabled) {
      const data = {
        for_all: false,
        for_owner: false,
        for_team: false,
      }
      setValue(getKeyName(viewAction.id), data)
      setValue(getKeyName(createAction.id), data)
      setValue(getKeyName(editAction.id), data)
      setValue(getKeyName(deleteAction.id), data)
      setValue(getKeyName(changeStatusAction.id), data)
    }
  }, [disabled])

  const countChecked = useGetCountChecked(state)
  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={
        <FlexBox justifyContent={'center'} gap={1}>
          <Text13md color={'grey.900'}>Email notification setting </Text13md>
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
        <ListCheckBoxDetail
          customPermission={changeStatusAction}
          value={changeStatusData}
        />
        <ListCheckBoxDetail customPermission={editAction} value={editData} />
        <ListCheckBoxDetail
          customPermission={deleteAction}
          value={deleteData}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default EmailTemplatePermissionGroupDetail
