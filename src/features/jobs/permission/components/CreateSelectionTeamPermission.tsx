import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'

interface SelectionTeamPermissionProps {
  name: string
  value: string
  onChange(value: string | null): void
  disabled?: boolean
}

function CreateSelectionTeamPermission({
  name,
  onChange,
  value,
  disabled = false,
}: SelectionTeamPermissionProps) {
  const { role } = useAuthorization()
  const teamOnly = checkPermissions({
    role,
    module: 'JOBS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['CREATE.teamOnly'],
    },
  })
  const filter = teamOnly ? { for_hiring_team: true } : undefined
  return (
    <TeamsAutoComplete
      name={name}
      value={value}
      onChange={onChange}
      multiple={false}
      filter={filter}
      disabled={disabled}
      textFieldProps={{
        required: true,
        label: 'Hiring team',
      }}
    />
  )
}

export default CreateSelectionTeamPermission
