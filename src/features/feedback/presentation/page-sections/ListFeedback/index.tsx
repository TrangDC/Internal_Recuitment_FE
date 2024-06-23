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
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { format } from 'date-fns'
import BoxTextSquare from 'shared/components/utils/boxText'
import EditIcon from 'shared/components/icons/EditIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { FeedBack } from 'features/feedback/domain/interfaces'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import {
  downloadOneFile,
} from 'features/candidatejob/presentation/providers/helper'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import {
  innerHTMLTextArea,
} from 'shared/components/genarateInnerHTML'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { useQueryClient } from '@tanstack/react-query'
import { areDatesEqual } from 'shared/utils/date'
import { CreateFeedbackModal, DeleteFeedbackModal, UpdateFeedbackModal } from '../index'

interface Props {
  listFeedback: FeedBack[]
}

const ListFeedBack = ({listFeedback}: Props) => {
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
    queryClient.invalidateQueries({ queryKey: [ MODLUE_QUERY_KEY.CANDIDATE_JOB,MODLUE_QUERY_KEY.INTERVIEWER, MODLUE_QUERY_KEY.FEEDBACK] })
  }

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
              <FlexBox flexDirection={'column'} gap={'10px'} width={'100%'}>
                <FlexBox width={'100%'} justifyContent={'space-between'}>
                  <FlexBox gap={'8px'}>
                    <TinyText>{feedback.owner.name}</TinyText>
                    {feedback.edited && <BoxTextSquare content="Edited" />}
                  </FlexBox>
                  <FlexBox gap={'15px'} onClick={(e) => e.stopPropagation()}>
                    <EditIcon
                      onClick={(e) => {
                        handleOpenEdit(feedback.id, feedback)
                      }}
                    />
                    <DeleteIcon
                      onClick={(e) => {
                        handleOpenDelete(feedback.id)
                      }}
                    />
                  </FlexBox>
                </FlexBox>

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

      {openEdit && (
        <UpdateFeedbackModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current as FeedBack}
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
