import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { convertSizeToMb } from 'shared/utils/utils'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import { toast } from 'react-toastify'
import AzureStorageService from 'services/azure-storage-services'
import FlexBox from 'shared/components/flexbox/FlexBox'
import FileIcon from 'shared/components/icons/FileIcon'
import { Span, Tiny } from 'shared/components/Typography'
import TrashIcon from 'shared/components/icons/TrashIcon'
import { ParamUploadFile, UploadStatus } from '../types'
import { ItemFile, NameFIle } from '../style'

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

interface FileBoxProps {
  file: File | null
  IconEnd?: React.ReactNode
  document_id: string
  document_name: string
  url: string
  status: UploadStatus
  onSuccess?: (params: ParamUploadFile) => void
  onError?: (params: ParamUploadFile) => void
  onUploading?: (params: ParamUploadFile) => void
  onDelete: () => void
}

type FileState = {
  status: UploadStatus
  progress: number
}

const FileBox = ({
  IconEnd,
  file,
  url,
  document_id,
  document_name,
  onUploading,
  status,
  onDelete,
  onError,
  onSuccess,
}: FileBoxProps) => {
  const [fileState, setFileState] = useState<FileState>({
    progress: 0,
    status: status,
  })
  const progressRef = useRef<number>(0)
  useEffect(() => {
    ;(async () => {
      if (!url) return
      try {
        if (file && status === 'new') {
          await AzureStorageService.uploadFileToAzure({
            url,
            file,
            onProgress: (progress_current) => {
              if (progress_current > progressRef.current) {
                progressRef.current = progress_current
                setFileState({
                  progress: progress_current,
                  status: 'uploading',
                })
                onUploading?.({ document_id, status: fileState.status })
              }
            },
          })
          setFileState({ progress: 0, status: 'success' })
          onSuccess?.({ document_id, status: fileState.status })
        }
      } catch (error) {
        setFileState({ progress: 0, status: 'error' })
        toast.error((error as Error).message)
        onError?.({ document_id, status: fileState.status })
        Promise.reject(error)
      }
    })()
  }, [])

  return (
    <ItemFile
      className={fileState.status === 'error' ? 'error_file' : ''}
      maxWidth={'250px'}
    >
      <FlexBox gap={'10px'} alignItems={'center'}>
        <FileIcon />
      </FlexBox>
      <FlexBox width={'100%'} flexDirection={'column'}>
        <NameFIle className="name_file">
          <Tiny
            sx={{
              maxWidth: '150px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {document_name}
          </Tiny>
          <Box>
            {fileState.status === 'uploading' ? (
              <LinearProgressWithLabel value={fileState.progress} />
            ) : (
              <Span>{file?.size && convertSizeToMb(file?.size)}</Span>
            )}
          </Box>
        </NameFIle>
      </FlexBox>
      <FlexBox sx={{ cursor: 'pointer' }}>
        {IconEnd ? IconEnd : <TrashIcon onClick={onDelete} />}
      </FlexBox>
    </ItemFile>
  )
}

export default FileBox
