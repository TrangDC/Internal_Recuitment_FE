import {
  BoxButton,
  BoxText,
  BoxTitle,
  ChipItem,
  DivActionHeader,
  ListFeedbackContainer,
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
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import useActionTable from '../../providers/hooks/useActionTable'
import CreateFeedbackModal from '../CreateFeedbackModal/useCreateFeedBackModal'

const ListFeedBack = () => {
  const { openCreate, setOpenCreate } = useActionTable()

  return (
    <ListFeedbackContainer>
      <DivActionHeader>
        <BoxTitle>
          <Span>Feedbacks</Span>
        </BoxTitle>
        <BoxButton>
          <Button startIcon={<Add />} onClick={() => setOpenCreate(true)}>
            Add feedback
          </Button>
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
                <TinyText>Helen Vo</TinyText>
              </Box>
              <FlexBox gap={'60px'}>
                <Box>
                  <SpanText>10:30, 10/03/2024</SpanText>
                </Box>
              </FlexBox>
            </FlexBox>
          </AccordionSummary>
          <AccordionDetails>
            <FlexBox flexDirection={'column'} gap={'10px'}>
              <Box>
                <TinyText>
                  Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut
                  nulla torquent pulvinar cursus pellentesque lectus posuere est
                  per eget inceptos adipiscing nibh odio felis ultricies urna
                  fermentum ridiculus dolor class potenti
                </TinyText>
              </Box>
              <FlexBox flexWrap={'wrap'} gap={'10px'}>
                <Box sx={{ width: '183px' }}>
                  <ShowFile
                    name="feedback.pdf"
                    size={234234}
                    IconEnd={<DownloadIcon />}
                  />
                </Box>
                <Box sx={{ width: '183px' }}>
                  <ShowFile
                    name="feedback.pdf"
                    size={234234}
                    IconEnd={<DownloadIcon />}
                  />
                </Box>
              </FlexBox>
            </FlexBox>
          </AccordionDetails>
        </Accordion>
      </BoxText>

      {openCreate && (
        <CreateFeedbackModal open={openCreate} setOpen={setOpenCreate} />
      )}
    </ListFeedbackContainer>
  )
}

export default ListFeedBack
