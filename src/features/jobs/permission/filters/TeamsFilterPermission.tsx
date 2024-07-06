import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import _ from 'lodash'
import TeamsAutoComplete, {
  TeamsAutoCompleteData,
} from 'shared/components/autocomplete/team-auto-complete'

interface TeamsFilterPermissionProps {
  value: string | string[]
  onCustomChange(value: TeamsAutoCompleteData[]): void
}

function TeamsFilterPermission({
  onCustomChange,
  value,
}: TeamsFilterPermissionProps) {
  const { role } = useAuthorization()
  const teamOnly = checkPermissions({
    role,
    module: 'TEAMS',
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.teamOnly'],
    },
  })
  const filter = teamOnly ? { for_team: true } : undefined
  return (
    <TeamsAutoComplete
      name="team"
      multiple={true}
      value={value}
      onCustomChange={onCustomChange}
      open={true}
      disableCloseOnSelect={true}
      filter={filter}
      textFieldProps={{
        label: 'Team',
        autoFocus: true,
      }}
    />
  )
}

export default TeamsFilterPermission
