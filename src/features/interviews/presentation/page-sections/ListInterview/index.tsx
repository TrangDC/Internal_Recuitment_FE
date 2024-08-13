import {
  BoxButton,
  BoxText,
  BoxTitle,
  ChipItem,
  DivActionHeader,
  ListInterviewContainer,
} from '../../../shared/styles'
import { Span } from 'shared/components/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useActionInterview from '../../../hooks/table/useActionInterview'
import { isEmpty } from 'lodash'
import { format } from 'date-fns'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import BoxTextSquare from 'shared/components/utils/boxText'
import { getTime } from 'shared/utils/date'
import {
  CreateInterviewModal,
  DeleteInterviewModal,
  EditInterviewModal,
} from '../index'
import Cant from 'features/authorization/presentation/components/Cant'
import AddNewInterviewButtonPermission from 'features/interviews/permission/components/AddNewInterviewButtonPermission'
import {
  GetLocationName,
  LOCATION_INTERVIEW_STATE,
} from 'shared/components/autocomplete/location-interview-autocomplete'
import { LinkText } from 'shared/styles'
import InterviewActions from '../../components/InterviewActions'
import ChangeCandidateInterviewStatusModal from '../changeCandidateInterviewStatusModal'
import ChipInterviewStatus from 'shared/components/chip/ChipInterviewStatus'
import CandidateJob from 'shared/schema/database/candidate_job'
import CandidateInterview from 'shared/schema/database/candidate_interview'

interface Props {
  jobApplicationDetail: CandidateJob
  listInterview: CandidateInterview[]
  show_interview: boolean,
}

const ListInterview = ({ jobApplicationDetail, listInterview, show_interview }: Props) => {
  const useActionInterviewReturn = useActionInterview()

  const {
    openCreate,
    setOpenCreate,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    rowId,
    openCancelCandidateInterview,
    openDoneCandidateInterview,
    setOpenCancelCandidateInterview,
    setOpenDoneCandidateInterview,
  } = useActionInterviewReturn

  const queryClient = useQueryClient()
  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [
        MODLUE_QUERY_KEY.CANDIDATE_JOB,
        MODLUE_QUERY_KEY.INTERVIEWER,
        MODLUE_QUERY_KEY.FEEDBACK,
      ],
    })
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_JOB],
    })
  }

  const candidateJobOfTeamId =
    jobApplicationDetail?.hiring_job?.hiring_team?.id ?? ''

  return (
    <ListInterviewContainer>
      <DivActionHeader>
        <BoxTitle>
          <Span>Interviews</Span>
        </BoxTitle>
        <Cant
          checkBy={{
            compare: 'hasAny',
            permissions: ['CREATE.everything', 'CREATE.teamOnly'],
          }}
          module="INTERVIEWS"
        >
          {show_interview && (
            <BoxButton>
              <AddNewInterviewButtonPermission
                candidateJobOfTeamId={candidateJobOfTeamId}
                onClick={() => setOpenCreate(true)}
              />
            </BoxButton>
          )}
        </Cant>
      </DivActionHeader>
      {!isEmpty(listInterview) &&
        listInterview.map((interview, idx) => {
          const show_meeting_link =
            interview.location === LOCATION_INTERVIEW_STATE.ONLINE

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
                        <InterviewActions
                          interview={interview}
                          useActionInterviewReturn={useActionInterviewReturn}
                          candidateJobOfTeamId={candidateJobOfTeamId}
                        />
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
                      <FlexBox flexDirection={'column'}>
                        <SpanText>Status</SpanText>
                        <ChipInterviewStatus
                          status={interview.status}
                        ></ChipInterviewStatus>
                      </FlexBox>
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
                      <SpanText>Location</SpanText>
                      <TinyText>{GetLocationName(interview.location)}</TinyText>
                    </Box>
                    {show_meeting_link && (
                      <Box>
                        <SpanText>Meeting link</SpanText>
                        <TinyText>
                          <LinkText to={interview.meeting_link} target="_blank">
                            {interview.meeting_link}
                          </LinkText>
                        </TinyText>
                      </Box>
                    )}

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

      {openCancelCandidateInterview && (
        <ChangeCandidateInterviewStatusModal
          id={rowId.current}
          open={openCancelCandidateInterview}
          setOpen={setOpenCancelCandidateInterview}
          updateTo="cancelled"
          onSuccess={handleRefreshList}
        />
      )}
      {openDoneCandidateInterview && (
        <ChangeCandidateInterviewStatusModal
          id={rowId.current}
          open={openDoneCandidateInterview}
          setOpen={setOpenDoneCandidateInterview}
          updateTo="done"
          onSuccess={handleRefreshList}
        />
      )}
    </ListInterviewContainer>
  )
}

export default ListInterview
