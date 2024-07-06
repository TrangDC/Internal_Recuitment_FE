import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import _ from 'lodash'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import { TeamsAutoCompleteData } from 'shared/components/autocomplete/team-auto-complete'

interface JobsFilterPermissionProps {
  value: string | string[]
  onCustomChange(value: TeamsAutoCompleteData[]): void
}

function JobsFilterPermission({
  onCustomChange,
  value,
}: JobsFilterPermissionProps) {
  const { role } = useAuthorization()
  const teamOnly = checkPermissions({
    role,
    module: 'JOBS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.teamOnly'],
    },
  })
  const filter = teamOnly ? { for_team: true } : undefined
  return (
    <JobsAutoComplete
      name="job"
      multiple={true}
      value={value}
      onCustomChange={onCustomChange}
      open={true}
      filter={filter}
      disableCloseOnSelect={true}
      textFieldProps={{
        label: 'Job',
        autoFocus: true,
      }}
    />
  )
}

export default JobsFilterPermission
