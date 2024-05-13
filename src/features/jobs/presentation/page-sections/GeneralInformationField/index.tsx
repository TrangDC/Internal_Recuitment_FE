import { Box, Grid, styled } from '@mui/material'
import { Span, Tiny } from 'shared/components/Typography'
import useJobDetail from '../../providers/hooks/useJobDetail'
import { useParams } from 'react-router-dom'
import { findItem, getInfoData } from 'shared/utils/utils'
import { LOCATION_DATA } from '../../providers/constants'
import { SalaryFactory } from 'shared/class/salary'
import { useMemo } from 'react'
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
import useTextTranslation from 'shared/constants/text'

const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  //@ts-ignore
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const DivField = styled(Box)(({ theme }) => ({
  width: '100%',

  '& span': {
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

  const salary = useMemo(() => {
    return new SalaryFactory({
      salary_type: jobDetail.salary_type,
      salary_attibutes: getInfoData({
        field: ['salary_from', 'salary_to'],
        object: jobDetail,
      }),
    })
  }, [jobDetail])

  const translation = useTextTranslation();

  return (
    <DivWrapperField>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>{translation.MODLUE_JOBS.job_name}</Span>
            <Tiny>{jobDetail?.name}</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>{translation.MODLUE_TEAMS.team}</Span>
            <Tiny>{jobDetail?.team?.name}</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>{translation.COMMON.location}</Span>
            <Tiny>{findItem(LOCATION_DATA, jobDetail?.location)?.name}</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>{translation.MODLUE_JOBS.requester}</Span>
            <Tiny> {jobDetail?.user?.name}</Tiny>
          </DivField>
        </Grid>

        <Grid item xs={12} md={6}>
          <DivField>
            <Span>{translation.COMMON.salary}</Span>
            <Tiny>{salary?.getSalaryByType()?.gerenateStringSalary()}</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12} md={6}>
          <DivField>
            <Span>{translation.MODLUE_JOBS.staft_required}</Span>
            <Tiny>{jobDetail?.amount}</Tiny>
          </DivField>
        </Grid>
        <Grid item xs={12}>
          <DivField>
            <Span>{translation.COMMON.description}</Span>
            <Box>
              <GenerateInnerHTML innerHTML={jobDetail.description}/>
            </Box>
          </DivField>
        </Grid>
      </Grid>
    </DivWrapperField>
  )
}

export default GeneralInformationField
