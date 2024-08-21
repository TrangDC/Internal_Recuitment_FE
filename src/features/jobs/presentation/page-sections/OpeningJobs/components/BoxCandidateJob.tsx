import { Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCATION_LABEL } from 'shared/constants/constants'
import {
  BoxCandidateTitle,
  BoxContainerCandidate,
  BoxField,
  BoxFieldInfo,
  SpanInfo,
  TinyInfo,
} from '../../../../shared/styles/index'
import TeamIcon from 'shared/components/icons/Team'
import Jobs from 'shared/components/icons/Jobs'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { Box } from '@mui/material'
import ActionsButton from './ActionGroupButton'
import { SpanHiringStatus, TinyLink } from '../styles'
import DotIcon from 'shared/components/icons/DotIcon'
import CollapseLeftIcon from 'shared/components/icons/CollapseLeftIcon'
import CollapseRightIcon from 'shared/components/icons/CollapseRightIcon'
import Draggable from 'shared/components/dnd/components/Draggable'

interface Props {
  title: string
  number_candidates: number
  list_candidates: CandidateStatusItem[]
  Note?: React.ReactNode
  droppableId: string
}

const BoxCandidateJob = ({
  title,
  number_candidates = 0,
  list_candidates = [],
  Note,
  droppableId,
}: Props) => {
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState<boolean>(false)

  return (
    <BoxContainerCandidate className={`${collapse && 'collapse'}`}>
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
              <Tiny color={'#4D607A'} lineHeight={'14.63px'}>
                {number_candidates}
              </Tiny>
            </FlexBox>
            <FlexBox gap={1.25} className="action__collapse">
              {Note}
              <Box
                onClick={() => setCollapse((prev) => !prev)}
                sx={{ height: '20px', cursor: 'pointer' }}
              >
                {!collapse ? <CollapseLeftIcon /> : <CollapseRightIcon />}
              </Box>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </BoxCandidateTitle>
      {!collapse && (
        <BoxField>
          {list_candidates?.map((item) => {
            return (
              <Draggable
                draggableId={item.id}
                data={item}
                droppableId={droppableId}
              >
                {() => {
                  return (
                    <BoxFieldInfo>
                      <a
                        key={item?.id}
                        href={`/dashboard/job-application-detail/${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SpanInfo>{item?.candidate?.name}</SpanInfo>
                        <FlexBox flexDirection={'column'} gap={'10px'}>
                          <FlexBox alignItems={'center'} gap={'6px'}>
                            <PhoneIcon
                              sx={{
                                fontSize: '12px',
                                color: '#4D607A',
                              }}
                            />{' '}
                            <TinyInfo>{item?.candidate?.phone}</TinyInfo>
                          </FlexBox>

                          <FlexBox alignItems={'center'} gap={'6px'}>
                            <TeamIcon
                              sx={{
                                fontSize: '12px',
                                color: '#4D607A',
                              }}
                            />{' '}
                            <FlexBox gap={0.75} alignItems={'center'}>
                              <TinyInfo>
                                {item?.hiring_job?.hiring_team?.name}
                              </TinyInfo>
                              <DotIcon />
                              <TinyInfo>
                                {LOCATION_LABEL[item?.hiring_job?.location]}
                              </TinyInfo>
                            </FlexBox>
                          </FlexBox>
                        </FlexBox>
                      </a>
                      <FlexBox flexDirection={'column'} gap={'10px'}>
                        <FlexBox alignItems={'center'} gap={'6px'}>
                          <Jobs
                            sx={{
                              fontSize: '12px',
                              '& path': {
                                fill: '#4D607A',
                              },
                            }}
                          />
                          <TinyLink
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(
                                `/dashboard/job-detail/${item?.hiring_job_id}`
                              )
                            }}
                          >
                            {item?.hiring_job.name}
                          </TinyLink>
                        </FlexBox>

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
                          <ChipPriority status={item?.hiring_job?.priority} />
                          <Box onClick={(e) => e.stopPropagation()}>
                            <ActionsButton rowId={item?.id} rowData={item} />
                          </Box>
                        </FlexBox>
                      </FlexBox>
                    </BoxFieldInfo>
                  )
                }}
              </Draggable>
            )
          })}
        </BoxField>
      )}
    </BoxContainerCandidate>
  )
}

export default BoxCandidateJob
