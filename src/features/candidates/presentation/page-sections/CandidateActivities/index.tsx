import { Box } from '@mui/system'
import TabCustomize from 'shared/components/tab'
import AllTab from './AllTab'
import CallTab from './CallTab'
import EmailTab from './EmailTab'
import FeedbackTab from './FeedbackTab'
import InterviewTab from './InterviewTab'
import NoteTab from './NoteTab'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'

const WrapperTab = (note: () => JSX.Element) => {
  return (
    <FlexBox flexDirection={'column'} height={'67vh'} width={'100%'}>
      <Scrollbar>{note()}</Scrollbar>
    </FlexBox>
  )
}

const CandidateActivities = () => {
  const renderItem = [
    { label: 'All', Component: () => WrapperTab(AllTab) },
    { label: 'Notes', Component: () => WrapperTab(NoteTab) },
    { label: 'Calls', Component: () => WrapperTab(CallTab) },
    { label: 'Interviews ', Component: () => WrapperTab(InterviewTab) },
    { label: 'Feedbacks', Component: () => WrapperTab(FeedbackTab) },
    { label: 'Emails', Component: () => WrapperTab(EmailTab) },
  ]

  return (
    <Box padding={2} width="100%">
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
      ></TabCustomize>
    </Box>
  )
}

export default CandidateActivities
