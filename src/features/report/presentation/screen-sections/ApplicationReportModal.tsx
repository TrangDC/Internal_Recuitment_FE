import { Box } from '@mui/material'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import OfferedLost from '../screen-sections/OfferedLost'
import KIV from '../screen-sections/KIV'
import { Tiny12md } from 'shared/components/Typography'
import Processing from '../charts/ProcessingReport'
import { ReportFilter } from 'shared/schema/chart/report'
import useGetApplicantReportByStatusReport from 'features/report/hooks/useGetApplicantReportByStatusReport'

interface ApplicationReportPopupProps {
  open: boolean
  setOpen: (value: boolean) => void
  filters: ReportFilter
  labelBy: string
}

function ApplicationReportModal(props: ApplicationReportPopupProps) {
  const { open, setOpen, filters, labelBy } = props
  const { kivData, offerLostData, processingData } =
    useGetApplicantReportByStatusReport({
      filters,
    })
  const renderItem = [
    {
      label: 'Processing',
      Component: () => <Processing data={processingData} />,
    },
    { label: 'KIV', Component: () => <KIV data={kivData} /> },
    {
      label: 'Offered lost',
      Component: () => <OfferedLost data={offerLostData} />,
    },
  ]
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
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
          <Tiny12md color={'#4D607A'} position={'absolute'} top={30} right={16}>
            {labelBy}
          </Tiny12md>
        </Box>
      </BaseModal.ContentMain>
    </BaseModal.Wrapper>
  )
}

export default ApplicationReportModal
