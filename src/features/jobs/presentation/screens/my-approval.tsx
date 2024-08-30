import { Box } from '@mui/system'
import IconScreen from 'shared/components/utils/IconScreen'
import TabCustomize from 'shared/components/tab'
import MicroScope from 'shared/components/icons/Microscope'
import ListApprovalPending from '../page-sections/ListApprovalPending'
import ListApprovalRejected from '../page-sections/ListApprovalRejected'

const MyApproval = () => {
  const renderItem = [
    { label: 'Pending', Component: ListApprovalPending },
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
