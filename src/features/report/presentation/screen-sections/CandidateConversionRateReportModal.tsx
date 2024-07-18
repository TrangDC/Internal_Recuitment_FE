import { Box } from '@mui/material'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import { Tiny12md } from 'shared/components/Typography'
import ByHiringTeamTable from './ByHiringTeamTable'
import { ReportFilter } from 'shared/schema/chart/report'

interface CandidateConversionRateReportModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  filters: ReportFilter
  labelBy: string
}

function CandidateConversionRateReportModal(
  props: CandidateConversionRateReportModalProps
) {
  const { open, setOpen, filters, labelBy } = props
  const renderItem = [
    {
      label: 'By Hiring team',
      Component: () => <ByHiringTeamTable />,
    },
  ]
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
          <Tiny12md color={'#4D607A'} position={'absolute'} top={30} right={16}>
            {filters.filter_period === 'all' ? 'All' : labelBy}
          </Tiny12md>
        </Box>
      </BaseModal.ContentMain>
    </BaseModal.Wrapper>
  )
}

export default CandidateConversionRateReportModal
