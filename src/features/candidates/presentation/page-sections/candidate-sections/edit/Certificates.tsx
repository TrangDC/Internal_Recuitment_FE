import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import AppContainer from 'shared/components/AppContainer'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import TinyButton from 'shared/components/buttons/TinyButton'
import Add from 'shared/components/icons/Add'
import { hasErrorsInArray } from 'features/candidates/shared/utils'
import { useEditFormContext } from 'features/candidates/hooks/crud/useContext'
import CertificateField from 'features/candidates/presentation/components/edit/Certificate'
import LoadingField from 'shared/components/form/loadingField'

type CertificatesProps = {
  isGetting: boolean
}

function Certificates({ isGetting }: CertificatesProps) {
  const [opeCollapse, setOpeCollapse] = useState(true)
  const { control, trigger, formState } = useEditFormContext()
  const name = 'candidate_certificate'
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <AppCollapse
        open={opeCollapse}
        title="Certificates"
        setOpen={setOpeCollapse}
        padding={0}
        directionTitle="row-reverse"
        gapTitle={1}
        showIcon={inValid}
        onClose={isValidFields}
        CustomTitle={
          <TinyButton
            startIcon={<Add />}
            onClick={(e) => {
              e.stopPropagation()
              append({
                id: '',
                attachments: [],
                name: '',
                score: '',
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
            <CertificateField
              index={index}
              name={name}
              key={field.id}
              onDelete={() => remove(index)}
            />
          ))}
        </LoadingField>
      </AppCollapse>
    </AppContainer>
  )
}

export default Certificates
