import toast from 'react-hot-toast'
import { handleValidate } from '../../inputFileUpload/utils/validate'
import { VALIDATE_FILES } from '../../inputFileUpload/types'
import { v4 as uuidv4 } from 'uuid'
import {
  FileUploadAttachment,
  ParamCreateURLAttachment,
  ParamUploadFile,
} from '../types'
import { handleGetUrlAttachment } from '../api'

type UseUploadFileProps = {
  validator_files: VALIDATE_FILES
  value: FileUploadAttachment[]
  folder: 'candidate'
  onChange: (data: FileUploadAttachment[]) => void
}

export const getAllUrlFromAzure = async (
  list_upload: ParamCreateURLAttachment[]
) => {
  const getUrlAzures = list_upload.map((fileUpload) => {
    return handleGetUrlAttachment(fileUpload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        toast.error((error as Error).message)
        return Promise.reject(error)
      })
  })

  return await Promise.all(getUrlAzures).then((values) => {
    return values
  })
}

function useUploadFile({
  value,
  validator_files,
  folder,
  onChange,
}: UseUploadFileProps) {
  const handleChangeFiles = async (fileUploads: File[]) => {
    const validate = handleValidate({
      files: fileUploads,
      lengthFileCurrent: value.length + fileUploads.length,
      validator_files,
    })

    if (!validate.status) {
      toast.error(validate.msgError)
      return
    }

    const files_upload: ParamCreateURLAttachment[] = fileUploads.map((file) => {
      return {
        id: uuidv4(),
        folder,
        fileName: file.name,
        action: 'UPLOAD',
        file: file,
      }
    })

    const listUrlAzure = await getAllUrlFromAzure(files_upload)
    const newFiles: FileUploadAttachment[] = listUrlAzure.map((itemFile) => {
      const file = itemFile?.params
      const url = itemFile?.url ?? ''
      return {
        document_id: file?.id ?? '',
        document_name: file?.fileName ?? '',
        file: file?.file as File,
        url,
        status: 'new',
        id: '',
      }
    })
    onChange([...value, ...newFiles])
  }

  function onDelete(id: string) {
    const newData = value.filter((file) => file.document_id !== id)
    onChange(newData)
  }

  const handleChangeStatusFile = ({ document_id, status }: ParamUploadFile) => {
    const newData = value.map((file: FileUploadAttachment) => {
      if (file.document_id !== document_id) return file
      return {
        ...file,
        status,
      }
    })
    onChange(newData)
  }

  return {
    handleChangeFiles,
    onDelete,
    handleChangeStatusFile,
  }
}
export default useUploadFile
