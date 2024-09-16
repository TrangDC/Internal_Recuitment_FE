import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import MemberAutoComplete from 'shared/components/autocomplete/user-auto-complete'
import { useMemo } from 'react'

interface SelectionTeamPermissionProps {
    name: string
    value: string
    onChange(value: string | null): void
    disabled?: boolean
}

function CreateSelectionMemberPermission({
    name,
    onChange,
    value,
    disabled = false,
}: SelectionTeamPermissionProps) {
    const { role, user } = useAuthorization()
    const ownedOnly = checkPermissions({
        role,
        module: 'JOBS',
        checkBy: {
            compare: 'hasAny',
            permissions: ['CREATE.ownedOnly'],
        },
    })
    const teamOnly = checkPermissions({
        role,
        module: 'JOBS',
        checkBy: {
            compare: 'hasAny',
            permissions: ['CREATE.teamOnly'],
        },
    })
    const everything = checkPermissions({
        role,
        module: 'JOBS',
        checkBy: {
            compare: 'hasAny',
            permissions: ['CREATE.everything'],
        },
    })

    const filter = useMemo(() => {
        if(everything) return {};
        if(teamOnly) return {hiring_team_id: [user?.teamId]}
        if(ownedOnly) return {ids: [user?.id]};
    }, [ownedOnly, teamOnly, everything, user])

    return (
        <MemberAutoComplete
            name={name}
            value={value}
            filter={filter}
            onChange={(value) => {
                onChange(value ?? '')
            }}
            multiple={false}
            disabled={ownedOnly}
            textFieldProps={{
                required: true,
                label: 'Requester',
                disabled: true,
            }}
        />
    )
}

export default CreateSelectionMemberPermission
