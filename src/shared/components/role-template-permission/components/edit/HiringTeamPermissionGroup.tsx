import { useEffect, useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md } from 'shared/components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getCheck, getKeyName } from '../../utils/utils'
import ListCheckBox from './ListCheckBox'

function HiringTeamPermissionGroup({ roleTemplate }: PermissionGroupProps) {
  const { control, watch, setValue } = useFormContext()
  const [open, setOpen] = useState(true)
  const editAction = roleTemplate?.HIRING_TEAMS?.EDIT
  const viewAction = roleTemplate?.HIRING_TEAMS?.VIEW
  const viewData = watch(getKeyName(viewAction.id))
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
      setValue(getKeyName(editAction.id), data)
    }
  }, [disabled])
  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={<Text13md color={'grey.900'}>Hiring team</Text13md>}
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
          name={getKeyName(editAction.id)}
          render={({ field }) => (
            <ListCheckBox
              hiddenBorder
              disabled={disabled}
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
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default HiringTeamPermissionGroup
