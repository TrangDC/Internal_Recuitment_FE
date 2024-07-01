import FlexBox from 'shared/components/flexbox/FlexBox'
import BoxCandidate from './BoxCandidate'
import Scrollbar from 'shared/components/ScrollBar'
import BoxTextSquare from 'shared/components/utils/boxText'
import { Box } from '@mui/material'
import { Span } from 'shared/components/Typography'
import { useContextChangeStatus } from '../context/ChangeStatusContext'

const ListCandidate = () => {
  const {
    applied,
    interviewing,
    offering,
    hired,
    kiv,
    offerLost,
    exStaff,
    handleSeeMore,
    enabledShowMore,
  } = useContextChangeStatus()

  return (
    <Scrollbar>
      <FlexBox
        sx={{
          padding: '12px',
        }}
        gap={'6px'}
      >
        <BoxCandidate
          title="APPLIED"
          number_candidates={applied?.length}
          status="applied"
          list_candidates={applied}
        />

        <BoxCandidate
          title="INTERVIEWING"
          number_candidates={interviewing?.length}
          status="interviewing"
          list_candidates={interviewing}
        />
        <BoxCandidate
          title="OFFERING"
          number_candidates={offering?.length}
          status="offering"
          list_candidates={offering}
        />
        <BoxCandidate
          title="HIRED"
          number_candidates={hired?.length}
          status="hired"
          list_candidates={hired}
          Note={
            <BoxTextSquare
              boxProps={{
                sx: {
                  background: '#D4FCEC',
                  color: '#20A4A9',
                },
              }}
              content="Success"
            />
          }
        />
        <BoxCandidate
          title="KIV"
          number_candidates={kiv?.length}
          status="kiv"
          list_candidates={kiv}
          Note={
            <BoxTextSquare
              boxProps={{
                sx: {
                  background: '#FFE4E1',
                  color: '#DB4E82',
                },
              }}
              content="Failed"
            />
          }
        />
        <BoxCandidate
          title="OFFERED LOST"
          number_candidates={offerLost?.length}
          status="offer_lost"
          list_candidates={offerLost}
          Note={
            <BoxTextSquare
              boxProps={{
                sx: {
                  background: '#FFE4E1',
                  color: '#DB4E82',
                },
              }}
              content="Failed"
            />
          }
        />
        <BoxCandidate
          title="EX-STAFF"
          number_candidates={exStaff?.length}
          status="ex_staff"
          list_candidates={exStaff}
        />
      </FlexBox>

      <Box
        sx={{
          padding: 2,
          cursor: 'pointer',
          display: enabledShowMore ? 'block' : 'none',
        }}
      >
        <Span onClick={handleSeeMore}>Show more</Span>
      </Box>
    </Scrollbar>
  )
}

export default ListCandidate
