import { Box, styled } from '@mui/material'
import FlexBox from '../flexbox/FlexBox'
import UploadIcon from '../icons/UploadIcon'
import { Span, Tiny } from '../Typography'
import { DragEvent, useState } from 'react'
import TrashIcon from '../icons/TrashIcon'
import toastError from '../toast/toastError'
import useTextTranslation from 'shared/constants/text'
import ShowFile from './ItemFile'

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

interface InputFileProps {
  accept?: string
  regexString?: string
  msgError?: string
  callbackFileChange?: (data: File[]) => void
}

const InputFile = ({
  accept = '*/*',
  regexString = '\\.(pdf|docx?|jpe?g|png|gif|bmp|tiff)$',
  msgError = 'File input not valid!',
  callbackFileChange,
}: InputFileProps) => {
  const [files, setFiles] = useState<File[]>([])

  const handleRemoveFile = (idx: number) => {
    const filterFile = files.filter((file, _) => {
      return _ !== idx
    })
    setFiles(filterFile)
  }

  function validateFile(blob: File, regexString: string) {
    const filename = blob.name || ''
    const regex = new RegExp(regexString)
    return regex.test(filename.toLowerCase())
  }

  const translation = useTextTranslation()

  return (
    <InputFileWrapper>
      <label htmlFor="file">
        <InputFileContainer
          onDragOver={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
          }}
          onDrop={(event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            const filesValue = event.dataTransfer.files
            const fileUpload = filesValue[0]
            const validate = validateFile(fileUpload, regexString)
            if (!validate) {
              toastError(msgError)
              return
            }

            const filesUpload = [...files, fileUpload]
            setFiles(filesUpload)
            callbackFileChange && callbackFileChange(filesUpload)
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

      <ListFile>
        {files.map((file, index) => {
          return (
            <ShowFile
              name={file.name}
              size={file.size}
              key={index}
              IconEnd={<TrashIcon onClick={() => handleRemoveFile(index)} />}
            />
          )
        })}
      </ListFile>
      <input
        type="file"
        id="file"
        name="file"
        accept={accept}
        multiple
        hidden
        onChange={(event) => {
          const files = event.target.files
          if (files) {
            const fileUpload = files[0]
            setFiles((prev) => [...prev, fileUpload])
          }
          event.target.value = ''
        }}
      />
    </InputFileWrapper>
  )
}

export default InputFile
