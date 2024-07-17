import { useEffect, useMemo, useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getCheck, getKeyName } from '../../utils/utils'
import ListCheckBox from './ListCheckBox'
import FlexBox from 'shared/components/flexbox/FlexBox'

interface FeedbackPermissionGroupProps extends PermissionGroupProps {
  moduleDisabled: boolean
}

function FeedbackPermissionGroup({
  roleTemplate,
  moduleDisabled,
}: FeedbackPermissionGroupProps) {
  const { control, watch, setValue } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.CANDIDATE_JOB_FEEDBACKS?.CREATE
  const deleteAction = roleTemplate?.CANDIDATE_JOB_FEEDBACKS?.DELETE
  const viewAction = roleTemplate?.CANDIDATE_JOB_FEEDBACKS?.VIEW

  const viewData = watch(getKeyName(viewAction.id))
  const createData = watch(getKeyName(createAction.id))
  const deleteData = watch(getKeyName(deleteAction.id))
  const state = [createData, deleteData, viewData]

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
      setValue(getKeyName(deleteAction.id), data)
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
          <Text13md color={'grey.900'}>Feedback</Text13md>
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
          name={getKeyName(createAction.id)}
          render={({ field }) => (
            <ListCheckBox
              disabled={moduleDisabled || disabled}
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
          name={getKeyName(deleteAction.id)}
          render={({ field }) => (
            <ListCheckBox
              hiddenBorder
              disabled={moduleDisabled || disabled}
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

export default FeedbackPermissionGroup
