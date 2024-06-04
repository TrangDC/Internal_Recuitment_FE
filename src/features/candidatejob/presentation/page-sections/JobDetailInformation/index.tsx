import { Box, Button, styled } from '@mui/material'
import { format } from 'date-fns'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import EditIcon from 'shared/components/icons/EditIcon'
import useActionTable from '../../providers/hooks/useActionTable'
import ChangeStatusModal from '../ChangeStatusModal'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { useEffect, useMemo, useState } from 'react'
import PreviewCV from '../../providers/components/previewCV'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'

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
  const { attachments } = jobApplicationDetail
  const [url, setUrl] = useState('')
  const hiddenChangStatus = useMemo(() => {
    const disabledStatuses = [
      STATUS_CANDIDATE.KIV,
      STATUS_CANDIDATE.OFFERED_LOST,
      STATUS_CANDIDATE.EX_STAFTT,
    ]

    return !disabledStatuses.includes(jobApplicationDetail?.status)
  }, [jobApplicationDetail?.status])

  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const { handleGetUrlDownload } = useGetUrlGetAttachment()

  useEffect(() => {
    if (
      Array.isArray(attachments) &&
      attachments[0]?.document_name &&
      attachments[0]?.document_id
    ) {
      handleGetUrlDownload({
        action: 'DOWNLOAD',
        fileName: attachments[0]?.document_name ?? '',
        folder: 'candidate',
        id: attachments[0]?.document_id ?? '',
      }).then((data) => {
        const urlFile = data?.['CreateAttachmentSASURL']?.url ?? ''
        setUrl(urlFile)
      })
    }
  }, [attachments])

  return (
    <DivInformation height={'100%'}>
      <FlexBox
        flexWrap={'wrap'}
        gap={'20px'}
        flexDirection={'column'}
        width={'100%'}
        alignItems={'center'}
      >
        <PreviewCV pageNumber={1} pdfUrl={url} />
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
        {/* <DivItemInformation>
          <ButtonStatus
            variant="contained"
            onClick={() => {
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
            Download CV
          </ButtonStatus>
        </DivItemInformation> */}
        <DivItemInformation>
          {hiddenChangStatus && (
            <ButtonStatus
              // disabled={showChangeStatus}
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
          )}
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
