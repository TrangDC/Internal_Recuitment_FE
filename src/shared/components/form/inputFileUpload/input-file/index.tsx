import { Box } from '@mui/material'
import { Fragment, useMemo } from 'react'
import useTextTranslation from 'shared/constants/text'
import { ParamCreateURLAttachment } from 'shared/hooks/graphql/useGetUrlAttachment'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import UploadIcon from 'shared/components/icons/UploadIcon'
import { Span, Tiny } from 'shared/components/Typography'
import {
  FlexBoxContainer,
  InputFileContainer,
  InputFileWrapper,
  TextWrapper,
} from '../styles'
import { FileUploadAttachment, VALIDATE_FILES } from '../types'
import { INIT_VALIDATOR_FILE } from '../constant'
import { handleValidate } from '../utils/validate'
import { getAllUrlFromAzure } from '../services'

export interface InputFileProps {
  accept?: string
  descriptionFile?: () => React.ReactNode
  multiple?: boolean
  validator_files?: VALIDATE_FILES
  value: FileUploadAttachment[]
  onChange: (value: FileUploadAttachment[]) => void
}

const InputFile = ({
  accept = '.jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .odt, .xls, .xlsx, .ods, .ppt, .pptx, .odp, .mp4, .avi, .mkv, .mov',
  descriptionFile,
  multiple = true,
  validator_files = INIT_VALIDATOR_FILE,
  value,
  onChange,
}: InputFileProps) => {
  const idFile = useMemo(() => {
    return uuidv4()
  }, [])

  const translation = useTextTranslation()

  const handleChangeFiles = async (fileUploads: File[]) => {
    //validation each file
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
        folder: 'candidate',
        fileName: file.name,
        action: 'UPLOAD',
        file: file,
      }
    })
    //get list url from azure
    const listUrlAzure = await getAllUrlFromAzure(files_upload)
    //add file
    const newFiles: FileUploadAttachment[] = listUrlAzure.map((itemFile) => {
      const file = itemFile?.file
      const url = itemFile?.url ?? ''

      return {
        document_id: file?.id ?? '',
        document_name: file?.fileName ?? '',
        file: file?.file as File,
        url,
        status: 'init',
      }
    })
    const new_value = [...value, ...newFiles]
    onChange(new_value)
  }

  const handleGetFile = (fileEvent: FileList) => {
    if (!fileEvent) return []
    const list_file = []

    for (let i = 0; i < fileEvent?.length; i++) {
      list_file.push(fileEvent[i])
    }
    handleChangeFiles(list_file)
  }

  return (
    <InputFileWrapper>
      <label htmlFor={idFile}>
        <InputFileContainer
          onDragOver={(event) => {
            event.preventDefault()
          }}
          onDrop={(event) => {
            event.preventDefault()
            const fileEvent = event.dataTransfer.files
            handleGetFile(fileEvent)
          }}
        >
          <FlexBoxContainer>
            <Box>
              <UploadIcon />
            </Box>
            <TextWrapper>
              {descriptionFile ? (
                descriptionFile()
              ) : (
                <Fragment>
                  <Tiny>{translation.COMMON.drag_and_drop}</Tiny>{' '}
                  <Span>{translation.COMMON.browse_file}</Span>
                </Fragment>
              )}
            </TextWrapper>
          </FlexBoxContainer>
        </InputFileContainer>
      </label>

      <input
        type="file"
        id={idFile}
        name="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(event) => {
          const fileEvent = event.target.files
          handleGetFile(fileEvent as FileList)
          event.target.value = ''
        }}
      />
    </InputFileWrapper>
  )
}

export default InputFile
