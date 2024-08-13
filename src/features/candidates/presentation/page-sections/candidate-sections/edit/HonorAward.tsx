import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { hasErrorsInArray } from 'features/candidates/shared/utils'
import { useEditFormContext } from 'features/candidates/hooks/crud/useContext'
import HonorAwardField from 'features/candidates/presentation/components/edit/HonorAwardField'
import LoadingField from 'shared/components/form/loadingField'

type HonorAwardProps = {
  isGetting: boolean
}

function HonorAward({ isGetting }: HonorAwardProps) {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, trigger, formState } = useEditFormContext()
  const name = 'candidate_award'
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
        title="Honor/ Awards"
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
                name: '',
                achieved_date: null,
              })
            }}
          >
            Add Education
          </TinyButton>
        }
      >
        <LoadingField isloading={isGetting}>
          {fields.map((field, index) => (
            <HonorAwardField
              index={index}
              key={field.id}
              name={name}
              onDelete={() => remove(index)}
            />
          ))}
        </LoadingField>
      </AppCollapse>
    </AppContainer>
  )
}

export default HonorAward
