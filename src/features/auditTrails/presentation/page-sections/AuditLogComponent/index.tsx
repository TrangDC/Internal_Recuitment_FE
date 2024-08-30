import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import DateIcon from 'shared/components/icons/DateIcon'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { format } from 'date-fns'
import AuditTrailsList from 'features/auditTrails/presentation/page-sections/AuditTrailsList'
import {
  DateFieldContainer,
  DateFieldHeader,
  DateFieldIcon,
  DateFieldTime,
  StyleDivider,
} from '../../providers/styles'
import { Box } from '@mui/material'
import { useContextAuditTrails } from '../../providers/context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularLoading } from 'features/jobs/presentation/page-sections/AllJobRequest/styles'
import Scrollbar from 'shared/components/ScrollBar'

const LogsComponent = () => {
  const { data, actions, total_data } = useContextAuditTrails()
  const { fetchNextPage } = actions
  const { total, total_current } = total_data

  return (
    <FlexBox flexDirection={'column'} gap={'16px'}>
      <InfiniteScroll
        dataLength={total_current}
        next={fetchNextPage}
        hasMore={total > total_current}
        loader={
          <Box sx={{ marginTop: 1 }}>
            <CircularLoading />
          </Box>
        }
      >
        <Scrollbar>
          {data.map((auditrail) => {
            const record_changes = JSON.parse(auditrail.record_changes)

            return (
              <DateFieldContainer key={auditrail.id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                  >
                    <DateFieldHeader>
                      <DateFieldIcon>
                        <DateIcon />
                      </DateFieldIcon>
                      <DateFieldTime>
                        <Span
                          color={'#2A2E37 !important'}
                          textTransform={'capitalize'}
                        >
                          {auditrail.actionType}
                        </Span>
                        <Span color={'#2A2E37 !important'}>
                          {' '}
                          {format(
                            new Date(auditrail.updatedAt),
                            'dd-MM-yyyy HH:mm:ss'
                          )}
                        </Span>
                        <Tiny>Reason: {auditrail.note}</Tiny>
                        <Tiny>Create by: {auditrail?.createdInfo?.name}</Tiny>
                      </DateFieldTime>
                    </DateFieldHeader>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AuditTrailsList record_changes={record_changes} />
                  </AccordionDetails>
                </Accordion>
                <StyleDivider orientation="horizontal" />
              </DateFieldContainer>
            )
          })}
        </Scrollbar>
      </InfiniteScroll>
    </FlexBox>
  )
}

export default LogsComponent
