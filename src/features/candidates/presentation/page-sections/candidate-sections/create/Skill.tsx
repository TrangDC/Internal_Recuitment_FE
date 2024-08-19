import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import SkillField from 'features/candidates/presentation/components/create/SkillField'

function Skill() {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control } = useCreateFormContext()
  const name = 'entity_skill_records'
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })
  return (
    <AppContainer
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <AppCollapse
        open={opeCollapse}
        title="Skills"
        setOpen={setOpeCollapse}
        padding={0}
        directionTitle="row-reverse"
        gapTitle={1}
        titleStyle={{
          fontSize: 18,
        }}
        CustomTitle={
          <TinyButton
            startIcon={<Add />}
            onClick={(e) => {
              e.stopPropagation()
              append({
                id: '',
                skill_id: [],
                skill_type_id: '',
              })
            }}
          >
            Add skill
          </TinyButton>
        }
      >
        {fields.map((field, index) => (
          <SkillField
            index={index}
            name={name}
            onDelete={() => remove(index)}
            key={field.id}
          />
        ))}
      </AppCollapse>
    </AppContainer>
  )
}

export default Skill
