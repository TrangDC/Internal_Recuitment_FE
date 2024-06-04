import { FieldValues, FieldErrors } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { get } from 'lodash'
import { IAllProps } from '@tinymce/tinymce-react'
import EditorBox from 'shared/components/input-fields/EditorBox'
import SkeletonField from 'shared/components/input-fields/SkeletonField'

interface TinyProps<T extends FieldValues> extends IAllProps {
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  errors?: FieldErrors<T>
  label?: string,
  required?: boolean,
  loading?: boolean,
}

const EditorBoxComponent = <T extends object>({
  field,
  errors,
  loading,
  ...props
}: TinyProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    loading ? <SkeletonField height={100}/> :
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
