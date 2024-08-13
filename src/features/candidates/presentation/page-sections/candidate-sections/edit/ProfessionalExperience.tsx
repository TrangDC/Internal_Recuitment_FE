import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { hasErrorsInArray } from 'features/candidates/shared/utils'
import { useEditFormContext } from 'features/candidates/hooks/crud/useContext'
import ExperienceField from 'features/candidates/presentation/components/edit/ExperienceField'
import LoadingField from 'shared/components/form/loadingField'

type ProfessionalExperienceProps = {
  isGetting: boolean
}
function ProfessionalExperience({ isGetting }: ProfessionalExperienceProps) {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, formState, trigger } = useEditFormContext()
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
        <LoadingField isloading={isGetting}>
          {fields.map((field, index) => (
            <ExperienceField
              name={name}
              index={index}
              onDelete={() => remove(index)}
              key={field.id}
            />
          ))}
        </LoadingField>
      </AppCollapse>
    </AppContainer>
  )
}

export default ProfessionalExperience
