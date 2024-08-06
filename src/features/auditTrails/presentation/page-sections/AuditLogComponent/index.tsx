import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import DateIcon from 'shared/components/icons/DateIcon'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { format } from 'date-fns'
import AuditTrailsList from 'features/auditTrails/presentation/page-sections/AuditTrailsList'
import { forwardRef, useImperativeHandle } from 'react'
import useAuditTrails from 'features/auditTrails/presentation/providers/hooks/useAuditTrails'
import {
  DateFieldContainer,
  DateFieldHeader,
  DateFieldIcon,
  DateFieldTime,
  StyleDivider,
} from '../../providers/styles'

interface Props {
  module: string
  id: string
}

const LogsComponent = ({ module, id }: Props, ref: any) => {
  const { auditrails_history, handleMultipleFilter, handleFreeWord } = useAuditTrails(
    id as string,
    module
  )

  useImperativeHandle(
    ref,
    () => {
      return {
        handleMultipleFilter,
        handleFreeWord,
      }
    },
    []
  )

  return (
    <FlexBox flexDirection={'column'} gap={'16px'}>
      {auditrails_history.map((auditrail) => {
        const record_changes = JSON.parse(auditrail.record_changes)
        console.log("🚀 ~ {auditrails_history.map ~ record_changes:", record_changes)

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
    </FlexBox>
  )
}

export default forwardRef(LogsComponent)
