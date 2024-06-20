import { Box, styled } from '@mui/material'
import FlexBox from '../flexbox/FlexBox'
import UploadIcon from '../icons/UploadIcon'
import { Span, Tiny } from '../Typography'
import {
  DragEvent,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import TrashIcon from '../icons/TrashIcon'
import useTextTranslation from 'shared/constants/text'
import useGetUrlGetAttachment, {
  ParamCreateURLAttachment,
} from 'shared/hooks/graphql/useGetUrlAttachment'
import { v4 as uuidv4 } from 'uuid'
import { checkMaxFile, checkMaxSize, regexFile, wrapperValidate } from './utils'
import { toast } from 'react-toastify'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { isEmpty } from 'lodash'
import UploadFileComponent from './UploadFileComponent'
import { ParamUploadFile, UploadStatus } from 'shared/interfaces'
import AzureStorageService from 'services/azure-storage-services'

const InputFileContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed #88CDFF',
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
  callbackFileChange?: (data: FileUploadAttachment[]) => void
  maxFile?: number
  maxSize?: number | null
  showList?: boolean
  descriptionFile?: () => React.ReactNode
  multiple?: boolean
}

type UploadAttachment = {
  CreateAttachmentSASURL: {
    action: 'UPLOAD' | 'DOWNLOAD'
    fileName: string
    id: string
    url: string
  }
}

type FileUploadAttachment = {
  document_id: string
  document_name: string
  file: File
  url: string
  status: UploadStatus
}

const InputFile = ({
  accept = ".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .odt, .xls, .xlsx, .ods, .ppt, .pptx, .odp, .mp4, .avi, .mkv, .mov",
  regexString = '\.(jpg|jpeg|png|gif|pdf|doc|docx|odt|xls|xlsx|ods|ppt|pptx|odp|mp4|avi|mkv|mov)$',
  callbackFileChange,
  maxFile = 5,
  maxSize = null,
  showList = true,
  msgError,
  descriptionFile,
  multiple = true,
}: InputFileProps) => {
  //version2
  const [listFile, setListFile] = useState<FileUploadAttachment[]>([])
  const changed = useRef<boolean>(false)
  const idFile = useMemo(() => {
    return uuidv4()
  }, [])
  //validate version2
  function validateFiles({
    files,
    lengthFileCurrent,
    fieldValidate,
  }: {
    files: File[]
    lengthFileCurrent: number
    fieldValidate: { regex: string; maxFile: number; maxSize: number | null }
  }) {
    let validation = {
      status: true,
      msgError: '',
    }

    const maxFileValidate = wrapperValidate(
      () => checkMaxFile(lengthFileCurrent, fieldValidate.maxFile),
      msgError?.maxFile ? msgError?.maxFile : RULE_MESSAGES.MC4('file', maxFile)
    )
    if (!maxFileValidate.status) return maxFileValidate

    files.forEach((file) => {
      const regexValidate = wrapperValidate(
        () => regexFile(file, fieldValidate.regex),
        msgError?.is_valid ? msgError?.is_valid : RULE_MESSAGES.MC5('file')
      )
      if (!regexValidate.status) {
        validation = regexValidate
        return
      }

      if (maxSize) {
        const maxSizeValidate = wrapperValidate(
          () => checkMaxSize(file, fieldValidate?.maxSize as number),
          msgError?.maxSize
            ? msgError?.maxSize
            : RULE_MESSAGES.MC8('file', maxSize.toString())
        )

        if (!maxSizeValidate.status) {
          validation = maxSizeValidate
          return
        }
      }
    })

    return validation
  }

  const translation = useTextTranslation()

  const handleUploadAttachment = async (
    data: UploadAttachment,
    params: ParamCreateURLAttachment
  ) => {
    const { CreateAttachmentSASURL } = data
    if (!params?.file) return
    return await AzureStorageService.uploadFileToAzure({
      url: CreateAttachmentSASURL.url,
      file: params?.file,
    })
  }

  const { handleGetUrlDownload } = useGetUrlGetAttachment({
    callbackSuccess: handleUploadAttachment,
  })

  //version 2 upload
  const handleChangeFiles = async (fileUploads: File[]) => {
    if (!changed.current) changed.current = true

    const listFileUpload: ParamCreateURLAttachment[] = []
    //validation each file
    const validate = validateFiles({
      files: fileUploads,
      lengthFileCurrent: listFile.length + fileUploads.length,
      fieldValidate: {
        regex: regexString,
        maxFile: maxFile,
        maxSize: maxSize,
      },
    })

    if (!validate.status) {
      toast.error(validate.msgError)
      // setLoading(false)
      return
    }

    //create property for each file
    fileUploads.forEach((file) => {
      const uuid = uuidv4()
      const paramUpload: ParamCreateURLAttachment = {
        id: uuid,
        folder: 'candidate',
        fileName: file.name,
        action: 'UPLOAD',
        file: file,
      }

      listFileUpload.push(paramUpload)
    })

    //list promise get urls from azure
    const getUrlAzures = listFileUpload.map((fileUpload) => {
      return new Promise((resolve, reject) => {
        resolve(handleGetUrlDownload(fileUpload))
      })
        .then((response: any) => {
          return {
            url: response.CreateAttachmentSASURL.url,
            file: fileUpload,
          }
        })
        .catch((error) => {
          toast.error((error as Error).message)
          // setLoading(false)
          return Promise.reject(error)
        })
    })
    const listUrlAzure = await Promise.all(getUrlAzures).then((values) => {
      return values
    })

    //handle upload
    const newFiles: FileUploadAttachment[] = listUrlAzure.map((itemFile) => {
      const { file, url } = itemFile

      return {
        document_id: file.id,
        document_name: file.fileName,
        file: file.file as File,
        url,
        status: 'init',
      }
    })

    setListFile((prev) => [...prev, ...newFiles])
  }

  const handleChangeStatusFile = ({ document_id, status }: ParamUploadFile) => {
    setListFile((prev) =>
      prev.map((file) => {
        if (file.document_id !== document_id) return file

        return {
          ...file,
          status,
        }
      })
    )
  }

  const handleRemoveFile = (document_id: string) => {
    const filterFile = listFile.filter((file, _) => {
      return file.document_id !== document_id
    })
    setListFile(filterFile)
  }

  useEffect(() => {
    if (changed.current) {
      callbackFileChange?.(listFile)
    }
  }, [listFile])

  return (
    <InputFileWrapper>
      <label htmlFor={idFile}>
        <InputFileContainer
          onDragOver={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
          }}
          onDrop={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            const fileEvent = event.dataTransfer.files
            const listFileSelected = []

            if (fileEvent) {
              for (let i = 0; i < fileEvent?.length; i++) {
                listFileSelected.push(fileEvent[i])
              }
              handleChangeFiles(listFileSelected)
            }
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
      {!isEmpty(listFile) && (
        <ListFile>
          {listFile.map((itemFile) => {
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
      )}

      <input
        type="file"
        id={idFile}
        name="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(event) => {
          const fileEvent = event.target.files
          const listFileSelected = []

          if (fileEvent) {
            for (let i = 0; i < fileEvent?.length; i++) {
              listFileSelected.push(fileEvent[i])
            }
            handleChangeFiles(listFileSelected)
          }
          event.target.value = ''
        }}
      />
    </InputFileWrapper>
  )
}

export default InputFile
