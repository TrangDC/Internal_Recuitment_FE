import { Box } from '@mui/system'
import IconScreen from 'shared/components/utils/IconScreen'
import TabCustomize from 'shared/components/tab'
import MicroScope from 'shared/components/icons/Microscope'
import ListApprovalPending from '../page-sections/ListApprovalPending'
import ListApprovalRejected from '../page-sections/ListApprovalRejected'
import useCountJobPending from 'layouts/components/my-approval-title/hooks/useCountJobPending'
import { BoxCircle } from 'shared/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { TinyText } from 'shared/components/form/styles'

const MyApproval = () => {
  const { totalRecord } = useCountJobPending()

  const renderItem = [
    {
      label: <FlexBox gap={1.25} alignItems={'center'}> Pending <BoxCircle>
        <TinyText>{totalRecord}</TinyText>
      </BoxCircle></FlexBox>, Component: ListApprovalPending
    },
    { label: 'Rejected', Component: ListApprovalRejected },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={MicroScope} textLabel="My approval" />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default MyApproval
