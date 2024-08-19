import { Box } from '@mui/system'
import TabCustomize from 'shared/components/tab'
import AllTab from './AllTab'
import CallTab from './CallTab'
import EmailTab from './EmailTab'
import FeedbackTab from './FeedbackTab'
import InterviewTab from './InterviewTab'
import NoteTab from './NoteTab'
import { CandidateActivityProvider } from 'features/candidates/shared/context/CandidateActivityContext'
import BoxFilter from './BoxFilter'

const CandidateActivities = () => {
  const renderItem = [
    { label: 'All', Component: AllTab },
    { label: 'Notes', Component: NoteTab },
    { label: 'Calls', Component: CallTab },
    { label: 'Interviews ', Component: InterviewTab },
    { label: 'Feedbacks', Component: FeedbackTab },
    { label: 'Emails', Component: EmailTab },
  ]

  return (
    <CandidateActivityProvider>
      <Box padding={2} width="100%" height={'calc(80vh - 48px)'}>
        <BoxFilter />
        <TabCustomize
          renderItem={renderItem}
          tabWrapperSx={{
            color: '#4D607A',
            borderBottom: 'none',
            backgroundColor: 'white',
            boxShadow: 'none',
            '&.Mui-selected': {
              fontWeight: '500',
              borderBottom: 'none',
            },
          }}
          boxSx={{
            boxShadow: 'none',
          }}
          tabPanelSx={{
            boxShadow: 'none',
          }}
        ></TabCustomize>
      </Box>
    </CandidateActivityProvider>
  )
}

export default CandidateActivities
