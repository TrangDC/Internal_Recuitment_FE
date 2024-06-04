import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import IconWrapper from 'shared/components/IconWrapper'
import { H5, Span } from 'shared/components/Typography'
import useTextTranslation from 'shared/constants/text'
import Jobs from 'shared/components/icons/Jobs'
import {
  BoxCircle,
  BoxWrapperOuterContainer,
  BtnPrimary,
  HeadingWrapper,
} from 'shared/styles'
import { useParams } from 'react-router-dom'
import useJobDetail from '../providers/hooks/useJobDetail'
import { SpanText, TinyText } from 'shared/components/form/styles'
import { useMemo, useState } from 'react'
import ChipFieldStatus from 'shared/components/input-fields/ChipFieldStatus'
import { STATUS_STYLE } from '../providers/constants'
import GenaralInformationHiring from '../page-sections/GeneralInformationHiring'
import useActionTable from '../providers/hooks/useActionTable'
import { LOCATION_LABEL, STATUS_STATE } from 'shared/constants/constants'
import { format } from 'date-fns'
import { PRIORITY_DATA } from 'shared/components/autocomplete/priority-auto-complete'
import { CloseJobModal, TabJobDetail } from '../page-sections'

const JobDetail = () => {
  const [openTab, setOpenTab] = useState(false)

  const { id } = useParams()
  const { jobDetail } = useJobDetail(id as String)
  const translation = useTextTranslation()

  const { openStatus, setOpenStatus, handleOpenStatus, rowId, rowData } =
    useActionTable()

    const disabledBtn = useMemo(() => {
      return jobDetail.status === STATUS_STATE.OPENED && !jobDetail?.is_able_to_close;
    }, [jobDetail])

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <Jobs sx={{ color: 'primary.main' }} />
          </IconWrapper>
          <H5>{jobDetail?.name}</H5>
        </FlexBox>
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
                    <ChipFieldStatus
                      label={STATUS_STYLE[jobDetail?.status]?.text}
                      style={{
                        backgroundColor:
                          STATUS_STYLE[jobDetail?.status]?.backgroundColor,
                        color: STATUS_STYLE[jobDetail?.status]?.color,
                      }}
                    />
                  </TinyText>
                </FlexBox>

                <FlexBox gap={0.75} alignItems={'center'}>
                  <SpanText>Priority</SpanText>
                  <TinyText>
                    <ChipFieldStatus
                      //@ts-ignore
                      label={PRIORITY_DATA[jobDetail?.priority]?.label}
                      style={{
                        backgroundColor:
                          //@ts-ignore
                          PRIORITY_DATA[jobDetail?.priority]?.backgroundColor,
                        //@ts-ignore
                        color: PRIORITY_DATA[jobDetail?.priority]?.color,
                      }}
                    />
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
              </FlexBox>
              <FlexBox gap={1}>
                <BtnPrimary
                    onClick={() => {
                      if(disabledBtn) return;
                      handleOpenStatus(jobDetail?.id)
                    }}
                    className={disabledBtn ? 'disabled': ''}
                  >
                    <Span>{jobDetail.status === STATUS_STATE.OPENED ? 'Close Job' : 'Reopen Job'}</Span>
                  </BtnPrimary>
                <BtnPrimary onClick={() => setOpenTab(true)}>
                  <Span>View Details</Span>
                </BtnPrimary>
              </FlexBox>
            </FlexBox>
          </HeadingWrapper>
        </BoxWrapperOuterContainer>

        <BoxWrapperOuterContainer sx={{marginTop: 0}}>
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
        />
      )}
    </Box>
  )
}

export default JobDetail
