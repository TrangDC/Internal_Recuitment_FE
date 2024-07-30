import { Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import { DragEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ChangeStatusModal from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import {
  LOCATION_LABEL,
  STATUS_CANDIDATE_TEXT,
} from 'shared/constants/constants'
import { ENABLED_CHANGE_STATUS } from 'features/jobs/shared/constants'
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
import useActionTable from 'features/candidatejob/hooks/table/useActionTable'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { SpanHiringStatus, TinyLink } from '../styles'
import DotIcon from 'shared/components/icons/DotIcon'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkDragDropCandidateJob from 'features/jobs/permission/utils/checkDragDropCandidateJob'
import CandidateJob from 'shared/schema/database/candidate_job'
import Candidate from 'shared/schema/database/candidate'

interface Props {
  title: string
  number_candidates: number
  list_candidates: CandidateStatusItem[]
  Note?: React.ReactNode
  status:
    | 'applied'
    | 'interviewing'
    | 'offering'
    | 'hired'
    | 'kiv'
    | 'offer_lost'
    | 'ex_staff'
    | 'new'
}

const BoxCandidate = ({
  title,
  number_candidates = 0,
  list_candidates = [],
  Note,
  status,
}: Props) => {
  const navigate = useNavigate()
  const { role, user } = useAuthorization()
  const [candidateSelected, setCandidateSelected] = useState<Candidate>()
  const { actions } = useContextChangeStatus()
  const { handleUpdateStatus } = actions
  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const handleDragStart = (item: CandidateStatusItem, cantDrag: boolean) => {
    if (!cantDrag) return
    return (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('candidate', JSON.stringify(item))
    }
  }

  const handleDropEvent: DragEventHandler<HTMLDivElement> = (event) => {
    const data = event.dataTransfer.getData('candidate')
    const parsedData = JSON.parse(data)

    if (parsedData.status === status) return
    const listChange = ENABLED_CHANGE_STATUS[parsedData.status]
    if (listChange.includes(status)) {
      setCandidateSelected({
        ...parsedData.candidate,
        status: parsedData.status,
      })
      handleOpenChangeStatus(parsedData.id, parsedData)
    } else {
      toast.error(
        //@ts-ignore
        `Cannot move candidate from ${STATUS_CANDIDATE_TEXT[parsedData.status]} to ${STATUS_CANDIDATE_TEXT[status]}`
      )
    }
  }

  return (
    <BoxContainerCandidate
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={handleDropEvent}
    >
      <BoxCandidateTitle>
        <FlexBox
          gap={1.25}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FlexBox alignItems={'center'} gap={1.25}>
            <SpanHiringStatus>{title}</SpanHiringStatus>
            <Tiny color={'#4D607A'} lineHeight={'14.63px'}>
              {number_candidates}
            </Tiny>
          </FlexBox>
          {Note}
        </FlexBox>
      </BoxCandidateTitle>
      <BoxField>
        {list_candidates?.map((item) => {
          const candidateJobOfTeamId = item?.hiring_job?.hiring_team?.id ?? ''
          const cantDrag = checkDragDropCandidateJob({
            me: user,
            role,
            candidateJobOfTeamId,
          })
          return (
            <BoxFieldInfo
              key={item?.id}
              onClick={() => {
                navigate(`/dashboard/job-application-detail/${item.id}`)
              }}
              draggable={true}
              onDragStart={handleDragStart(item, cantDrag)}
            >
              <SpanInfo>{item?.candidate?.name}</SpanInfo>
              <FlexBox flexDirection={'column'} gap={'10px'}>
                <FlexBox alignItems={'center'} gap={'6px'}>
                  <PhoneIcon
                    sx={{
                      fontSize: '12px',
                      '& path': {
                        fill: '#4D607A',
                      },
                    }}
                  />{' '}
                  <TinyInfo>{item?.candidate?.phone}</TinyInfo>
                </FlexBox>

                <FlexBox alignItems={'center'} gap={'6px'}>
                  <TeamIcon
                    sx={{
                      fontSize: '12px',
                      '& path': {
                        fill: '#4D607A',
                      },
                    }}
                  />{' '}
                  <FlexBox gap={0.75} alignItems={'center'}>
                    <TinyInfo>{item?.hiring_job?.hiring_team?.name}</TinyInfo>
                    <DotIcon />
                    <TinyInfo>
                      {LOCATION_LABEL[item?.hiring_job?.location]}
                    </TinyInfo>
                  </FlexBox>
                </FlexBox>

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
                      navigate(`/dashboard/job-detail/${item?.hiring_job_id}`)
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
        })}
      </BoxField>
      {openChangeStatus && (
        <ChangeStatusModal
          open={openChangeStatus}
          setOpen={setOpenChangeStatus}
          candidateId={candidateSelected?.id as string}
          id={rowId.current}
          rowData={rowData.current}
          //@ts-ignore
          statusCurrent={candidateSelected?.status}
          defaultStatus={status}
          onSuccess={handleUpdateStatus}
        />
      )}
    </BoxContainerCandidate>
  )
}

export default BoxCandidate
