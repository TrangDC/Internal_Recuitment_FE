import { Box } from '@mui/material'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import OfferedLost from './Hired'
import Failed from './Failed'
import { Span, Tiny12md } from 'shared/components/Typography'
import Processing from '../charts/ProcessingReport'
import { ReportFilter } from 'shared/schema/chart/report'
import FlexBox from 'shared/components/flexbox/FlexBox'

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

function ApplicationReportModal(props: ApplicationReportPopupProps) {
  const { open, setOpen, filters, labelBy, teamSelected } = props
  
  const renderItem = [
    {
      label: 'Processing',
      Component: () => <Processing filters={filters} />,
    },
    { label: 'Failed', Component: () => <Failed filters={filters} /> },
    {
      label: 'Hired',
      Component: () => <OfferedLost filters={filters} />,
    },
  ]

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
            <Span sx={{fontSize: '13px', color: '#0B0E1E', fontWeight: 600}}>{teamSelected?.title}</Span>
           </FlexBox>
            <Span height={'20px'} overflow={'hidden'}> | </Span>
            <Tiny12md color={'#4D607A'}>
              {labelBy}
            </Tiny12md>
          </FlexBox>
        </Box>
      </BaseModal.ContentMain>
    </BaseModal.Wrapper>
  )
}

export default ApplicationReportModal
