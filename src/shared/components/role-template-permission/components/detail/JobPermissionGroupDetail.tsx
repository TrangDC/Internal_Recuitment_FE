import { useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getKeyName } from '../../utils/utils'
import ListCheckBoxDetail from './ListCheckBoxDetail'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetCountChecked from '../../hooks/useGetCountChecked'

function JobPermissionGroupDetail({ roleTemplate }: PermissionGroupProps) {
  const { control, watch } = useFormContext()
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
        <Controller
          control={control}
          name={getKeyName(viewAction.id)}
          render={({ field }) => {
            return (
              <ListCheckBoxDetail
                value={field.value}
                customPermission={viewAction}
              />
            )
          }}
        />
        <Controller
          control={control}
          name={getKeyName(createAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              customPermission={createAction}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(editAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              customPermission={editAction}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(deleteAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              customPermission={deleteAction}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(closeJobAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              hiddenBorder
              customPermission={closeJobAction}
              value={field.value}
            />
          )}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default JobPermissionGroupDetail
