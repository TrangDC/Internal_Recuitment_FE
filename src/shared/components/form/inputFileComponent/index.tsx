import { FieldErrors } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { get } from 'lodash'
import InputFile, { InputFileProps } from 'shared/components/input-fields/InputFile'

type InputFileComponentProps<T extends object> = {
  errors: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  },
  inputFileProps?: InputFileProps, 
}

const InputFileComponent = <T extends object>({
  field,
  errors,
  ...props
}: InputFileComponentProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <InputFile
        {...props.inputFileProps}
        callbackFileChange={(data) => {       
          const ids_file = data.map((data) => ({document_name: data.name, document_id: data.id}))
          field.onChange(ids_file)
        }}
      />
      {error && (
        <DivError>
          <span>{error.message}</span>{' '}
        </DivError>
      )}
    </DivWrapper>
  )
}

export default InputFileComponent
