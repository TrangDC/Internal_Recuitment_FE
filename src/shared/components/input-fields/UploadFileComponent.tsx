import { Box, styled, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import FileIcon from '../icons/FileIcon'
import { Span, Tiny } from '../Typography'
import { convertSizeToMb } from 'shared/utils/utils'
import { UploadFileToAzure } from 'services/handleAttachments'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import { toast } from 'react-toastify'
import { ParamUploadFile, UploadStatus } from 'shared/interfaces'

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

const ItemFile = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  padding: '6px 6px 6px 10px',
  border: `1px solid #88CDFF`,
  minHeight: '45px',
  alignItems: 'center',
  gap: '20px',
  backgroundColor: '#F1F9FF',
  borderRadius: '4px',

  '&.error_file': {
    borderColor: '#FF316F',
    backgroundColor: '#fcf4f2',
  },

  '&.error_file .name_file p': {
    color: 'red',
  },

  '&.error_file .name_file span': {
    color: 'red',
  },
}))

const NameFIle = styled(FlexBox)(({ theme }) => ({
  flexDirection: 'column',

  '& p': {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.grey[600],
  },

  '& span': {
    fontSize: '12px',
    fontWeight: 500,
    color: theme.palette.grey[400],
  },
}))

interface UploadFileComponentProps {
  file: File
  IconEnd?: React.ReactNode
  document_id: string
  document_name: string
  url: string
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
  const progressRef = useRef<number>(0);

  useEffect(() => {
    ;(async () => {
      try {
        await UploadFileToAzure({
          url,
          file,
          onProgress: (progress_current) => {
            onUploading?.({ document_id, file, url, status: 'uploading' })
            if (progress_current > progressRef.current) {
              progressRef.current = progress_current;
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
          <Span>{file.size && convertSizeToMb(file.size)}</Span>
        </NameFIle>
        <Box>
          {status !== 'error' && status !== 'success' && (
            <LinearProgressWithLabel value={progress} />
          )}
        </Box>
      </FlexBox>
      <FlexBox sx={{ cursor: 'pointer' }}>{IconEnd && IconEnd}</FlexBox>
    </ItemFile>
  )
}

export default UploadFileComponent
