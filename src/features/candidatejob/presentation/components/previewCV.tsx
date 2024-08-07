import { Box } from '@mui/material'
import AppButton from 'shared/components/buttons/AppButton'
import FlexBox from 'shared/components/flexbox/FlexBox'
import icons from 'shared/components/icons'
import { Document, Page, pdfjs } from 'react-pdf'
import { downloadFile, openPDFInNewTab } from 'shared/utils/upload-file'
import DownloadWhiteIcon from 'shared/components/icons/DownloadWhiteIcon'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

interface IPreviewCV {
  pdfUrl: string
  pageNumber: number
}

function PreviewCV({ pdfUrl, pageNumber }: IPreviewCV) {
  function onDownload() {
    if (pdfUrl) downloadFile(pdfUrl, 'downloaded_file')
  }

  function onPreview() {
    if (pdfUrl) openPDFInNewTab(pdfUrl)
  }
  return (
    <Box
      width={170}
      height={240}
      position={'relative'}
      borderRadius={'4px'}
      border={'hidden'}
    >
      <Document file={pdfUrl} renderMode="canvas" error="">
        <Page
          pageNumber={pageNumber}
          height={240}
          width={170}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
      <Box
        width={'100%'}
        height={'100%'}
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{ backgroundColor: '#00000040' }}
        borderRadius={'4px'}
      ></Box>
      <FlexBox
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        flexDirection={'column'}
        zIndex={2}
        gap={1}
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <AppButton
          size="small"
          startIcon={<icons.RemoveRedEye />}
          variant="outlined"
          sx={{
            height: 26,
            justifyContent: 'start',
          }}
          onClick={onPreview}
        >
          Preview
        </AppButton>
        <AppButton
          size="small"
          startIcon={<DownloadWhiteIcon />}
          variant="contained"
          sx={{
            height: 26,
            justifyContent: 'start',
          }}
          onClick={onDownload}
        >
          Download
        </AppButton>
      </FlexBox>
    </Box>
  )
}

export default PreviewCV
