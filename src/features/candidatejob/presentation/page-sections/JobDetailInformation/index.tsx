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
import {
  ButtonStatus,
  DivInformation,
  DivItemInformation,
} from '../../providers/styles'
import { LinkText } from 'shared/components/Typography'
import { useNavigate } from 'react-router-dom'
interface JobDetailInformationProps {
  jobApplicationDetail: CandidateJob
}

const JobDetailInformation = ({
  jobApplicationDetail,
}: JobDetailInformationProps) => {
  const navigate = useNavigate()
  const attachments = jobApplicationDetail?.attachments || []
  const candidateId = jobApplicationDetail?.candidate_id
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
          <LinkText
            fontSize={13}
            lineHeight={'15.85px'}
            onClick={() =>
              navigate(`/dashboard/candidate-detail/${candidateId}`)
            }
          >
            {jobApplicationDetail?.candidate?.name}
          </LinkText>
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
          {hiddenChangStatus && (
            <ButtonStatus
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
