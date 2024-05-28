import { Box, Button, styled } from '@mui/material'
import { format } from 'date-fns'
import { CandidateJob } from 'features/candidates/domain/interfaces'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import useActionTable from '../../providers/hooks/useActionTable'
import ChangeStatusModal from '../ChangeStatusModal'
import { downloadFileAttachment } from '../../providers/helper'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { useMemo } from 'react'

const DivInformation = styled(FlexBox)(({ theme }) => ({
  padding: '24px',
  flexWrap: 'wrap',
  gap: '20px',
  borderRight: '1px solid',
  borderColor: theme.palette.grey[200],
}))

const DivItemInformation = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const ButtonStatus = styled(Button)(({ theme }) => ({
  width: '100%',
}))

interface JobDetailInformationProps {
  jobApplicationDetail: CandidateJob
}

const JobDetailInformation = ({
  jobApplicationDetail,
}: JobDetailInformationProps) => {
  const disabledChangeStatus = useMemo(() => {
    const disabledStatuses = [
      STATUS_CANDIDATE.KIV,
      STATUS_CANDIDATE.OFFERED_LOST,
      STATUS_CANDIDATE.EX_STAFTT
    ];

    return disabledStatuses.includes(jobApplicationDetail?.status);
  }, [jobApplicationDetail?.status])

  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const { handleGetUrlDownload } = useGetUrlGetAttachment()

  return (
    <DivInformation height={'100%'}>
      <FlexBox
        flexWrap={'wrap'}
        gap={'20px'}
        flexDirection={'column'}
        width={'100%'}
      >
        <DivItemInformation>
          <SpanText>Full name</SpanText>
          <TinyText>{jobApplicationDetail?.candidate?.name}</TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Applied on</SpanText>
          <TinyText>
            {jobApplicationDetail?.candidate?.last_apply_date &&
              format(
                new Date(jobApplicationDetail?.candidate.last_apply_date),
                'HH:mm, dd/MM/yyyy'
              )}
          </TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Job applied</SpanText>
          <TinyText>{jobApplicationDetail?.hiring_job?.name}</TinyText>
        </DivItemInformation>
      </FlexBox>
      <FlexBox
        flexWrap={'wrap'}
        gap={'20px'}
        justifyContent={'flex-end'}
        flexDirection={'column'}
        width={'100%'}
      >
        <DivItemInformation>
          <ButtonStatus
            variant="contained"
            onClick={() => {
              const { attachments } = jobApplicationDetail
              downloadFileAttachment(attachments, handleGetUrlDownload)
            }}
            startIcon={
              <DownloadIcon
                sx={{
                  ' path': {
                    fill: 'white',
                  },
                }}
              />
            }
          >
            Download
          </ButtonStatus>
        </DivItemInformation>
        <DivItemInformation>
          <ButtonStatus
          disabled={disabledChangeStatus}
            onClick={() => {
              handleOpenChangeStatus(
                jobApplicationDetail.id,
                jobApplicationDetail
              )
            }}
            variant="contained"
            startIcon={
              <EditIcon
                sx={{
                  ' path': {
                    fill: 'white',
                  },
                }}
              />
            }
          >
            Change status
          </ButtonStatus>
        </DivItemInformation>
      </FlexBox>
      {openChangeStatus && (
        <ChangeStatusModal
          open={openChangeStatus}
          setOpen={setOpenChangeStatus}
          candidateId={rowData.current?.id as string}
          id={rowId.current}
          rowData={rowData.current}
          statusCurrent={jobApplicationDetail?.status}
        />
      )}
    </DivInformation>
  )
}

export default JobDetailInformation
