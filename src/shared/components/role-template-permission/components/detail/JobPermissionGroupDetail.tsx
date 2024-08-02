import { useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getKeyName } from '../../utils/utils'
import ListCheckBoxDetail from './ListCheckBoxDetail'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetCountChecked from '../../hooks/useGetCountChecked'

function JobPermissionGroupDetail({ roleTemplate }: PermissionGroupProps) {
  const { watch } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.JOBS?.CREATE
  const editAction = roleTemplate?.JOBS?.EDIT
  const deleteAction = roleTemplate?.JOBS?.DELETE
  const viewAction = roleTemplate?.JOBS?.VIEW
  const closeJobAction = roleTemplate?.JOBS?.CLOSE_JOB

  const viewData = watch(getKeyName(viewAction.id))
  const editData = watch(getKeyName(editAction.id))
  const createData = watch(getKeyName(createAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const closeJobData = watch(getKeyName(closeJobAction.id))

  const state = [createData, viewData, editData, deleteData, closeJobData]
  const countChecked = useGetCountChecked(state)
  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={
        <FlexBox justifyContent={'center'} gap={1}>
          <Text13md color={'grey.900'}>Jobs</Text13md>
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
          customPermission={deleteAction}
          value={deleteData}
        />
        <ListCheckBoxDetail
          customPermission={closeJobAction}
          value={closeJobData}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default JobPermissionGroupDetail
