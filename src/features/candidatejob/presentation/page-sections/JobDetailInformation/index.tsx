import { format } from 'date-fns'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useActionTable from '../../../hooks/table/useActionTable'
import ChangeStatusModal from '../ChangeStatusModal'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { useEffect, useMemo, useState } from 'react'
import PreviewCV from '../../components/previewCV'
import { DivInformation, DivItemInformation } from '../../../shared/styles'
import { LinkText } from 'shared/components/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import EditCandidateJobModal from '../EditCandidateJobModal'
import CopyIcon from 'shared/components/icons/CopyIcon'
import { getDomain, handleCopyClipBoard } from 'shared/utils/utils'
import Cant from 'features/authorization/presentation/components/Cant'
import EditApplicationButtonPermission from 'features/candidatejob/permission/components/EditApplicationButtonPermission'
import ChangeStatusCDDJButtonPermission from 'features/candidatejob/permission/components/ChangeStatusCDDJButtonPermission'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import CandidateJob from 'shared/schema/database/candidate_job'
import { LEVEL_STATE } from 'shared/components/autocomplete/level-auto-complete'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'
interface JobDetailInformationProps {
  jobApplicationDetail: CandidateJob
}

const JobDetailInformation = ({
  jobApplicationDetail,
}: JobDetailInformationProps) => { 
  const { id } = useParams()
  const navigate = useNavigate()
  const [openEditCandidateJob, setOpenEditCandidateJob] = useState(false)
  const attachments = jobApplicationDetail?.attachments || []
  const candidateId = jobApplicationDetail?.candidate_id
  const candidateJobOfTeamId =
    jobApplicationDetail?.hiring_job?.hiring_team?.id ?? ''
  const status = jobApplicationDetail?.hiring_job?.status
  const isClosed = status === 'closed'

  const [url, setUrl] = useState('')
  const hiddenChangStatus = useMemo(() => {
    const disabledStatuses = [
      application_data.failed_cv.value,
      application_data.failed_interview.value,
      application_data.offer_lost.value,
      application_data.ex_staff.value,
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
        if (isRight(data)) {
          const urlFile =
            unwrapEither(data)?.['CreateAttachmentSASURL']?.url ?? ''
          setUrl(urlFile)
        }
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
            {jobApplicationDetail?.created_at &&
              format(
                new Date(jobApplicationDetail.created_at),
                'HH:mm, dd/MM/yyyy'
              )}
          </TinyText>
        </DivItemInformation>
        <DivItemInformation>
          <SpanText>Job applied</SpanText>
          <FlexBox lineHeight={0} gap={1}>
            <TinyText>{jobApplicationDetail?.hiring_job?.name}</TinyText>
            <CopyIcon
              sx={{
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onClick={() => {
                const url = `${getDomain()}/dashboard/job-application-detail/${id}`
                handleCopyClipBoard(
                  url,
                  `[APPLICATION] ${jobApplicationDetail.candidate.name}_${jobApplicationDetail?.hiring_job?.name}`
                )
              }}
            />
          </FlexBox>
        </DivItemInformation>

        {jobApplicationDetail?.level && (
          <DivItemInformation>
            <SpanText>Level</SpanText>
            <TinyText>
              {LEVEL_STATE?.[jobApplicationDetail?.level]?.label}
            </TinyText>
          </DivItemInformation>
        )}

        {jobApplicationDetail?.offer_expiration_date && (
          <DivItemInformation>
            <SpanText>Offer expiration date</SpanText>
            <TinyText>
              {format(
                new Date(jobApplicationDetail.offer_expiration_date),
                'dd/MM/yyyy'
              )}
            </TinyText>
          </DivItemInformation>
        )}

        {jobApplicationDetail?.onboard_date && (
          <DivItemInformation>
            <SpanText>Candidate onboard date</SpanText>
            <TinyText>
              {format(
                new Date(jobApplicationDetail.onboard_date),
                'dd/MM/yyyy'
              )}
            </TinyText>
          </DivItemInformation>
        )}
      </FlexBox>
      <FlexBox
        flexWrap={'wrap'}
        gap={'20px'}
        justifyContent={'flex-end'}
        flexDirection={'column'}
        width={'100%'}
      >
        <DivItemInformation>
          <FlexBox flexDirection={'column'} gap={1}>
            {!isClosed && (
              <EditApplicationButtonPermission
                candidateJobOfTeamId={candidateJobOfTeamId}
                onClick={() => {
                  setOpenEditCandidateJob(true)
                }}
              />
            )}
            {!isClosed && (
              <Cant
                module="CANDIDATE_JOBS"
                checkBy={{
                  compare: 'hasAny',
                  permissions: [
                    'CHANGE_STATUS.everything',
                    'CHANGE_STATUS.teamOnly',
                  ],
                }}
              >
                {hiddenChangStatus && (
                  <ChangeStatusCDDJButtonPermission
                    candidateJobOfTeamId={candidateJobOfTeamId}
                    onClick={() => {
                      handleOpenChangeStatus(
                        jobApplicationDetail.id,
                        jobApplicationDetail
                      )
                    }}
                  />
                )}
              </Cant>
            )}
          </FlexBox>
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
      {openEditCandidateJob && id && (
        <EditCandidateJobModal
          open={openEditCandidateJob}
          setOpen={setOpenEditCandidateJob}
          candidateId={id}
        />
      )}
    </DivInformation>
  )
}

export default JobDetailInformation
