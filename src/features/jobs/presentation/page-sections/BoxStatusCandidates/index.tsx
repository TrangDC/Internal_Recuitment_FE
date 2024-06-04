import {
  BoxField,
  BoxFieldContainer,
  BoxTitle,
  DivField,
} from '../../providers/styles'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import { CandidateStatusItem } from '../../providers/hooks/useCandidatesByJob'
import { DragEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENABLED_CHANGE_STATUS } from '../../providers/constants'
import { toast } from 'react-toastify'
import useActionTable from 'features/candidatejob/presentation/providers/hooks/useActionTable'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import ChangeStatusModal from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { Candidate } from 'features/candidates/domain/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { STATUS_CANDIDATE_TEXT } from 'shared/constants/constants'

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

const BoxStatusCandidates = ({
  title,
  number_candidates = 0,
  list_candidates = [],
  Note,
  status,
}: Props) => {
  const navigate = useNavigate()
  const [candidateSelected, setCandidateSelected] = useState<Candidate>()

  const queryClient = useQueryClient()
  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_JOB],
    })
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.JOB],
    })
  }

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
    <DivField
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={handleDropEvent}
    >
      <BoxTitle>
        <FlexBox gap={'10px'} alignItems={'center'}>
          <Span>{title}</Span>
          <Tiny color={'#4D607A'}>{number_candidates}</Tiny>
          {Note}
        </FlexBox>
      </BoxTitle>
      <BoxField>
        {list_candidates?.map((item) => {
          return (
            <BoxFieldContainer
              key={item.id}
              onClick={() => {
                navigate(`/dashboard/job-application-detail/${item.id}`)
              }}
              draggable={true}
              onDragStart={handleDragStart(item)}
            >
              <Span>{item.candidate.name}</Span>
              <FlexBox alignItems={'center'} gap={'6px'}>
                <PhoneIcon /> <Tiny>{item.candidate.phone}</Tiny>
              </FlexBox>
            </BoxFieldContainer>
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
          onSuccess={handleRefreshList}
        />
      )}
    </DivField>
  )
}

export default BoxStatusCandidates
