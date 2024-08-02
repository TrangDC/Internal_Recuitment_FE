import { useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getKeyName } from '../../utils/utils'
import ListCheckBoxDetail from './ListCheckBoxDetail'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetCountChecked from '../../hooks/useGetCountChecked'

function CandidateJobsPermissionGroupDetail({
  roleTemplate,
}: PermissionGroupProps) {
  const { watch } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.CANDIDATE_JOBS?.CREATE
  const editAction = roleTemplate?.CANDIDATE_JOBS?.EDIT
  const deleteAction = roleTemplate?.CANDIDATE_JOBS?.DELETE
  const viewAction = roleTemplate?.CANDIDATE_JOBS?.VIEW
  const changeStatusAction = roleTemplate?.CANDIDATE_JOBS?.CHANGE_STATUS

  const viewData = watch(getKeyName(viewAction.id))
  const createData = watch(getKeyName(createAction.id))
  const editData = watch(getKeyName(editAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const changeStatusData = watch(getKeyName(changeStatusAction.id))
  const state = [createData, deleteData, viewData, editData, changeStatusData]

  const countChecked = useGetCountChecked(state)
  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={
        <FlexBox justifyContent={'center'} gap={1}>
          <Text13md color={'grey.900'}>Candidate Job Application </Text13md>
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
          customPermission={changeStatusAction}
          value={changeStatusData}
        />
        <ListCheckBoxDetail
          customPermission={deleteAction}
          value={deleteData}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default CandidateJobsPermissionGroupDetail
