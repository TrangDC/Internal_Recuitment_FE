import { Box, styled } from '@mui/material'
import FlexBox from '../flexbox/FlexBox'
import UploadIcon from '../icons/UploadIcon'
import { Span, Tiny } from '../Typography'
import { DragEvent, useMemo, useState } from 'react'
import TrashIcon from '../icons/TrashIcon'
import useTextTranslation from 'shared/constants/text'
import ShowFile from './ItemFile'
import useGetUrlGetAttachment, {
  FileAttachment,
  ParamCreateURLAttachment,
} from 'shared/hooks/graphql/useGetUrlAttachment'
import { v4 as uuidv4 } from 'uuid'
import { UploadFileAttachment } from 'services/handleAttachments'
import { checkMaxFile, checkMaxSize, regexFile, wrapperValidate } from './utils'
import { toast } from 'react-toastify'
import { RULE_MESSAGES } from 'shared/constants/vaildate'

const InputFileContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed #2499EF',
  cursor: 'pointer',
  height: '100%',
  padding: '5px',
  textAlign: 'center',
  borderRadius: '8px',
  minHeight: '88px',
  marginTop: '10px',
}))

const InputFileWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
}))

const ListFile = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  flexDirection: 'column',
  gap: '10px',
}))

const FlexBoxContainer = styled(FlexBox)(({ theme }) => ({
  height: '100%',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '12px 16px 16px 16px',
}))

const TextWrapper = styled(FlexBox)(({ theme }) => ({
  justifyContent: 'center',
  gap: '4px',
  alignItems: 'center',
  flexWrap: 'wrap',

  '& p': {
    fontSize: '13px',
    fontWeight: 500,
    color: theme.palette.grey[600],
  },

  '& span': {
    fontSize: '13px',
    fontWeight: 600,
    color: '#2499EF',
  },
}))

export interface InputFileProps {
  accept?: string
  regexString?: string
  msgError?: {
    maxFile?: string
    maxSize?: string
    is_valid?: string
  }
  callbackFileChange?: (data: FileAttachment[]) => void
  maxFile?: number
  maxSize?: number | null
  showList?: boolean
}

type UploadAttachment = {
  CreateAttachmentSASURL: {
    action: 'UPLOAD' | 'DOWNLOAD'
    fileName: string
    id: string
    url: string
  }
}

const InputFile = ({
  accept = '*/*',
  regexString = '\\.(pdf|docx?|jpe?g|png|gif|bmp|tiff)$',
  callbackFileChange,
  maxFile = 5,
  maxSize = null,
  showList = true,
  msgError,
}: InputFileProps) => {
  const [files, setFiles] = useState<FileAttachment[]>([])
  const idFile = useMemo(() => {
    return uuidv4()
  }, [])

  const handleRemoveFile = (idx: number) => {
    const filterFile = files.filter((file, _) => {
      return _ !== idx
    })
    setFiles(filterFile)
    callbackFileChange && callbackFileChange(filterFile)
  }

  function validateFile(
    blob: File,
    fieldValidate: { regex: string; maxFile: number; maxSize: number | null }
  ) {

    const regexValidate = wrapperValidate(
      () => regexFile(blob, fieldValidate.regex),
      msgError?.is_valid ? msgError?.is_valid : RULE_MESSAGES.MC5('file')
    )
    if (!regexValidate.status) return regexValidate

    const maxFileValidate = wrapperValidate(
      () => checkMaxFile(files, fieldValidate.maxFile),
      msgError?.maxFile ? msgError?.maxFile : RULE_MESSAGES.MC4('file', maxFile)
    )
    if (!maxFileValidate.status) return maxFileValidate

    if (maxSize) {
      const maxSizeValidate = wrapperValidate(
        () => checkMaxSize(blob, fieldValidate.maxFile),
        msgError?.maxSize ? msgError?.maxSize : RULE_MESSAGES.MC8('file', maxSize.toString())
      )

      if (!maxSizeValidate.status) return maxSizeValidate
    }

    return {
      status: true,
      msgError: '',
    }
  }

  const translation = useTextTranslation()

  const handleUploadAttachment = async (
    data: UploadAttachment,
    params: ParamCreateURLAttachment
  ) => {
    const { CreateAttachmentSASURL } = data
    if (!params?.file) return
    return await UploadFileAttachment(CreateAttachmentSASURL.url, params?.file)
  }

  const { handleGetUrl, handleGetUrlDownload } = useGetUrlGetAttachment({
    callbackSuccess: handleUploadAttachment,
  })

  const handleChangeFile = (fileUpload: File) => {
    const validate = validateFile(fileUpload, {
      regex: regexString,
      maxFile: maxFile,
      maxSize: maxSize,
    })

    if (!validate.status) {
      toast.error(validate.msgError)
      return
    }

    const uuid = uuidv4()
    const paramUpload: ParamCreateURLAttachment = {
      id: uuid,
      folder: 'candidate',
      fileName: fileUpload.name,
      action: 'UPLOAD',
      file: fileUpload,
    }

    handleGetUrl(paramUpload, async (data) => {
      const filesUpload = [
        ...files,
        { id: uuid, name: fileUpload.name, file: fileUpload },
      ]

      const { CreateAttachmentSASURL } = await handleGetUrlDownload(paramUpload)

      try {
        await UploadFileAttachment(CreateAttachmentSASURL.url, fileUpload)
        setFiles(filesUpload)
        callbackFileChange &&
          callbackFileChange(filesUpload as FileAttachment[])
      } catch (error) {
        toast.error((error as Error)?.message)
      }
    })
  }

  return (
    <InputFileWrapper>
      <label htmlFor={idFile}>
        <InputFileContainer
          onDragOver={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
          }}
          onDrop={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            const filesValue = event.dataTransfer.files
            const fileUpload = filesValue[0]
            handleChangeFile(fileUpload)
          }}
        >
          <FlexBoxContainer>
            <Box>
              <UploadIcon />
            </Box>
            <TextWrapper>
              <Tiny>{translation.COMMON.drag_and_drop}</Tiny>{' '}
              <Span>{translation.COMMON.browse_file}</Span>
            </TextWrapper>
          </FlexBoxContainer>
        </InputFileContainer>
      </label>

      {showList && (
        <ListFile>
          {files.map((file, index) => {
            return (
              <ShowFile
                name={file?.name}
                size={file?.file?.size}
                key={index}
                IconEnd={<TrashIcon onClick={() => handleRemoveFile(index)} />}
              />
            )
          })}
        </ListFile>
      )}

      <input
        type="file"
        id={idFile}
        name="file"
        accept={accept}
        multiple
        hidden
        onChange={(event) => {
          const fileEvent = event.target.files
          if (fileEvent) {
            const fileUpload = fileEvent[0]
            handleChangeFile(fileUpload)
          }
          event.target.value = ''
        }}
      />
    </InputFileWrapper>
  )
}

export default InputFile
