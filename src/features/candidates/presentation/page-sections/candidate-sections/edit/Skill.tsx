import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { v4 as uuidv4 } from 'uuid'
import SkillField from 'features/candidates/presentation/components/create/SkillField'
import { useEditFormContext } from 'features/candidates/hooks/crud/useContext'
import LoadingField from 'shared/components/form/loadingField'

type SkillProps = {
  isGetting: boolean
}

function Skill({ isGetting }: SkillProps) {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control } = useEditFormContext()
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
        <LoadingField isloading={isGetting}>
          {fields.map((field, index) => (
            <SkillField
              index={index}
              name={name}
              onDelete={() => remove(index)}
              key={field.id}
            />
          ))}
        </LoadingField>
      </AppCollapse>
    </AppContainer>
  )
}

export default Skill
