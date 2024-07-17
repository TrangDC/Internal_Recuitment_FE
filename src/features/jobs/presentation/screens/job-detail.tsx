import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'
import Jobs from 'shared/components/icons/Jobs'
import {
  BoxCircle,
  BoxWrapperOuterContainer,
  BtnPrimary,
  HeadingWrapper,
} from 'shared/styles'
import { useParams } from 'react-router-dom'
import useJobDetail from '../../hooks/crud/useJobDetail'
import { SpanText, TinyText } from 'shared/components/form/styles'
import { useMemo, useState } from 'react'
import GenaralInformationHiring from '../page-sections/GeneralInformationHiring'
import useActionTable from '../../hooks/table/useActionTable'
import { LOCATION_LABEL } from 'shared/constants/constants'
import { format } from 'date-fns'
import { CloseJobModal, EditJobModal, TabJobDetail } from '../page-sections'
import IconScreen from 'shared/components/utils/IconScreen'
import { JobStatus } from 'shared/class/job-status'
import ChipJob from 'shared/class/job-status/components/ChipJob'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { ChipLimit } from 'shared/components/chip-stack'
import CloseJobButtonPermission from 'features/jobs/permission/components/CloseJobButtonPermission'

const { STATUS_STATE } = JobStatus

const JobDetail = () => {
  const [openTab, setOpenTab] = useState(false)

  const { id } = useParams()
  const { jobDetail } = useJobDetail(id as String)
  const translation = useTextTranslation()

  const {
    openStatus,
    setOpenStatus,
    handleOpenStatus,
    rowId,
    openEdit,
    setOpenEdit,
    handleOpenEdit,
  } = useActionTable()

  const disabledBtn = useMemo(() => {
    return (
      jobDetail.status === STATUS_STATE.OPENED && !jobDetail?.is_able_to_close
    )
  }, [jobDetail])

  const job_skills = useMemo(() => {
    if (!jobDetail.entity_skill_types) return []

    const skill_types = jobDetail.entity_skill_types
    return skill_types
      ? skill_types.flatMap((type) => {
          return type.entity_skills.map((skill) => skill.name)
        })
      : []
  }, [jobDetail])

  const handleOpenModalEdit = (id: string) => {
    handleOpenEdit(id)
    setOpenTab(false)
  }

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Jobs} textLable={jobDetail?.name} go_back={true} />
      </Box>
      <FlexBox flexDirection={'column'} gap={2.5} marginTop={0}>
        <BoxWrapperOuterContainer>
          <HeadingWrapper sx={{ marginTop: 0 }}>
            <FlexBox
              width={'100%'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
              gap={2}
            >
              <FlexBox gap={7.5} flexWrap={'wrap'} rowGap={2}>
                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>{translation.MODLUE_TEAMS.team}</SpanText>
                  <TinyText>{jobDetail?.team?.name}</TinyText>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>{translation.COMMON.location}</SpanText>
                  <TinyText>{LOCATION_LABEL[jobDetail?.location]}</TinyText>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>{translation.MODLUE_JOBS.staft_required}</SpanText>
                  <BoxCircle>
                    <TinyText>{jobDetail?.amount}</TinyText>
                  </BoxCircle>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>{translation.COMMON.status}</SpanText>
                  <TinyText>
                    <ChipJob status={jobDetail?.status} />
                  </TinyText>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>Priority</SpanText>
                  <TinyText>
                    <ChipPriority status={jobDetail?.priority} />
                  </TinyText>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>{translation.COMMON.created_date}</SpanText>

                  <TinyText>
                    {jobDetail?.created_at &&
                      format(
                        new Date(jobDetail?.created_at),
                        'HH:mm, dd/MM/yyyy'
                      )}
                  </TinyText>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>Skills</SpanText>

                  <TinyText>
                    <ChipLimit chips={job_skills} limit={2} />
                  </TinyText>
                </FlexBox>
              </FlexBox>
              <FlexBox gap={1}>
                <CloseJobButtonPermission
                  disabledBtn={disabledBtn}
                  handleOpenStatus={handleOpenStatus}
                  jobDetail={jobDetail}
                  opened={STATUS_STATE.OPENED}
                />
                <BtnPrimary onClick={() => setOpenTab(true)}>
                  <Span>View Details</Span>
                </BtnPrimary>
              </FlexBox>
            </FlexBox>
          </HeadingWrapper>
        </BoxWrapperOuterContainer>

        <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
          <HeadingWrapper sx={{ marginTop: 0, padding: 2 }}>
            <GenaralInformationHiring />
          </HeadingWrapper>
        </BoxWrapperOuterContainer>
      </FlexBox>

      {openStatus && (
        <CloseJobModal
          open={openStatus}
          setOpen={setOpenStatus}
          id={rowId.current}
        />
      )}

      {openTab && (
        <TabJobDetail
          open={openTab}
          setOpen={setOpenTab}
          job_detail={jobDetail}
          handleOpenModalEdit={handleOpenModalEdit}
        />
      )}

      {openEdit && (
        <EditJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default JobDetail
