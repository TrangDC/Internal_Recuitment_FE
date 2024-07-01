import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import TeamsAutoComplete from '../autocomplete/team-auto-complete'
import { transformListItem } from 'shared/utils/utils'
import { Team } from 'features/teams/domain/interfaces'

interface Props {
  onChange: ({
    ids,
    value,
  }: {
    ids: string[]
    value: Pick<Team, 'name' | 'id'>[]
  }) => void
}

const TeamFilter = ({ onChange }: Props) => {
  const [teams, setTeams] = useState<Pick<Team, 'name' | 'id'>[]>([])

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Team'}
        node={
          <TeamsAutoComplete
            name="team"
            multiple={true}
            value={transformListItem(teams, 'id')}
            onCustomChange={(data) => {
              const ids = data.map((item) => item.id)
              setTeams(data)

              onChange?.({ ids, value: data })
            }}
            onChange={() => {}}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'Team',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {teams.map((team, idx) => {
          return (
            <ChipField
              key={idx}
              label={team.name}
              onDelete={() => {
                const teamFilter = teams.filter((item) => item.id !== team.id)
                const ids = teamFilter.map((item) => item.id)
                setTeams(teamFilter)

                onChange?.({ ids, value: teamFilter })
              }}
            />
          )
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default TeamFilter
