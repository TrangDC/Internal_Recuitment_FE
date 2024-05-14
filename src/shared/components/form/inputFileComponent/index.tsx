import { FieldErrors } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { get } from 'lodash'
import InputFile from 'shared/components/input-fields/InputFile'

type InputFileProps<T extends object> = {
  accept?: string
  regexString?: string
  msgError?: string
  callbackFileChange?: (data: File[]) => void
  errors: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
}

const InputFileComponent = <T extends object>({
  callbackFileChange,
  field,
  errors,
  ...props
}: InputFileProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <InputFile
        {...props}
        callbackFileChange={(data) => {
            field.onChange(data)
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
