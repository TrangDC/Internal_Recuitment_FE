import { Box, Divider, styled } from '@mui/material'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import DateIcon from 'shared/components/icons/DateIcon'
import FlexRowAlign from 'shared/components/flexbox/FlexRowAlign'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useParams } from 'react-router-dom'
import useJobHistoryLog from '../../providers/hooks/useActionHistory'
import { format } from 'date-fns'
import AuditTrailsList from 'features/auditTrails/presentation/page-sections/AuditTrailsList'
import { forwardRef, useImperativeHandle } from 'react'

const DateFieldContainer = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  gap: '16px',
  flexDirection: 'column',
  minHeight: '76px',
  position: 'relative',
  overflow: 'hidden',
}))

const DateFieldHeader = styled(FlexBox)(({ theme }) => ({
  gap: '12px',
}))

const DateFieldIcon = styled(FlexRowAlign)(({ theme }) => ({
  width: '36px',
  height: '36px',
  backgroundColor: '#CADFF1',
  borderRadius: '99px',

  '& svg': {
    width: '12px',
  },
}))

const DateFieldTime = styled(Box)(({ theme }) => ({
  '& p': {
    fontSize: '12px',
    lineHeight: '14.63px',
    fontWeight: 500,
    color: '#4D607A',
  },

  '& span': {
    fontSize: '13px',
    lineHeight: '15.85px',
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
}))

const StyleDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.text.secondary,
  position: 'absolute',
  width: '1px',
  height: '100%',
  top: '45px',
  left: '16px',
  maxHeight: '56px',
}))

interface Props {

}

const LogsComponent = (props: Props, ref:any) => {
  const { id } = useParams()
  const { job_history, handleFilter, handleFreeWord } = useJobHistoryLog(id as string)

  useImperativeHandle(ref, () => {
    return {
      handleFilter,
      handleFreeWord,
    };
  }, []);

  return (
    <FlexBox flexDirection={'column'} gap={'16px'}>
      {job_history.map((job) => {
        const record_changes = JSON.parse(job.record_changes)

        return (
          <DateFieldContainer key={job.id}>
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
                      UPDATE
                      {format(new Date(job.updatedAt), 'dd-MM-yyyy HH:mm:ss')}
                    </Span>
                    <Tiny>{job.note}</Tiny>
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
