import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import DateIcon from 'shared/components/icons/DateIcon'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import AuditTrailsList from 'features/auditTrails/presentation/page-sections/AuditTrailsList'
import { forwardRef, useImperativeHandle } from 'react'
import useAuditTrails from 'features/auditTrails/presentation/providers/hooks/useAuditTrails'
import useTextTranslation from 'shared/constants/text'
import { DateFieldContainer, DateFieldHeader, DateFieldIcon, DateFieldTime, StyleDivider } from '../../providers/styles'

interface Props {
  module: string,
}

const LogsComponent = ({module}: Props, ref:any) => {
  const { id } = useParams()
  const { auditrails_history, handleFilter, handleFreeWord } = useAuditTrails(id as string, module) 

  const translation = useTextTranslation();

  useImperativeHandle(ref, () => {
    return {
      handleFilter,
      handleFreeWord,
    };
  }, []);

  return (
    <FlexBox flexDirection={'column'} gap={'16px'}>
      {auditrails_history.map((auditrail) => {
        const record_changes = JSON.parse(auditrail.record_changes)
        console.log("🚀 ~ record_changes:", record_changes)

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
                    <Span>
                      {translation.COMMON.update} {format(new Date(auditrail.updatedAt), 'dd-MM-yyyy HH:mm:ss')}
                    </Span>
                    <Tiny>{auditrail.note}</Tiny>
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
