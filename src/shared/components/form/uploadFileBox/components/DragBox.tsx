import { Box, styled, SxProps } from '@mui/material'
import { Fragment, useMemo } from 'react'
import useTextTranslation from 'shared/constants/text'
import { v4 as uuidv4 } from 'uuid'
import UploadIcon from 'shared/components/icons/UploadIcon'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

export const DragBoxStyled = styled(Box)(({ theme }) => ({
  border: '2px dashed #88CDFF',
  cursor: 'pointer',
  height: '100%',
  padding: '5px',
  textAlign: 'center',
  borderRadius: '4px',
  backgroundColor: 'white',
}))

export interface DragBoxProps {
  accept?: string
  descriptionFile?: () => React.ReactNode
  multiple?: boolean
  handleChangeFiles: (value: File[]) => void
  name: string
  boxContainerSx?: SxProps
  Icon?: React.ReactNode
}

const DragBox = ({
  accept = '.jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .odt, .xls, .xlsx, .ods, .ppt, .pptx, .odp, .mp4, .avi, .mkv, .mov',
  descriptionFile,
  multiple = true,
  handleChangeFiles,
  boxContainerSx,
  name,
  Icon,
}: DragBoxProps) => {
  const idFile = useMemo(() => {
    return uuidv4()
  }, [])

  const translation = useTextTranslation()

  const handleGetFile = (fileEvent: FileList) => {
    if (!fileEvent) return []
    const list_file = []

    for (let i = 0; i < fileEvent?.length; i++) {
      list_file.push(fileEvent[i])
    }
    handleChangeFiles(list_file)
  }

  return (
    <Box>
      <label
        htmlFor={idFile}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <DragBoxStyled
          onDragOver={(event) => {
            event.preventDefault()
          }}
          onDrop={(event) => {
            event.preventDefault()
            const fileEvent = event.dataTransfer.files
            handleGetFile(fileEvent)
          }}
          sx={boxContainerSx}
        >
          <FlexBox gap={1}>
            <Box>{Icon ? Icon : <UploadIcon />}</Box>
            <Box>
              {descriptionFile ? (
                descriptionFile()
              ) : (
                <Fragment>
                  <Tiny>{translation.COMMON.drag_and_drop}</Tiny>
                  <Span>{translation.COMMON.browse_file}</Span>
                </Fragment>
              )}
            </Box>
          </FlexBox>
        </DragBoxStyled>
      </label>
      <input
        type="file"
        id={idFile}
        name={name}
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(event) => {
          const fileEvent = event.target.files
          handleGetFile(fileEvent as FileList)
          event.target.value = ''
        }}
      />
    </Box>
  )
}

export default DragBox
