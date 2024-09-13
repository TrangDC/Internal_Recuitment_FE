import { Box } from '@mui/material'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import OfferedLost from './Hired'
import Failed from './Failed'
import { Span, Tiny12md } from 'shared/components/Typography'
import Processing from '../charts/ProcessingReport'
import { ReportFilter } from 'shared/schema/chart/report'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { BtnPrimary } from 'shared/styles'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { useCallback, useRef } from 'react'

interface ApplicationReportPopupProps {
  open: boolean
  setOpen: (value: boolean) => void
  filters: ReportFilter
  labelBy: string
  teamSelected: {
    title: string
    value: string
  }
}

export interface ProcessingRef {
  onExport: () => void;
}

function ApplicationReportModal(props: ApplicationReportPopupProps) {
  const { open, setOpen, filters, labelBy, teamSelected } = props
  const reportRef = useRef<ProcessingRef | null>(null);

  const renderItem = [
    {
      label: 'Processing',
      Component: () => <Processing filters={filters} ref={reportRef}/>,
    },
    { label: 'Failed', Component: () => <Failed filters={filters} ref={reportRef}/> },
    {
      label: 'Hired',
      Component: () => <OfferedLost filters={filters} ref={reportRef}/>,
    },
  ]

  const onExport = useCallback(() => {
    if(reportRef.current?.onExport) {
      return reportRef.current?.onExport();
    }

    return {}
  }, [reportRef.current])

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} >
      <BaseModal.Header
        title="Applicant report"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain sxContentMain={{ padding: 0 }}>
        <Box
          sx={{ backgroundColor: '#F0F1F8' }}
          padding={2}
          position={'relative'}
        >
          <TabCustomize renderItem={renderItem} />
          <FlexBox position={'absolute'} top={30} right={16} gap={1.25} alignItems={'center'}>
            <FlexBox alignItems={'center'} gap={0.5}>
              <Tiny12md color={'#4D607A'}>
                Hiring team
              </Tiny12md>
              <Span sx={{ fontSize: '13px', color: '#0B0E1E', fontWeight: 600 }}>{teamSelected?.title}</Span>
            </FlexBox>
            <Span height={'20px'} overflow={'hidden'}> | </Span>
            <Tiny12md color={'#4D607A'}>
              {labelBy}
            </Tiny12md>
          </FlexBox>
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

export default ApplicationReportModal
