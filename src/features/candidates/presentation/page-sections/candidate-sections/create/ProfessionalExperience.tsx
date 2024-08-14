import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { hasErrorsInArray } from 'features/candidates/shared/utils'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import ExperienceField from 'features/candidates/presentation/components/create/ExperienceField'

function ProfessionalExperience() {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, formState, trigger } = useCreateFormContext()
  const name = 'candidate_exp'
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  function isValidFields() {
    trigger(name)
  }

  const inValid = hasErrorsInArray(formState.errors, name)
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
        title="Professional Experience"
        setOpen={setOpeCollapse}
        padding={0}
        directionTitle="row-reverse"
        gapTitle={1}
        titleStyle={{
          width: 200,
        }}
        showIcon={inValid}
        onClose={isValidFields}
        CustomTitle={
          <TinyButton
            startIcon={<Add />}
            onClick={(e) => {
              e.stopPropagation()
              append({
                id: '',
                company: '',
                description: '',
                location: '',
                position: '',
                end_date: null,
                start_date: null,
                is_current: false,
              })
            }}
          >
            Add Professional Experience
          </TinyButton>
        }
      >
        {fields.map((field, index) => (
          <ExperienceField
            name={name}
            index={index}
            onDelete={() => remove(index)}
            key={field.id}
          />
        ))}
      </AppCollapse>
    </AppContainer>
  )
}

export default ProfessionalExperience
