import { Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCATION_LABEL } from 'shared/constants/constants'
import {
  BoxCandidateTitle,
  BoxContainerJob,
  BoxField,
  BoxFieldInfo,
  SpanInfo,
  TinyInfo,
} from '../../../../shared/styles/index'
import TeamIcon from 'shared/components/icons/Team'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { Box } from '@mui/material'
import { BoxDroppableJob, SpanHiringStatus } from '../styles'
import DotIcon from 'shared/components/icons/DotIcon'
import CollapseLeftIcon from 'shared/components/icons/CollapseLeftIcon'
import CollapseRightIcon from 'shared/components/icons/CollapseRightIcon'
import Draggable from 'shared/components/dnd/components/Draggable'
import { BoxCircle } from 'shared/styles'
import ActionsButtonAllJob from './ActionGroupButtonAllJob'
import HiringJob from 'shared/schema/database/hiring_job'
import EntitySkillType from 'shared/schema/database/entity_skill_type'
import { ChipLimit } from 'shared/components/chip-stack'
import Droppable from 'shared/components/dnd/components/Droppable'
import { JobStatus } from 'shared/class/job-status'

interface Props {
  title: string
  number_jobs: number
  list_job: HiringJob[]
  Note?: React.ReactNode
  droppableId: string
}

const BoxKanbanJob = ({
  title,
  number_jobs = 0,
  list_job = [],
  Note,
  droppableId,
}: Props) => {
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState<boolean>(false)

  const formatCandidateSkill = (entity_skill_types: EntitySkillType[]) => {
    if (!entity_skill_types) return []

    const skill_types = entity_skill_types
    return skill_types
      ? skill_types.flatMap((type: any) => {
          return type.entity_skills.map((skill: any) => skill.name)
        })
      : []
  }

  return (
    <BoxDroppableJob className={`${collapse && 'collapse'}`}>
      <Droppable droppableId={droppableId}>
        {({ innerRef, droppableId }) => {
          return (
            <BoxContainerJob className={`${collapse && 'collapse'}`}>
              <BoxCandidateTitle>
                <FlexBox
                  gap={1.25}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <FlexBox
                    alignItems={'center'}
                    width={'100%'}
                    justifyContent={'space-between'}
                    gap={2.5}
                    className="box__title"
                  >
                    <FlexBox alignItems={'center'} gap={1.25}>
                      <SpanHiringStatus>{title}</SpanHiringStatus>
                      <BoxCircle sx={{ backgroundColor: '#82868C' }}>
                        <Tiny color={'#fff'} lineHeight={'14.63px'}>
                          {number_jobs}
                        </Tiny>
                      </BoxCircle>
                    </FlexBox>
                    <FlexBox gap={1.25} className="action__collapse">
                      {Note}
                      <Box
                        onClick={() => setCollapse((prev) => !prev)}
                        sx={{ height: '20px', cursor: 'pointer' }}
                      >
                        {!collapse ? (
                          <CollapseLeftIcon />
                        ) : (
                          <CollapseRightIcon />
                        )}
                      </Box>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </BoxCandidateTitle>
              {!collapse && (
                <BoxField>
                  {list_job?.map((item) => {
                    return (
                      <Draggable
                        draggableId={item.id}
                        data={item}
                        droppableId={droppableId}
                      >
                        {() => {
                          const candidate_skills = formatCandidateSkill(
                            item.entity_skill_types
                          )
                          return (
                            <BoxFieldInfo
                              onClick={() => {
                                const linkNavigate =
                                  item?.status ===
                                  JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS
                                    ? `/dashboard/job-detail/${item.id}`
                                    : `/dashboard/job-overview/${item.id}`
                                navigate(linkNavigate)
                              }}
                            >
                              <FlexBox
                                alignItems={'center'}
                                gap={'6px'}
                                justifyContent={'space-between'}
                                sx={{
                                  '& .MuiButtonBase-root': {
                                    padding: '0 !important',
                                  },
                                }}
                              >
                                <ChipPriority status={item?.priority} />
                                <Box onClick={(e) => e.stopPropagation()}>
                                  <ActionsButtonAllJob
                                    rowId={item?.id}
                                    rowData={item}
                                  />
                                </Box>
                              </FlexBox>
                              <FlexBox flexDirection={'column'} gap={'10px'}>
                                {' '}
                                <SpanInfo sx={{ maxWidth: '330px' }}>
                                  {item?.name}
                                </SpanInfo>
                              </FlexBox>
                              <FlexBox flexDirection={'column'} gap={'10px'}>
                                <FlexBox flexDirection={'column'} gap={'10px'}>
                                  <FlexBox alignItems={'center'} gap={'6px'}>
                                    <TeamIcon
                                      sx={{
                                        fontSize: '12px',
                                        color: '#4D607A',
                                      }}
                                    />{' '}
                                    <FlexBox gap={0.75} alignItems={'center'}>
                                      <TinyInfo>
                                        {item?.hiring_team?.name}
                                      </TinyInfo>
                                      <DotIcon />
                                      <TinyInfo>
                                        {LOCATION_LABEL[item?.location]}
                                      </TinyInfo>
                                    </FlexBox>
                                  </FlexBox>
                                </FlexBox>
                              </FlexBox>
                              <FlexBox flexDirection={'column'} gap={'10px'}>
                                <FlexBox alignItems={'center'} gap={'6px'}>
                                  <TeamIcon
                                    sx={{
                                      fontSize: '12px',
                                      color: '#4D607A',
                                    }}
                                  />
                                  <FlexBox gap={0.75} alignItems={'center'}>
                                    <TinyInfo>Hired</TinyInfo>
                                    <DotIcon />
                                    <TinyInfo>
                                      {item?.total_candidates_recruited} /{' '}
                                      {item?.amount}
                                    </TinyInfo>
                                  </FlexBox>
                                </FlexBox>
                              </FlexBox>

                              <FlexBox flexDirection={'column'} gap={'10px'}>
                                <ChipLimit chips={candidate_skills} limit={3} />
                              </FlexBox>
                            </BoxFieldInfo>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                </BoxField>
              )}
            </BoxContainerJob>
          )
        }}
      </Droppable>
    </BoxDroppableJob>
  )
}

export default BoxKanbanJob
