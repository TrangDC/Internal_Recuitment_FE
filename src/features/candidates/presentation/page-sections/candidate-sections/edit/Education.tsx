import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { hasErrorsInArray } from 'features/candidates/shared/utils'
import { useEditFormContext } from 'features/candidates/hooks/crud/useContext'
import EducationField from 'features/candidates/presentation/components/edit/EducationField'
import LoadingField from 'shared/components/form/loadingField'

type EducationProps = {
  isGetting: boolean
}
function Education({ isGetting }: EducationProps) {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, trigger, formState } = useEditFormContext()
  const name = 'candidate_educate'
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
        title="Education"
        setOpen={setOpeCollapse}
        padding={0}
        directionTitle="row-reverse"
        gapTitle={1}
        onClose={isValidFields}
        showIcon={inValid}
        CustomTitle={
          <TinyButton
            startIcon={<Add />}
            onClick={(e) => {
              e.stopPropagation()
              append({
                id: '',
                attachments: [],
                description: '',
                gpa: '',
                location: '',
                major: '',
                school_name: '',
                end_date: null,
                start_date: null,
                is_current: false,
              })
            }}
          >
            Add Education
          </TinyButton>
        }
      >
        <LoadingField isloading={isGetting}>
          {fields.map((field, index) => (
            <EducationField
              key={field.id}
              index={index}
              onDelete={() => remove(index)}
              name={name}
            />
          ))}
        </LoadingField>
      </AppCollapse>
    </AppContainer>
  )
}

export default Education