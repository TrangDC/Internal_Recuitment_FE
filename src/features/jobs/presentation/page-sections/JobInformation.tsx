import { Box, Divider, Grid } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Text15md, Tiny12md } from 'shared/components/Typography'
import ApprovalProcess from './ApprovalProcess'
import useJobDetail from 'features/jobs/hooks/crud/useJobDetail'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { SalaryFactory } from 'shared/class/salary'
import { getInfoData } from 'shared/utils/utils'
import { LOCATION_LABEL } from 'shared/constants/constants'
import { ChipSkill } from 'shared/components/tree/skill-tree/style'
import { BoxCircle } from 'shared/styles'
import { TinyText } from 'shared/components/form/styles'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import ChipJob from 'shared/class/job-status/components/ChipJob'
import CustomIframe from 'shared/components/CustomIframe'
import { capitalizeFirstLetter } from 'shared/utils/convert-string'
import RequestResolutionTime from '../components/RequestResolutionTime'

function JobInformation() {
  const { id } = useParams()
  const { jobDetail } = useJobDetail(id as String)
  const widthItemRec = 'calc(20% - 16px)'
  const widthItemHir = 'calc(33.33% - 16px)'
  const widthInformation = 'calc(100% - 280px)'

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

  const approvalSteps = jobDetail?.steps || []
  return (
    <Box minHeight={'80vh'} width={'100%'}>
      <FlexBox>
        <Box width={widthInformation}>
          <Box padding={'16px 24px 24px 24px'} width={'100%'}>
            <Text15md color={'primary.800'} marginBottom={1}>
              Hiring Information
            </Text15md>
            <Grid container rowGap={'16px'} columnGap={'16px'}>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Name
                  </Tiny12md>
                  <Text13sb color={'text.900'}>{jobDetail.name}</Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Job position
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {jobDetail?.job_position?.name}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Location
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {LOCATION_LABEL[jobDetail.location]}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Salary
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {salary?.getSalaryByType()?.gerenateStringSalary()}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Hiring team
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {jobDetail?.hiring_team?.name}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Requester
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {jobDetail?.user?.name}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Skills needed
                  </Tiny12md>
                  <FlexBox>
                    {job_skills.map((skills) => (
                      <ChipSkill label={skills} />
                    ))}
                  </FlexBox>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Staff needed
                  </Tiny12md>
                  <BoxCircle>
                    <TinyText sx={{ color: 'white !important' }}>
                      {jobDetail?.amount}
                    </TinyText>
                  </BoxCircle>
                </Box>
              </Grid>
              <Grid item width={widthItemHir}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Staff level
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {jobDetail?.level &&
                      capitalizeFirstLetter(jobDetail?.level)}
                  </Text13sb>
                </Box>
              </Grid>
            </Grid>
            <Divider
              orientation="horizontal"
              variant="middle"
              flexItem
              sx={{
                marginTop: 2,
                marginBottom: 2,
                marginLeft: 0,
                marginRight: 0,
              }}
            />
            <Text15md color={'primary.800'} marginBottom={1}>
              Recruitment Information
            </Text15md>
            <Grid container rowGap={'16px'} columnGap={'16px'}>
              <Grid item width={widthItemRec}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={0.5}>
                    Priority
                  </Tiny12md>
                  <ChipPriority status={jobDetail?.priority} />
                </Box>
              </Grid>
              <Grid item width={widthItemRec}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={0.5}>
                    Status
                  </Tiny12md>
                  <ChipJob status={jobDetail?.status} />
                </Box>
              </Grid>
              <Grid item width={widthItemRec}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    REC team
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {jobDetail?.rec_team?.name}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemRec}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    REC in charge
                  </Tiny12md>
                  <Text13sb color={'text.900'}>
                    {jobDetail?.rec_in_charge?.name}
                  </Text13sb>
                </Box>
              </Grid>
              <Grid item width={widthItemRec}>
                {jobDetail.status !== 'cancelled' &&
                  jobDetail.status !== 'pending_approvals' && (
                    <Box>
                      <Tiny12md color={'text.500'} marginBottom={1}>
                        Request resolution time
                      </Tiny12md>
                      <Text13sb color={'text.900'}>
                        {jobDetail.opened_at ? (
                          <RequestResolutionTime
                            time={new Date(jobDetail.opened_at)}
                          />
                        ) : null}
                      </Text13sb>
                    </Box>
                  )}
              </Grid>
              <Grid item width={'100%'}>
                <Box>
                  <Tiny12md color={'text.500'} marginBottom={1}>
                    Note
                  </Tiny12md>
                  <Text13sb color={'text.900'}>{jobDetail?.note}</Text13sb>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <ApprovalProcess steps={approvalSteps} />
      </FlexBox>
      <Box
        padding={'16px 24px 24px 24px'}
        width={'100%'}
        borderTop={'1px solid #E3E6EB'}
      >
        <Text15md color={'primary.800'} marginBottom={1}>
          Job description
        </Text15md>
        <CustomIframe
          value={jobDetail.description}
          iframeStyle={{
            border: 'none',
            width: '100%',
            height: '300px',
          }}
          title="Job Description"
        />
      </Box>
    </Box>
  )
}

export default JobInformation
