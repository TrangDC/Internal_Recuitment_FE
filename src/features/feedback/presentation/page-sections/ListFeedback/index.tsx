import {
  BoxButton,
  BoxText,
  BoxTitle,
  DivActionHeader,
  ListFeedbackContainer,
} from '../../providers/styles'
import { Span } from 'shared/components/Typography'
import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useActionTable from '../../providers/hooks/useActionTable'
import CreateFeedbackModal from '../CreateFeedbackModal'
import { useParams } from 'react-router-dom'
import useListFeedback from '../../providers/hooks/useListFeedBack'
import { isEmpty } from 'lodash'
import { format } from 'date-fns'

const ListFeedBack = () => {
  const { openCreate, setOpenCreate } = useActionTable()
  const { id } = useParams()

  const { listFeedback } = useListFeedback(id as string)
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

      {!isEmpty(listFeedback) &&
        listFeedback.map((feedback, idx) => {
          return (
            <BoxText key={idx}>
              <FlexBox flexDirection={'column'} gap={'10px'}>
                <Box>
                  <TinyText>Helen Vo</TinyText>
                </Box>
                <FlexBox gap={'60px'}>
                  <Box>
                    <SpanText>
                      {format(
                        new Date(feedback.created_at),
                        'HH:mm, dd/MM/yyyy'
                      )}
                    </SpanText>
                  </Box>
                </FlexBox>
              </FlexBox>
              <FlexBox flexDirection={'column'} gap={'10px'}>
                <Box>
                  <TinyText>{feedback.feedback}</TinyText>
                </Box>
                {/* <FlexBox flexWrap={'wrap'} gap={'10px'}>
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
            </FlexBox> */}
              </FlexBox>
            </BoxText>
          )
        })}

      {openCreate && (
        <CreateFeedbackModal
          open={openCreate}
          setOpen={setOpenCreate}
          candidate_job_id={id as string}
        />
      )}
    </ListFeedbackContainer>
  )
}

export default ListFeedBack
