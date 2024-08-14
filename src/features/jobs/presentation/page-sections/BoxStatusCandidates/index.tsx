import {
  BoxField,
  BoxFieldContainer,
  BoxTitle,
  DivField,
} from '../../../shared/styles'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import { DragEventHandler, useState } from 'react'
import { ENABLED_CHANGE_STATUS } from '../../../shared/constants'
import { toast } from 'react-toastify'
import useActionTable from 'features/candidatejob/hooks/table/useActionTable'
import ChangeStatusModal from 'features/candidatejob/presentation/page-sections/ChangeStatusModal'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import checkDragDropCandidateJob from 'features/jobs/permission/utils/checkDragDropCandidateJob'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import CandidateJob from 'shared/schema/database/candidate_job'
import { CandidateStatusEnum } from 'shared/schema'

interface Props {
  title: string
  number_candidates: number
  list_candidates: CandidateStatusItem[]
  Note?: React.ReactNode
  status: CandidateStatusEnum
}

const BoxStatusCandidates = ({
  title,
  number_candidates = 0,
  list_candidates = [],
  Note,
  status,
}: Props) => {
  const [candidateSelected, setCandidateSelected] = useState({
    candidateId: '',
    status: '',
  })
  const { role, user } = useAuthorization()
  const queryClient = useQueryClient()
  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_JOB],
    })
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.JOB],
    })
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.GROUP_CANDIDATE_STATUS],
    })
  }

  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJob>()

  const handleDragStart = (item: CandidateStatusItem, cantDrag: boolean) => {
    if (!cantDrag) return
    return (event: React.DragEvent<HTMLAnchorElement>) => {
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
        candidateId: parsedData.candidate.id,
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
    <DivField
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={handleDropEvent}
      sx={{
        minWidth: '170px',
      }}
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
          const candidateJobOfTeamId = item?.hiring_job?.hiring_team?.id ?? ''
          const cantDrag = checkDragDropCandidateJob({
            me: user,
            role,
            candidateJobOfTeamId,
          })
          return (
            <BoxFieldContainer
              key={item.id}
              draggable={true}
              onDragStart={handleDragStart(item, cantDrag)}
              href={`/dashboard/job-application-detail/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
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
          candidateId={candidateSelected?.candidateId as string}
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
