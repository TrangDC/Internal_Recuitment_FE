import {
  BoxButton,
  BoxText,
  BoxTitle,
  ChipItem,
  DivActionHeader,
  ListInterviewContainer,
} from '../../providers/styles'
import { Span } from 'shared/components/Typography'
import { Add } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Box, Button } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useActionTable from '../../providers/hooks/useActionTable'
import CreateInterviewModal from '../CreateInterviewModal'
import { useParams } from 'react-router-dom'
import useListInterview from '../../providers/hooks/useListInterview'

const ListFeedback = () => {
  const {
    openCreate,
    setOpenCreate,
  } = useActionTable()

  const { id } = useParams();
  const { listInterview } = useListInterview(id as string)

  return (
    <ListInterviewContainer>
      <DivActionHeader>
        <BoxTitle>
          <Span>Interviews</Span>
        </BoxTitle>
        <BoxButton>
          <Button startIcon={<Add />} onClick={() => setOpenCreate(true)}>Add new interview</Button>
        </BoxButton>
      </DivActionHeader>
      <BoxText>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            sx={{ alignItems: 'flex-start' }}
          >
            <FlexBox flexDirection={'column'} gap={'10px'}>
              <Box>
                <TinyText>Interview 1</TinyText>
              </Box>
              <FlexBox gap={'60px'}>
                <Box>
                  <SpanText>Date and time</SpanText>
                  <TinyText>20/03/2024, 14:30 - 16:30</TinyText>
                </Box>
                <Box>
                  <SpanText>Created by</SpanText>
                  <TinyText>Arianne Bui</TinyText>
                </Box>
                <Box>
                  <SpanText>Created at</SpanText>
                  <TinyText>20/03/2024, 10:30</TinyText>
                </Box>
              </FlexBox>
            </FlexBox>
          </AccordionSummary>
          <AccordionDetails>
            <FlexBox flexDirection={'column'} gap={'10px'}>
              <Box>
                <SpanText>Interviewrs</SpanText>
                <FlexBox>
                  <ChipItem label="Durin Nguyen" />
                  <ChipItem label="Arianne Bui" />
                  <ChipItem label="Helen Vo" />
                </FlexBox>
              </Box>
              <Box>
                <SpanText>Description</SpanText>
                <TinyText>
                  Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut
                  nulla torquent pulvinar cursus pellentesque lectus posuere est
                  per eget inceptos adipiscing nibh odio felis ultricies urna
                  fermentum ridiculus dolor class potenti
                </TinyText>
              </Box>
            </FlexBox>
          </AccordionDetails>
        </Accordion>
      </BoxText>

      <BoxText>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            sx={{ alignItems: 'flex-start' }}
          >
            <FlexBox flexDirection={'column'} gap={'10px'}>
              <Box>
                <TinyText>Interview 2</TinyText>
              </Box>
              <FlexBox gap={'60px'}>
                <Box>
                  <SpanText>Date and time</SpanText>
                  <TinyText>20/03/2024, 14:30 - 16:30</TinyText>
                </Box>
                <Box>
                  <SpanText>Created by</SpanText>
                  <TinyText>Arianne Bui</TinyText>
                </Box>
                <Box>
                  <SpanText>Created at</SpanText>
                  <TinyText>20/03/2024, 10:30</TinyText>
                </Box>
              </FlexBox>
            </FlexBox>
          </AccordionSummary>
          <AccordionDetails>
            <FlexBox flexDirection={'column'} gap={'10px'}>
              <Box>
                <SpanText>Interviewrs</SpanText>
                <FlexBox>
                  <ChipItem label="Durin Nguyen" />
                  <ChipItem label="Arianne Bui" />
                  <ChipItem label="Helen Vo" />
                </FlexBox>
              </Box>
              <Box>
                <SpanText>Description</SpanText>
                <TinyText>
                  Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut
                  nulla torquent pulvinar cursus pellentesque lectus posuere est
                  per eget inceptos adipiscing nibh odio felis ultricies urna
                  fermentum ridiculus dolor class potenti
                </TinyText>
              </Box>
            </FlexBox>
          </AccordionDetails>
        </Accordion>
      </BoxText>

      {openCreate && (
        <CreateInterviewModal open={openCreate} setOpen={setOpenCreate} />
      )}
    </ListInterviewContainer>
  )
}

export default ListFeedback
