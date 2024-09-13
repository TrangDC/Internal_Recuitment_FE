import { Box } from '@mui/material'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import ByHiringTeamTable from './ByHiringTeamTable'
import { ReportFilter } from 'shared/schema/chart/report'
import ByJobPositionTable from './ByJobPositionTable'
import { BtnPrimary } from 'shared/styles'
import { Span } from 'shared/components/Typography'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { useCallback, useRef } from 'react'

interface CandidateConversionRateReportModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  filters: ReportFilter
  labelBy: string
}

export interface ProcessingRef {
  onExport: () => void;
}

function CandidateConversionRateReportModal(
  props: CandidateConversionRateReportModalProps
) {
  const { open, setOpen, filters, labelBy } = props
  const reportRef = useRef<ProcessingRef | null>(null);

  const renderItem = [
    {
      label: 'By Hiring team',
      Component: () => <ByHiringTeamTable ref={reportRef}/>,
    },
    {
      label: 'By Job position',
      Component: () => <ByJobPositionTable ref={reportRef}/>,
    },
  ]

  const onExport = useCallback(() => {
    if(reportRef.current?.onExport) {
      return reportRef.current?.onExport();
    }

    return {}
  }, [reportRef.current])

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Candidate conversion rate report"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain sxContentMain={{ padding: 0 }}>
        <Box
          sx={{ backgroundColor: '#F0F1F8' }}
          padding={2}
          position={'relative'}
        >
          <TabCustomize renderItem={renderItem} />
        </Box>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <BtnPrimary
        onClick={() => onExport()}
        >
          <DownloadIcon sx={{ color: '#1F84EB', fontSize: '15px' }} /><Span>Export</Span>
        </BtnPrimary>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CandidateConversionRateReportModal
