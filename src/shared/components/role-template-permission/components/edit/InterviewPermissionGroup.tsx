import { useEffect, useMemo, useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getCheck, getKeyName } from '../../utils/utils'
import ListCheckBox from './ListCheckBox'
import FlexBox from 'shared/components/flexbox/FlexBox'

interface InterviewPermissionGroupProps extends PermissionGroupProps {
  moduleDisabled: boolean
}

function InterviewPermissionGroup({
  roleTemplate,
  moduleDisabled,
}: InterviewPermissionGroupProps) {
  const { control, setValue, watch } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.INTERVIEWS?.CREATE
  const editAction = roleTemplate?.INTERVIEWS?.EDIT
  const deleteAction = roleTemplate?.INTERVIEWS?.DELETE
  const viewAction = roleTemplate?.INTERVIEWS?.VIEW
  const changeStatusAction = roleTemplate?.INTERVIEWS?.CHANGE_INTERVIEW
  const interviewAction = roleTemplate?.INTERVIEWS?.INTERVIEWING

  const viewData = watch(getKeyName(viewAction.id))
  const editData = watch(getKeyName(editAction.id))
  const createData = watch(getKeyName(createAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const changeStatusData = watch(getKeyName(changeStatusAction.id))
  const interviewData = watch(getKeyName(interviewAction.id))

  const state = [
    createData,
    viewData,
    editData,
    deleteData,
    changeStatusData,
    interviewData,
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
      setValue(getKeyName(editAction.id), data)
      setValue(getKeyName(deleteAction.id), data)
      setValue(getKeyName(changeStatusAction.id), data)
      setValue(getKeyName(interviewAction.id), data)
    }
  }, [disabled])

  const countChecked = useMemo(() => {
    const count = state.reduce((a: number, c) => {
      const number = c.for_all || c.for_owner || c.for_team ? 1 : 0
      return number + a
    }, 0)
    return count
  }, state)
  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={
        <FlexBox justifyContent={'center'} gap={1}>
          <Text13md color={'grey.900'}>Interview</Text13md>
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
                disabled={moduleDisabled}
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
          name={getKeyName(interviewAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled || moduleDisabled}
              title={interviewAction?.title ?? ''}
              description={interviewAction?.description ?? ''}
              for_all={interviewAction?.for_all ?? false}
              for_owner={interviewAction?.for_owner ?? false}
              for_team={interviewAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: interviewAction.for_all,
                  for_owner: interviewAction.for_owner,
                  for_team: interviewAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(createAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled || moduleDisabled}
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
          name={getKeyName(editAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled || moduleDisabled}
              title={editAction?.title ?? ''}
              description={editAction?.description ?? ''}
              for_all={editAction?.for_all ?? false}
              for_owner={editAction?.for_owner ?? false}
              for_team={editAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: editAction.for_all,
                  for_owner: editAction.for_owner,
                  for_team: editAction.for_team,
                })
                field.onChange(data)
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(changeStatusAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={disabled || moduleDisabled}
              title={changeStatusAction?.title ?? ''}
              description={changeStatusAction?.description ?? ''}
              for_all={changeStatusAction?.for_all ?? false}
              for_owner={changeStatusAction?.for_owner ?? false}
              for_team={changeStatusAction?.for_team ?? false}
              onCheck={(key) => {
                const data = getCheck(key, field.value, {
                  for_all: changeStatusAction.for_all,
                  for_owner: changeStatusAction.for_owner,
                  for_team: changeStatusAction.for_team,
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

export default InterviewPermissionGroup
