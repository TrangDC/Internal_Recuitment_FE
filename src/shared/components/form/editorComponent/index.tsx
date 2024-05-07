import { FieldValues, FieldErrors } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { get } from 'lodash'
import { IAllProps } from '@tinymce/tinymce-react'
import EditorBox from 'shared/components/input-fields/EditorBox'

interface TinyProps<T extends FieldValues> extends IAllProps {
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  errors?: FieldErrors<T>
  label?: string,
}

const EditorBoxComponent = <T extends object>({
  field,
  errors,
  ...props
}: TinyProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <EditorBox
      defaultValue={field.value}
      callbackChange={(value) => {
        field.onChange(value)
      }}
      {...props} />
      {error && (
        <DivError>
          <span>{error.message}</span>{' '}
        </DivError>
      )}
    </DivWrapper>
  )
}

export default EditorBoxComponent
