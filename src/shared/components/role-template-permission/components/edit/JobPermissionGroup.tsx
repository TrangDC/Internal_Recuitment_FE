import { useEffect, useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getCheck, getKeyName } from '../../utils/utils'
import ListCheckBox from './ListCheckBox'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetCountChecked from '../../hooks/useGetCountChecked'

function JobPermissionGroup({ roleTemplate }: PermissionGroupProps) {
  const { control, watch, setValue } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.JOBS?.CREATE
  const editPendingApprovalAction = roleTemplate?.JOBS?.EDIT_PENDING_APPROVAL
  const editOpeningJobAction = roleTemplate?.JOBS?.EDIT_OPENING_JOB
  const deleteAction = roleTemplate?.JOBS?.DELETE
  const viewAction = roleTemplate?.JOBS?.VIEW
  const closeJobAction = roleTemplate?.JOBS?.CLOSE_JOB
  const reopenJobAction = roleTemplate?.JOBS?.REOPEN_JOB
  const cancelJobAction = roleTemplate?.JOBS?.CANCEL_JOB

  const viewData = watch(getKeyName(viewAction.id))
  const editPendingApprovalData = watch(
    getKeyName(editPendingApprovalAction.id)
  )
  const editOpeningJobData = watch(getKeyName(editOpeningJobAction.id))
  const createData = watch(getKeyName(createAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const closeJobData = watch(getKeyName(closeJobAction.id))
  const reopenData = watch(getKeyName(reopenJobAction.id))
  const cancelData = watch(getKeyName(cancelJobAction.id))

  const state = [
    createData,
    viewData,
    editOpeningJobData,
    deleteData,
    closeJobData,
    editPendingApprovalData,
    reopenData,
    cancelData,
  ]

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
      setValue(getKeyName(editPendingApprovalAction.id), data)
      setValue(getKeyName(editOpeningJobAction.id), data)
      setValue(getKeyName(deleteAction.id), data)
      setValue(getKeyName(closeJobAction.id), data)
      setValue(getKeyName(reopenJobAction.id), data)
      setValue(getKeyName(cancelJobAction.id), data)
    }
  }, [disabled])

  const countChecked = useGetCountChecked(state)

  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={
        <FlexBox justifyContent={'center'} gap={1}>
          <Text13md color={'grey.900'}>Job request</Text13md>
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
              <ListCheckBox
                title={viewAction?.title ?? ''}
                description={viewAction?.description ?? ''}
                for_all={viewAction?.for_all ?? false}
                for_owner={viewAction?.for_owner ?? false}
                for_team={viewAction?.for_team ?? false}
                onCheck={(key) => {
                  const data = getCheck(key, field.value, {
                    for_all: viewAction.for_all,
                    for_owner: viewAction.for_owner,
                    for_team: viewAction.for_team,
                  })
                  field.onChange(data)
                }}
                value={field.value}
              />
            )
          }}
        />
        <Controller
          control={control}
          name={getKeyName(createAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled}
              title={createAction?.title ?? ''}
              description={createAction?.description ?? ''}
              for_all={createAction?.for_all ?? false}
              for_owner={createAction?.for_owner ?? false}
              for_team={createAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: createAction.for_all,
                  for_owner: createAction.for_owner,
                  for_team: createAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(editPendingApprovalAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled}
              title={editPendingApprovalAction?.title ?? ''}
              description={editPendingApprovalAction?.description ?? ''}
              for_all={editPendingApprovalAction?.for_all ?? false}
              for_owner={editPendingApprovalAction?.for_owner ?? false}
              for_team={editPendingApprovalAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: editPendingApprovalAction.for_all,
                  for_owner: editPendingApprovalAction.for_owner,
                  for_team: editPendingApprovalAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(editOpeningJobAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled}
              title={editOpeningJobAction?.title ?? ''}
              description={editOpeningJobAction?.description ?? ''}
              for_all={editOpeningJobAction?.for_all ?? false}
              for_owner={editOpeningJobAction?.for_owner ?? false}
              for_team={editOpeningJobAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: editOpeningJobAction.for_all,
                  for_owner: editOpeningJobAction.for_owner,
                  for_team: editOpeningJobAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(closeJobAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled}
              title={closeJobAction?.title ?? ''}
              description={closeJobAction?.description ?? ''}
              for_all={closeJobAction?.for_all ?? false}
              for_owner={closeJobAction?.for_owner ?? false}
              for_team={closeJobAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: closeJobAction.for_all,
                  for_owner: closeJobAction.for_owner,
                  for_team: closeJobAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(cancelJobAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled}
              title={cancelJobAction?.title ?? ''}
              description={cancelJobAction?.description ?? ''}
              for_all={cancelJobAction?.for_all ?? false}
              for_owner={cancelJobAction?.for_owner ?? false}
              for_team={cancelJobAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: cancelJobAction.for_all,
                  for_owner: cancelJobAction.for_owner,
                  for_team: cancelJobAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(reopenJobAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled}
              title={reopenJobAction?.title ?? ''}
              description={reopenJobAction?.description ?? ''}
              for_all={reopenJobAction?.for_all ?? false}
              for_owner={reopenJobAction?.for_owner ?? false}
              for_team={reopenJobAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: reopenJobAction.for_all,
                  for_owner: reopenJobAction.for_owner,
                  for_team: reopenJobAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(deleteAction.id)}
          render={({ field }) => (
            <ListCheckBox
              hiddenBorder
              disabled={disabled}
              title={deleteAction?.title ?? ''}
              description={deleteAction?.description ?? ''}
              for_all={deleteAction?.for_all ?? false}
              for_owner={deleteAction?.for_owner ?? false}
              for_team={deleteAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: deleteAction.for_all,
                  for_owner: deleteAction.for_owner,
                  for_team: deleteAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default JobPermissionGroup
