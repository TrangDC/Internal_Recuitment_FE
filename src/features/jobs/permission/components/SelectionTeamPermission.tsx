import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import _ from 'lodash'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'

interface SelectionTeamPermissionProps {
  name: string
  value: string
  onChange(value: string | null): void
}

function SelectionTeamPermission({
  name,
  onChange,
  value,
}: SelectionTeamPermissionProps) {
  const { role } = useAuthorization()
  const teamOnly = checkPermissions({
    role,
    module: 'JOBS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
  })
  const filter = teamOnly ? { for_team: true } : undefined
  return (
    <TeamsAutoComplete
      name={name}
      value={value}
      onChange={onChange}
      multiple={false}
      filter={filter}
      textFieldProps={{
        required: true,
        label: 'Team',
      }}
    />
  )
}

export default SelectionTeamPermission