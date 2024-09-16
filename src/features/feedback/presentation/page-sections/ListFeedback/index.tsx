import {
  BoxButton,
  BoxText,
  BoxTitle,
  DivActionHeader,
  ListFeedbackContainer,
} from '../../../shared/styles'
import { Span } from 'shared/components/Typography'
import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useActionTable from '../../../hooks/table/useActionTable'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { format } from 'date-fns'
import BoxTextSquare from 'shared/components/utils/boxText'
import EditIcon from 'shared/components/icons/EditIcon'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { innerHTMLTextArea } from 'shared/components/genarateInnerHTML'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { useQueryClient } from '@tanstack/react-query'
import {
  CreateFeedbackModal,
  DeleteFeedbackModal,
  UpdateFeedbackModal,
} from '../index'
import { downloadOneFile } from '../../../shared/helper'
import Cant from 'features/authorization/presentation/components/Cant'
import DeleteFeedbackButtonPermission from 'features/feedback/permission/components/DeleteFeedbackButtonPermission'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'

interface Props {
  listFeedback: CandidateJobFeedback[]
  show_feedback?: boolean
}

const ListFeedBack = ({ listFeedback, show_feedback = true }: Props) => {
  const {
    openCreate,
    setOpenCreate,
    openEdit,
    setOpenEdit,
    handleOpenEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    rowData,
    rowId,
  } = useActionTable()
  const { id } = useParams()
  const { handleGetUrlDownload } = useGetUrlGetAttachment()

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
    <ListFeedbackContainer>
      <DivActionHeader>
        <BoxTitle>
          <Span>Feedbacks</Span>
        </BoxTitle>
        {show_feedback && (
          <BoxButton>
            <Cant
              module="CANDIDATE_JOB_FEEDBACKS"
              checkBy={{
                compare: 'hasAny',
                permissions: ['CREATE.everything'],
              }}
            >
              <Button startIcon={<Add />} onClick={() => setOpenCreate(true)}>
                Add feedback
              </Button>
            </Cant>
          </BoxButton>
        )}
      </DivActionHeader>

      {!isEmpty(listFeedback) &&
        listFeedback.map((feedback, idx) => {
          return (
            <BoxText key={idx}>
              <FlexBox flexDirection={'column'} gap={'10px'} width={'100%'}>
                <FlexBox width={'100%'} justifyContent={'space-between'}>
                  <FlexBox gap={'8px'}>
                    <TinyText>{feedback.owner.name}</TinyText>
                    {feedback.edited && <BoxTextSquare content="Edited" />}
                  </FlexBox>
                  <FlexBox gap={'15px'} onClick={(e) => e.stopPropagation()}>
                    <Cant
                      module="CANDIDATE_JOB_FEEDBACKS"
                      checkBy={{
                        compare: 'hasAny',
                        permissions: ['CREATE.everything'],
                      }}
                    >
                      <EditIcon
                        onClick={(e) => {
                          handleOpenEdit(feedback.id, feedback)
                        }}
                      />
                    </Cant>

                    <Cant
                      module="CANDIDATE_JOB_FEEDBACKS"
                      checkBy={{
                        compare: 'hasAny',
                        permissions: [
                          'DELETE.everything',
                          'DELETE.ownedOnly',
                          'DELETE.teamOnly',
                        ],
                      }}
                    >
                      <DeleteFeedbackButtonPermission
                        ownerId={feedback?.owner?.id ?? ''}
                        feedbackOfTeamId={
                          feedback?.owner?.member_of_hiring_team?.id ?? ''
                        }
                        onClick={() => {
                          handleOpenDelete(feedback.id)
                        }}
                      />
                    </Cant>
                  </FlexBox>
                </FlexBox>

                <FlexBox>
                      <Box>
                        <FlexBox gap={1}>
                          <SpanText>{format(
                            new Date(feedback.created_at),
                            'HH:mm, dd/MM/yyyy'
                          )} </SpanText>

                          <FlexBox gap={0.25}>
                            <SpanText> At</SpanText>
                            <SpanText fontWeight={600} color={'#4D607A'}>{application_data?.[feedback?.candidate_job_status]?.label}</SpanText>
                            <SpanText>
                              Stage</SpanText>
                          </FlexBox>
                        </FlexBox>
                      </Box>
                    </FlexBox>
              </FlexBox>
              <FlexBox flexDirection={'column'} gap={'10px'}>
                <Box>
                  <TinyText>{innerHTMLTextArea(feedback.feedback)}</TinyText>
                </Box>
                <FlexBox flexWrap={'wrap'} gap={'10px'}>
                  {feedback.attachments.map((item, idx) => {
                    return (
                      <Box sx={{ minWidth: '183px' }} key={idx}>
                        <ShowFile
                          name={item.document_name}
                          IconEnd={
                            <DownloadIcon
                              onClick={() => {
                                downloadOneFile(item, handleGetUrlDownload)
                              }}
                            />
                          }
                        />
                      </Box>
                    )
                  })}
                </FlexBox>
              </FlexBox>
            </BoxText>
          )
        })}

      {openCreate && (
        <CreateFeedbackModal
          open={openCreate}
          setOpen={setOpenCreate}
          candidate_job_id={id as string}
          onSuccess={handleRefreshList}
        />
      )}

      {openEdit && rowData.current && (
        <UpdateFeedbackModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
          onSuccess={handleRefreshList}
        />
      )}

      {openDelete && (
        <DeleteFeedbackModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
          onSuccess={handleRefreshList}
        />
      )}
    </ListFeedbackContainer>
  )
}

export default ListFeedBack
