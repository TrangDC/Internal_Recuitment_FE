import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import { DragEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import ChangeStatusModal from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { Candidate } from 'features/candidates/domain/interfaces'
import {
  LOCATION_LABEL,
  STATUS_CANDIDATE_TEXT,
} from 'shared/constants/constants'
import { ENABLED_CHANGE_STATUS } from 'features/jobs/presentation/providers/constants'
import {
  BoxCandidateTitle,
  BoxContainerCandidate,
  BoxField,
  BoxFieldInfo,
  SpanInfo,
  TinyInfo,
} from '../../../providers/styles/index'
import TeamIcon from 'shared/components/icons/Team'
import Jobs from 'shared/components/icons/Jobs'
import ChipPriority from 'shared/class/priority/components/ChipPriority'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { Box } from '@mui/material'
import ActionsButton from './ActionGroupButton'
import useActionTable from 'features/candidatejob/presentation/providers/hooks/useActionTable'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { TinyLink } from '../styles'

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
  const [candidateSelected, setCandidateSelected] = useState<Candidate>()

  const { handleUpdateStatus } = useContextChangeStatus()

  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const handleDragStart = (item: CandidateStatusItem) => {
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
      setCandidateSelected(parsedData.candidate)
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
      sx={{
        minWidth: '240px',
        width: '240px',
      }}
    >
      <BoxCandidateTitle>
        <FlexBox
          gap={'10px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FlexBox alignItems={'center'} gap={'10px'}>
            <Span>{title}</Span>
            <Tiny color={'#4D607A'}>{number_candidates}</Tiny>
          </FlexBox>
          {Note}
        </FlexBox>
      </BoxCandidateTitle>
      <BoxField>
        {list_candidates?.map((item) => {
          return (
            <BoxFieldInfo
              key={item.id}
              onClick={() => {
                navigate(`/dashboard/job-application-detail/${item.id}`)
              }}
              draggable={true}
              onDragStart={handleDragStart(item)}
            >
              <SpanInfo>{item.candidate.name}</SpanInfo>
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
                  <TinyInfo>{item.candidate.phone}</TinyInfo>
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
                  <TinyInfo>
                    {item.hiring_job.team?.name} .{' '}
                    {LOCATION_LABEL[item.hiring_job.location]}
                  </TinyInfo>
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
                  <Box onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/dashboard/job-detail/${item.hiring_job_id}`)
                  }}>
                    <TinyLink sx={{}}>{item.hiring_job.name}</TinyLink>
                  </Box>
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
                  <ChipPriority status={item.hiring_job?.priority} />
                  <Box onClick={(e) => e.stopPropagation()}>
                    <ActionsButton rowId={item.id} rowData={item} />
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
