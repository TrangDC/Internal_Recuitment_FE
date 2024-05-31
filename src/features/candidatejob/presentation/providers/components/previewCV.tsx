import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import AppButton from 'shared/components/buttons/AppButton'
import FlexBox from 'shared/components/flexbox/FlexBox'
import icons from 'shared/components/icons'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { pdfjs } from 'react-pdf'
import {
  downloadPdf,
  downloadPdfAndOpenInNewTab,
} from 'shared/utils/upload-file'
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [page, setPage] = useState<any>(null)
  useEffect(() => {
    const loadPage = async () => {
      if (pdfUrl) {
        const loadingTask = pdfjs.getDocument(pdfUrl)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(pageNumber)
        setPage(page)
      }
    }
    loadPage()
  }, [pdfUrl, pageNumber])

  useEffect(() => {
    if (page && canvasRef.current) {
      const viewport = page.getViewport({ scale: 0.5 })
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = 170
      canvas.height = 240
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }
      page.render(renderContext)
    }
  }, [page])

  function onDownload() {
    if (pdfUrl) downloadPdf(pdfUrl)
  }

  function onPreview() {
    if (pdfUrl) downloadPdfAndOpenInNewTab(pdfUrl)
  }
  return (
    <Box
      width={170}
      height={240}
      position={'relative'}
      borderRadius={'4px'}
      border={'hidden'}
    >
      <canvas ref={canvasRef} width={170} height={240}></canvas>
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
