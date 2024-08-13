import DragBox from './components/DragBox'
import useUploadFile from './hooks/useUploadFile'
import { FileUploadAttachment } from './types'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { VALIDATE_FILES } from '../inputFileUpload/types'
import FileBox from './components/FileBox'
import { SxProps } from '@mui/material'
import { ReactNode } from 'react'

type UploadFileBoxProps = {
  value: FileUploadAttachment[]
  folder: 'candidate'
  validator_files: VALIDATE_FILES
  name: string
  multiple?: boolean
  boxContainerSx?: SxProps
  Icon?: ReactNode
  descriptionFile?: () => React.ReactNode
  onChange: (data: FileUploadAttachment[]) => void
}

const UploadFileBox = (props: UploadFileBoxProps) => {
  const {
    value,
    validator_files,
    folder,
    name,
    multiple,
    boxContainerSx,
    Icon,
    descriptionFile,
    onChange,
  } = props
  const { handleChangeFiles, onDelete, handleChangeStatusFile } = useUploadFile(
    {
      validator_files,
      value,
      folder,
      onChange,
    }
  )

  return (
    <FlexBox gap={2} flexWrap={'wrap'}>
      <DragBox
        handleChangeFiles={handleChangeFiles}
        name={name}
        multiple={multiple}
        boxContainerSx={boxContainerSx}
        Icon={Icon}
        descriptionFile={descriptionFile}
      />
      {value.map((file) => (
        <FileBox
          key={file.id}
          document_id={file.document_id}
          document_name={file.document_name}
          status={file.status}
          file={file.file}
          url={file.url}
          onSuccess={handleChangeStatusFile}
          onError={handleChangeStatusFile}
          onUploading={handleChangeStatusFile}
          onDelete={() => onDelete(file.document_id)}
        />
      ))}
    </FlexBox>
  )
}

export default UploadFileBox
