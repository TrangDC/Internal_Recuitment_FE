import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import { t } from 'i18next'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText } from 'shared/components/form/styles'
import TooltipComponent from 'shared/components/tooltip'
import ExPoint from 'shared/components/icons/ExPoint'

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
        label: (
          <FlexBox gap={0.5} alignItems={'baseline'}>
            <SpanText>Hiring team</SpanText>
            <SpanText color="#DB6C56">*</SpanText>
            <TooltipComponent title={t('tooltip.job_request.approver')}>
              <ExPoint />
            </TooltipComponent>
          </FlexBox>
        ),
      }}
    />
  )
}

export default CreateSelectionTeamPermission
