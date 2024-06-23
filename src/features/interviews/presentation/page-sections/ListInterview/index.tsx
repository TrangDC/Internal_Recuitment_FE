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
import { isEmpty } from 'lodash'
import { format } from 'date-fns'
import EditIcon from 'shared/components/icons/EditIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { Interview } from 'features/interviews/domain/interfaces'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { Fragment, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import BoxTextSquare from 'shared/components/utils/boxText'
import { areDatesEqual, getTime, isPast } from 'shared/utils/date'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { CreateInterviewModal, DeleteInterviewModal, EditInterviewModal } from '../index'

interface Props {
  jobApplicationDetail: CandidateJob
  listInterview: Interview[]
}

const ListFeedback = ({ jobApplicationDetail, listInterview }: Props) => {
  const {
    openCreate,
    setOpenCreate,
    openEdit,
    setOpenEdit,
    handleOpenEdit,
    openDelete,
    handleOpenDelete,
    setOpenDelete,
    rowId,
  } = useActionTable()

  const showInterview = useMemo(() => {
    return (
      jobApplicationDetail?.status === STATUS_CANDIDATE.APPLIED ||
      jobApplicationDetail?.status === STATUS_CANDIDATE.INTERVIEWING
    )
  }, [jobApplicationDetail?.status])

  const queryClient = useQueryClient()
  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [
        MODLUE_QUERY_KEY.CANDIDATE_JOB,
        MODLUE_QUERY_KEY.INTERVIEWER,
        MODLUE_QUERY_KEY.FEEDBACK,
      ],
    })
  }

  return (
    <ListInterviewContainer>
      <DivActionHeader>
        <BoxTitle>
          <Span>Interviews</Span>
        </BoxTitle>
        {showInterview && (
          <BoxButton>
            <Button startIcon={<Add />} onClick={() => setOpenCreate(true)}>
              Add new interview
            </Button>
          </BoxButton>
        )}
      </DivActionHeader>
      {!isEmpty(listInterview) &&
        listInterview.map((interview, idx) => {
          return (
            <BoxText key={idx}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  sx={{
                    alignItems: 'flex-start',
                    flexDirection: 'row-reverse',
                    gap: '6px',
                  }}
                >
                  <FlexBox
                    flexDirection={'column'}
                    gap={'10px'}
                    width={'100%'}
                    paddingTop={'5px'}
                  >
                    <FlexBox width={'100%'} justifyContent={'space-between'}>
                      <FlexBox gap={'8px'}>
                        <TinyText>{interview.title}</TinyText>
                        {interview.edited && <BoxTextSquare content="Edited" />}
                      </FlexBox>
                      <FlexBox
                        gap={'15px'}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {interview.start_from &&
                          isPast(dayjs(interview.start_from).toDate()) && (
                            <Fragment>
                              <EditIcon
                                onClick={(e) => {
                                  handleOpenEdit(interview.id)
                                }}
                                sx={{
                                  fontSize: '20px',
                                }}
                              />
                              <DeleteIcon
                                onClick={(e) => {
                                  handleOpenDelete(interview.id)
                                }}
                                sx={{
                                  fontSize: '20px',
                                }}
                              />
                            </Fragment>
                          )}
                      </FlexBox>
                    </FlexBox>

                    <FlexBox gap={'60px'}>
                      <Box>
                        <SpanText>Date and time</SpanText>
                        <TinyText>
                          {format(
                            new Date(interview.interview_date),
                            'dd/MM/yyyy'
                          )}
                          {', '}
                          {getTime(dayjs(interview.start_from).toDate())} -{' '}
                          {getTime(dayjs(interview.end_at).toDate())}
                        </TinyText>
                      </Box>
                      <Box>
                        <SpanText>Created by</SpanText>
                        <TinyText>{interview?.owner?.name}</TinyText>
                      </Box>
                      <Box>
                        <SpanText>Created at</SpanText>
                        <TinyText>
                          {format(
                            new Date(interview.created_at),
                            'HH:mm, dd/MM/yyyy'
                          )}
                        </TinyText>
                      </Box>
                    </FlexBox>
                  </FlexBox>
                </AccordionSummary>
                <AccordionDetails>
                  <FlexBox
                    flexDirection={'column'}
                    gap={'10px'}
                    padding={'0 30px'}
                  >
                    <Box>
                      <SpanText>Interviewrs</SpanText>
                      <FlexBox>
                        {interview.interviewer.map((item, index) => (
                          <ChipItem key={index} label={item.name} />
                        ))}
                      </FlexBox>
                    </Box>
                    <Box>
                      <SpanText>Description</SpanText>
                      <TinyText>{interview.description}</TinyText>
                    </Box>
                  </FlexBox>
                </AccordionDetails>
              </Accordion>
            </BoxText>
          )
        })}

      {openCreate && (
        <CreateInterviewModal
          hiring_job={jobApplicationDetail.hiring_job}
          open={openCreate}
          setOpen={setOpenCreate}
          onSuccess={handleRefreshList}
        />
      )}

      {openEdit && (
        <EditInterviewModal
          id_interview={rowId.current}
          hiring_job={jobApplicationDetail.hiring_job}
          open={openEdit}
          setOpen={setOpenEdit}
          onSuccess={handleRefreshList}
        />
      )}

      {openDelete && (
        <DeleteInterviewModal
          id={rowId.current}
          open={openDelete}
          setOpen={setOpenDelete}
          onSuccess={handleRefreshList}
        />
      )}
    </ListInterviewContainer>
  )
}

export default ListFeedback
