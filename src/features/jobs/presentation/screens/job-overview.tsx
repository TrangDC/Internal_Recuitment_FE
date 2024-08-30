import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'
import MicroScope from 'shared/components/icons/Microscope'
import {
  BoxCircle,
  BoxWrapperOuterContainer,
  BtnPrimary,
  HeadingWrapper,
} from 'shared/styles'
import { Link, useParams } from 'react-router-dom'
import useJobDetail from '../../hooks/crud/useJobDetail'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useActionTable from '../../hooks/table/useActionTable'
import { LOCATION_LABEL } from 'shared/constants/constants'
import IconScreen from 'shared/components/utils/IconScreen'
import { JobStatus } from 'shared/class/job-status'
import ChipJob from 'shared/class/job-status/components/ChipJob'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import CloseJobButtonPermission from 'features/jobs/permission/components/CloseJobButtonPermission'
import CandidateDetailProvider from '../page-sections/AllJobRequest/context/CandidateDetailContext'
import { LEVEL_STATE } from 'shared/components/autocomplete/level-auto-complete'
import ReopenButtonPermission from 'features/jobs/permission/components/ReopenJobButtonPermission'
import CloseJobModal from '../page-sections/CloseJobModal'
import ReopenJobModal from '../page-sections/ReopenModal'
import GeneralInformationHiring from '../page-sections/GeneralInformationHiring'
import RequestResolutionTime from '../components/RequestResolutionTime'

const { STATUS_HIRING_JOB } = JobStatus

const JobOverview = () => {
  const { id } = useParams()
  const { jobDetail } = useJobDetail(id as String)

  const translation = useTextTranslation()

  const {
    openClose,
    setOpenClose,
    handleOpenClose,
    handleOpenReopen,
    rowId,
    openReopen,
    setOpenReopen,
  } = useActionTable()

  const showReopenBtn = jobDetail?.status === STATUS_HIRING_JOB.CLOSED
  const showCloseBtn = jobDetail?.status === STATUS_HIRING_JOB.OPENED

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={MicroScope}
          textLabel={jobDetail?.name}
          go_back={true}
        />
      </Box>
      <FlexBox flexDirection={'column'} gap={2.5} marginTop={0}>
        <BoxWrapperOuterContainer>
          <HeadingWrapper sx={{ marginTop: 0 }}>
            <FlexBox
              width={'100%'}
              justifyContent={'space-between'}
              flexDirection={'column'}
              flexWrap={'wrap'}
              gap={2}
            >
              <FlexBox justifyContent={'space-between'}>
                <FlexBox gap={7.5} flexWrap={'wrap'} rowGap={2}>
                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>Job position</SpanText>
                    <TinyText>{jobDetail?.job_position?.name}</TinyText>
                  </FlexBox>

                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>{translation.COMMON.location}</SpanText>
                    <TinyText>{LOCATION_LABEL[jobDetail?.location]}</TinyText>
                  </FlexBox>

                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>Hiring team</SpanText>
                    <TinyText>{jobDetail?.hiring_team?.name}</TinyText>
                  </FlexBox>

                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>Staff needed</SpanText>
                    <BoxCircle>
                      <TinyText>{jobDetail?.amount}</TinyText>
                    </BoxCircle>
                  </FlexBox>

                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>Staff level</SpanText>
                    <TinyText>{LEVEL_STATE[jobDetail?.level]?.label}</TinyText>
                  </FlexBox>
                </FlexBox>

                <FlexBox gap={7.5} flexWrap={'wrap'} rowGap={2}>
                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>{translation.COMMON.status}</SpanText>
                    <TinyText>
                      <ChipJob status={jobDetail?.status} />
                    </TinyText>
                  </FlexBox>

                  <FlexBox
                    gap={0.75}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                  >
                    <SpanText>Priority</SpanText>
                    <TinyText>
                      <ChipPriority status={jobDetail?.priority} />
                    </TinyText>
                  </FlexBox>
                </FlexBox>
              </FlexBox>

              <FlexBox gap={7.5} flexWrap={'wrap'} rowGap={2}>
                <FlexBox
                  gap={0.75}
                  alignItems={'flex-start'}
                  flexDirection={'column'}
                >
                  <SpanText>REC in charge</SpanText>
                  <TinyText>{jobDetail?.rec_in_charge?.name}</TinyText>
                </FlexBox>

                <FlexBox
                  gap={0.75}
                  alignItems={'flex-start'}
                  flexDirection={'column'}
                >
                  <SpanText>REC team</SpanText>
                  <TinyText>{jobDetail?.rec_team?.name}</TinyText>
                </FlexBox>

                <FlexBox
                  gap={0.75}
                  alignItems={'flex-start'}
                  flexDirection={'column'}
                >
                  <SpanText>Request resolution time</SpanText>
                  <RequestResolutionTime
                    time={new Date(jobDetail?.opened_at)}
                  />
                </FlexBox>
              </FlexBox>

              <FlexBox gap={1} justifyContent={'flex-end'}>
                {showReopenBtn && (
                  <ReopenButtonPermission
                    handleOpenReopen={handleOpenReopen}
                    jobDetail={jobDetail}
                  />
                )}
                {showCloseBtn && (
                  <CloseJobButtonPermission
                    handleOpenClose={handleOpenClose}
                    jobDetail={jobDetail}
                  />
                )}
                <Link
                  to={`/dashboard/job-detail/${jobDetail?.id}`}
                  target="_blank"
                >
                  <BtnPrimary>
                    <Span>View Details</Span>
                  </BtnPrimary>
                </Link>
              </FlexBox>
            </FlexBox>
          </HeadingWrapper>
        </BoxWrapperOuterContainer>

        <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
          <HeadingWrapper sx={{ marginTop: 0, padding: 2 }}>
            <CandidateDetailProvider>
              <GeneralInformationHiring jobDetail={jobDetail} />
            </CandidateDetailProvider>
          </HeadingWrapper>
        </BoxWrapperOuterContainer>
      </FlexBox>

      {openClose && (
        <CloseJobModal
          open={openClose}
          setOpen={setOpenClose}
          id={rowId.current}
        />
      )}

      {openReopen && (
        <ReopenJobModal
          open={openReopen}
          setOpen={setOpenReopen}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default JobOverview
