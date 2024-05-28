import { Box, styled } from '@mui/material'
import FlexBox from '../flexbox/FlexBox'
import UploadIcon from '../icons/UploadIcon'
import { Span, Tiny } from '../Typography'
import { DragEvent, Fragment, useMemo, useState } from 'react'
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
  callbackFileChange?: (data: FileAttachment[]) => void
  maxFile?: number
  maxSize?: number | null
  showList?: boolean
  descriptionFile?: () => React.ReactNode
  multiple?: boolean,
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
  descriptionFile,
  multiple = true,
}: InputFileProps) => {
  const [files, setFiles] = useState<FileAttachment[]>([])
  const idFile = useMemo(() => {
    return uuidv4()
  }, [])

  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveFile = (idx: number) => {
    const filterFile = files.filter((file, _) => {
      return _ !== idx
    })
    setFiles(filterFile)
    callbackFileChange && callbackFileChange(filterFile)
  }

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
    return await UploadFileAttachment(CreateAttachmentSASURL.url, params?.file)
  }

  const { handleGetUrlDownload } = useGetUrlGetAttachment({
    callbackSuccess: handleUploadAttachment,
  })

  //version 2 upload
  const handleChangeFiles = async (fileUploads: File[]) => {
    const listFileUpload: ParamCreateURLAttachment[] = []
    //validation each file
    const validate = validateFiles({
      files: fileUploads,
      lengthFileCurrent: files.length + fileUploads.length,
      fieldValidate: {
        regex: regexString,
        maxFile: maxFile,
        maxSize: maxSize,
      },
    })

    if (!validate.status) {
      toast.error(validate.msgError)
      setLoading(false);
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
          setLoading(false);
          return Promise.reject(error)
        })
    })
    const listUrlAzure = await Promise.all(getUrlAzures).then((values) => {
      return values
    })

    //list promise upload azure storage
    const promisesUploadAzure = listUrlAzure.map((azureFile) => {
      return new Promise((resolve, reject) => {
        const { file } = azureFile
        resolve(UploadFileAttachment(azureFile.url, file?.file as File))
      })
        .then((response: any) => {
          return azureFile
        })
        .catch((error) => {
          toast.error((error as Error).message)
          setLoading(false);
          return Promise.reject(error)
        })
    })
    const listUrlAzureUpload = await Promise.all(promisesUploadAzure)
      .then((values) => {
        return values
      })
      .catch((error) => {
        throw error
      })

    const fileEnabled = listUrlAzureUpload.map((item) => {
      return {
        id: item?.file?.id,
        name: item?.file?.fileName,
        file: item?.file?.file,
      }
    })
    const filesUpload = [...files, ...fileEnabled]
    //@ts-ignore
    setFiles(filesUpload)
    callbackFileChange?.(filesUpload as FileAttachment[])

    //loading
    setLoading(false);
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
        multiple={multiple}
        hidden
        onChange={(event) => {
          //setLoading
          setLoading(true);

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
