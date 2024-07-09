import { useState } from 'react'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { Text13md } from 'shared/components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import { PermissionGroupProps } from '../../interfaces'
import { getKeyName } from '../../utils/utils'
import ListCheckBoxDetail from './ListCheckBoxDetail'

function InterviewPermissionGroupDetail({
  roleTemplate,
}: PermissionGroupProps) {
  const { control } = useFormContext()
  const [open, setOpen] = useState(true)
  const createAction = roleTemplate?.INTERVIEWS?.CREATE
  const editAction = roleTemplate?.INTERVIEWS?.EDIT
  const deleteAction = roleTemplate?.INTERVIEWS?.DELETE
  const viewAction = roleTemplate?.INTERVIEWS?.VIEW
  const changeStatusAction = roleTemplate?.INTERVIEWS?.CHANGE_INTERVIEW
  const interviewAction = roleTemplate?.INTERVIEWS?.INTERVIEWING

  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={<Text13md color={'grey.900'}>Interview</Text13md>}
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
                customPermission={viewAction}
                value={field.value}
              />
            )
          }}
        />
        <Controller
          control={control}
          name={getKeyName(interviewAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              customPermission={interviewAction}
              value={field.value}
            />
          )}
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
          name={getKeyName(changeStatusAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              customPermission={changeStatusAction}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={getKeyName(deleteAction.id)}
          render={({ field }) => (
            <ListCheckBoxDetail
              hiddenBorder
              customPermission={deleteAction}
              value={field.value}
            />
          )}
        />
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}

export default InterviewPermissionGroupDetail
