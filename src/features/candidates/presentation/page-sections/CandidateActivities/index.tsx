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
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkPermissionTabCandidateActivities from 'features/candidates/permission/utils/checkPermissionTabCandidateActivities'
import AppMenuButtonSmall from 'shared/components/buttons/AppMenuButtonSmall'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import DocIcon from 'shared/components/icons/DocIcon'
import Cant from 'features/authorization/presentation/components/Cant'
import { useState } from 'react'
import CreateCandidateNoteModal from '../CreateCandidateNoteModal'
import CreateHistoryCallModal from '../CreateHistoryCallModal'

const CandidateActivities = () => {
  const { role } = useAuthorization()
  const renderItem = [
    { label: 'All', Component: AllTab },
    { label: 'Notes', Component: NoteTab },
    { label: 'Calls', Component: CallTab },
    { label: 'Interviews', Component: InterviewTab },
    { label: 'Feedbacks', Component: FeedbackTab },
    { label: 'Emails', Component: EmailTab },
  ]
  const newTabs = checkPermissionTabCandidateActivities(role, renderItem)
  const [open, setOpen] = useState(false)
  const [openHistoryCall, setOpenHistoryCall] = useState(false)

  return (
    <CandidateActivityProvider>
      <Box padding={2} width="100%" height={'calc(80vh - 48px)'}>
        <BoxFilter />
        <TabCustomize
          renderItem={newTabs}
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
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          tabPanelSx={{
            boxShadow: 'none',
          }}
          endPanel={
            <Cant
              module="CANDIDATE_ACTIVITIES"
              checkBy={{
                compare: 'hasAny',
                permissions: [
                  'CREATE.everything',
                  'CREATE.ownedOnly',
                  'CREATE.teamOnly',
                ],
              }}
            >
              <AppMenuButtonSmall
                options={[
                  {
                    Icon: <DocIcon sx={{ fontSize: '16px', color: '#4D607A' }} />,
                    title: 'Add note',
                    onClick() {
                      setOpen(true)
                    },
                  },
                  {
                    Icon: (
                      <PhoneIcon sx={{ fontSize: '16px', color: 'grey.500' }} />
                    ),
                    title: 'Add call',
                    onClick() {
                      setOpenHistoryCall(true)
                    },
                  },
                ]}
                title="Add activity"
              />
            </Cant>
          }
        ></TabCustomize>


      </Box>
      {open && <CreateCandidateNoteModal open={open} setOpen={setOpen} />}
      {openHistoryCall && (
        <CreateHistoryCallModal
          open={openHistoryCall}
          setOpen={setOpenHistoryCall}
        />
      )}
    </CandidateActivityProvider>
  )
}

export default CandidateActivities
