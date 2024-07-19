import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { convertSizeToMb } from 'shared/utils/utils'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import { toast } from 'react-toastify'
import { ParamUploadFile, UploadStatus } from 'shared/interfaces'
import AzureStorageService from 'services/azure-storage-services'
import FlexBox from 'shared/components/flexbox/FlexBox'
import FileIcon from 'shared/components/icons/FileIcon'
import { Span, Tiny } from 'shared/components/Typography'
import { ItemFile, NameFIle } from '../styles'

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

interface UploadFileComponentProps {
  file: File
  IconEnd?: React.ReactNode
  document_id: string
  document_name: string
  url?: string
  status: UploadStatus
  onSuccess?: ({ document_id, file, url, status }: ParamUploadFile) => void
  onError?: ({ document_id, file, url, status }: ParamUploadFile) => void
  onUploading?: ({ document_id, file, url, status }: ParamUploadFile) => void
}

const UploadFileComponent = ({
  IconEnd,
  file,
  url,
  document_id,
  document_name,
  onError,
  onUploading,
  onSuccess,
  status,
}: UploadFileComponentProps) => {
  const [progress, setProgress] = useState<number>(0)
  const progressRef = useRef<number>(0)

  useEffect(() => {
    ;(async () => {
      if(!url) return;

      try {
        await AzureStorageService.uploadFileToAzure({
          url,
          file,
          onProgress: (progress_current) => {
            onUploading?.({ document_id, file, url, status: 'uploading' })
            if (progress_current > progressRef.current) {
              progressRef.current = progress_current
              setProgress(progress_current)
            }
          },
        })
        onSuccess?.({ document_id, file, url, status: 'success' })
      } catch (error) {
        onError?.({ document_id, file, url, status: 'error' })
        toast.error((error as Error).message)
        Promise.reject(error)
      }
    })()
  }, [])

  return (
    <ItemFile className={status === 'error' ? 'error_file' : ''}>
      <FlexBox gap={'10px'} alignItems={'center'}>
        <FileIcon />
      </FlexBox>
      <FlexBox width={'100%'} flexDirection={'column'}>
        <NameFIle className="name_file">
          <Tiny>{document_name}</Tiny>
          <Span>{file?.size && convertSizeToMb(file?.size)}</Span>
        </NameFIle>
        <Box>
          {status && status !== 'error' && status !== 'success' && (
            <LinearProgressWithLabel value={progress} />
          )}
        </Box>
      </FlexBox>
      <FlexBox sx={{ cursor: 'pointer' }}>{IconEnd && IconEnd}</FlexBox>
    </ItemFile>
  )
}

export default UploadFileComponent
