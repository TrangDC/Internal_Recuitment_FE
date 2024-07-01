import { Box, styled } from '@mui/material'
import useJobDetail from '../../providers/hooks/useJobDetail'
import { useParams } from 'react-router-dom'
import { getInfoData } from 'shared/utils/utils'
import { SalaryFactory } from 'shared/class/salary'
import { useMemo } from 'react'
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
import useTextTranslation from 'shared/constants/text'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import { BoxCircle } from 'shared/styles'
import { LOCATION_LABEL } from 'shared/constants/constants'
import ChipJob from 'shared/class/job-status/components/ChipJob'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { ChipLimit } from 'shared/components/chip-stack'

const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  //@ts-ignore
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const DivField = styled(Box)(({ theme }) => ({
  width: '100%',

  '& SpanText': {
    width: '12px',
    fontWeight: 500,
    //@ts-ignore
    color: theme.palette.grey[500],
    lineHeight: '14.63px',
  },

  '& p': {
    //@ts-ignore
    color: theme.palette.grey[900],
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '15.85px',
  },
}))

const GeneralInformationField = () => {
  const { id } = useParams()

  const { jobDetail } = useJobDetail(id as String)

  const job_skills = useMemo(() => {
    if (!jobDetail.entity_skill_types) return []

    const skill_types = jobDetail.entity_skill_types
    return skill_types
      ? skill_types.flatMap((type) => {
          return type.entity_skills.map((skill) => skill.name)
        })
      : []
  }, [jobDetail])

  const salary = useMemo(() => {
    return new SalaryFactory({
      salary_type: jobDetail.salary_type,
      salary_unit: jobDetail.currency,
      salary_attibutes: getInfoData({
        field: ['salary_from', 'salary_to'],
        object: jobDetail,
      }),
    })
  }, [jobDetail])

  const translation = useTextTranslation()

  return (
    <FlexBox flexDirection={'column'} width={'100%'}>
      <DivWrapperField>
        <FlexBox flexDirection={'column'} gap={2.5}>
          <FlexBox gap={7.5}>
            <DivField>
              <SpanText>{translation.MODLUE_JOBS.job_name}</SpanText>
              <TinyText>{jobDetail?.name}</TinyText>
            </DivField>
          </FlexBox>
          <FlexBox gap={7.5}>
            <DivField>
              <SpanText>{translation.COMMON.status}</SpanText>
              <TinyText>
                <ChipJob status={jobDetail?.status}/>
              </TinyText>
            </DivField>

            <DivField>
              <SpanText>Priority</SpanText>
              <TinyText>
                <ChipPriority status={jobDetail?.priority}/>
              </TinyText>
            </DivField>

            <DivField>
              <SpanText>{translation.MODLUE_TEAMS.team}</SpanText>
              <TinyText>{jobDetail?.team?.name}</TinyText>
            </DivField>
          </FlexBox>

          <FlexBox gap={7.5}>
            <DivField>
              <SpanText>{translation.COMMON.location}</SpanText>
              <TinyText>{LOCATION_LABEL[jobDetail?.location]}</TinyText>
            </DivField>
            <DivField>
              <SpanText>{translation.MODLUE_JOBS.staft_required}</SpanText>
              <BoxCircle>
                <TinyText sx={{ color: 'white !important' }}>
                  {jobDetail?.amount}
                </TinyText>
              </BoxCircle>
            </DivField>
            <DivField>
              <SpanText>{translation.MODLUE_JOBS.requester}</SpanText>
              <TinyText>{jobDetail?.user?.name}</TinyText>
            </DivField>
          </FlexBox>

          <FlexBox gap={7.5}>
            <DivField>
              <SpanText>{translation.COMMON.salary}</SpanText>
              <TinyText>
                {salary?.getSalaryByType()?.gerenateStringSalary()}
              </TinyText>
            </DivField>

            <DivField>
              <SpanText>Skills</SpanText>
              <TinyText>
              <ChipLimit chips={job_skills} />
              </TinyText>
            </DivField>

            <DivField>
            </DivField>
          </FlexBox>

        </FlexBox>
      </DivWrapperField>

      <DivWrapperField>
        <FlexBox flexDirection={'column'}>
          <DivField>
            <SpanText>Job Description</SpanText>
          </DivField>
          <Box>
            <GenerateInnerHTML innerHTML={jobDetail.description} />
          </Box>
        </FlexBox>
      </DivWrapperField>
    </FlexBox>
  )
}

export default GeneralInformationField
