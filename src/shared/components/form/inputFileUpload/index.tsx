import { DivWrapper } from '../styles'
import InputFile, { InputFileProps } from './input-file'
import { FileUploadAttachment } from './types'
import { ListFile } from './styles'
import UploadFileComponent from './components/UploadFileComponent'
import TrashIcon from 'shared/components/icons/TrashIcon'
import { ParamUploadFile } from 'shared/interfaces'

type InputFileUploadProps = InputFileProps & {
  getValues: (string: string) => any
  name: string
}

const InputFileUpload = (props: InputFileUploadProps) => {
  const { name, getValues, value, onChange, ...inputFileProps } = props
  const handleChangeStatusFile = ({ document_id, status }: ParamUploadFile) => {
    const new_files = getValues(name).map((file: FileUploadAttachment) => {
      if (file.document_id !== document_id) return file

      return {
        ...file,
        status,
      }
    })

    onChange(new_files)
  }

  const handleRemoveFile = (document_id: string) => {
    const filter_file = value.filter((file) => {
      return file.document_id !== document_id
    })
    onChange(filter_file)
  }

  return (
    <DivWrapper>
      <InputFile
        {...inputFileProps}
        value={value as FileUploadAttachment[]}
        onChange={onChange}
      />

      <ListFile>
        {value && value.map((itemFile) => {
          return (
            <UploadFileComponent
              IconEnd={
                <TrashIcon
                  onClick={() => {
                    handleRemoveFile(itemFile.document_id)
                  }}
                />
              }
              {...itemFile}
              key={itemFile.document_id}
              onSuccess={handleChangeStatusFile}
              onError={handleChangeStatusFile}
            />
          )
        })}
      </ListFile>
    </DivWrapper>
  )
}

export default InputFileUpload
