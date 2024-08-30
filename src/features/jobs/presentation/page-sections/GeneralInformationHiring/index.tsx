import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import BoxTextSquare from 'shared/components/utils/boxText'
import { Box, Button } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMemo, useState } from 'react'
import { DragDropProvider } from 'shared/components/dnd'
import Droppable from 'shared/components/dnd/components/Droppable'
import { ENABLED_CHANGE_STATUS } from 'features/application/shared/constants'
import { toast } from 'react-toastify'
import { STATUS_CANDIDATE_TEXT } from 'shared/constants/constants'
import { CandidateStatusEnum } from 'shared/schema'
import Candidate from 'shared/schema/database/candidate'
import useActionTable from 'features/candidatejob/hooks/table/useActionTable'
import CandidateJobDB from 'shared/schema/database/candidate_job'
import { ChangeStatusModal } from 'features/candidatejob/presentation/page-sections'
import { BoxDroppableCandidate } from 'features/application/shared/styles'
import { CircularLoading } from '../AllJobRequest/styles'
import BoxCandidateJob from '../AllJobRequest/components/BoxCandidateJob'
import { DivWrapperProcess } from 'shared/styles'
import { SpanHiring } from 'features/jobs/shared/styles'
import useTextTranslation from 'shared/constants/text'
import { useContextCandidateDetail } from '../AllJobRequest/context/CandidateDetailContext'
import ApplyJobModalDetail from '../ApplyJob'
import HiringJob from 'shared/schema/database/hiring_job'
import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { JobStatus } from 'shared/class/job-status'

interface IGeneralInformationHiring {
  jobDetail: HiringJob
}

const GeneralInformationHiring = ({ jobDetail }: IGeneralInformationHiring) => {
  const translation = useTextTranslation()
  const {
    data,
    show_more,
    total_data: { total_current },
    actions: { fetchNextPage, refetch },
  } = useContextCandidateDetail()

  const {
    applied,
    interviewing,
    offering,
    hired,
    failedCV,
    failedInterview,
    offer_lost,
    ex_staff,
  } = data

  //change status hiring process
  const [candidateSelected, setCandidateSelected] = useState<Candidate>()
  const [destination, setDestination] = useState<string>('')

  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    openCreate,
    setOpenCreate,
    rowId,
  } = useActionTable<CandidateJobDB>()

  const { role, user } = useAuthorization()
  const showApplyJob = useMemo(() => {
    if (jobDetail.status !== JobStatus.STATUS_HIRING_JOB.OPENED) return false

    const createPermissionEverything = checkPermissions({
      role,
      checkBy: {
        compare: 'hasAny',
        permissions: ['CREATE.everything'],
      },
      module: 'CANDIDATE_JOBS',
    })

    const createPermissionTeam = checkPermissions({
      role,
      checkBy: {
        compare: 'hasAny',
        permissions: ['CREATE.everything', 'CREATE.teamOnly'],
      },
      module: 'CANDIDATE_JOBS',
    })

    return (
      createPermissionEverything ||
      (user?.teamId === jobDetail?.hiring_team?.id && createPermissionTeam)
    )
  }, [role, user, jobDetail])

  return (
    <DivWrapperProcess
      flexDirection={'column'}
      gap={'10px'}
      sx={{ padding: 0 }}
    >
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <SpanHiring>{translation.MODLUE_JOBS.hiring_process}</SpanHiring>

        {showApplyJob && (
          <Button variant="contained" onClick={() => setOpenCreate(true)}>
            Apply Candidate
          </Button>
        )}
      </FlexBox>
      <Box>
        <InfiniteScroll
          dataLength={total_current}
          next={fetchNextPage}
          hasMore={show_more}
          loader={
            <Box sx={{ marginTop: 1 }}>
              <CircularLoading />
            </Box>
          }
        >
          <Scrollbar>
            <FlexBox gap={0.75}>
              <DragDropProvider
                onDragEnd={({ destinationId, data, beginId }) => {
                  if (!destinationId) return
                  //get list status is enabled dragging for each status hiring process
                  const listChange = ENABLED_CHANGE_STATUS[data?.status]

                  if (listChange.includes(destinationId)) {
                    setCandidateSelected({
                      ...data.candidate,
                      status: data.status,
                    })
                    handleOpenChangeStatus(data.id, data)
                    setDestination(destinationId)
                  } else {
                    toast.error(
                      `Cannot move candidate from ${STATUS_CANDIDATE_TEXT[data?.status as CandidateStatusEnum]} to ${STATUS_CANDIDATE_TEXT[destinationId as CandidateStatusEnum]}`
                    )
                  }
                }}
              >
                <BoxDroppableCandidate>
                  <Droppable droppableId="applied">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="APPLIED"
                          number_candidates={applied?.length}
                          list_candidates={applied}
                          droppableId={droppableId}
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
                <BoxDroppableCandidate>
                  <Droppable droppableId="interviewing">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="INTERVIEWING"
                          number_candidates={interviewing?.length}
                          list_candidates={interviewing}
                          droppableId={droppableId}
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
                <BoxDroppableCandidate>
                  <Droppable droppableId="offering">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="OFFERING"
                          number_candidates={offering?.length}
                          list_candidates={offering}
                          droppableId={droppableId}
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
                <BoxDroppableCandidate>
                  <Droppable droppableId="hired">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="HIRED"
                          number_candidates={hired?.length}
                          list_candidates={hired}
                          droppableId={droppableId}
                          Note={
                            <BoxTextSquare
                              boxProps={{
                                sx: {
                                  background: '#D4FCEC',
                                  color: '#20A4A9',
                                },
                              }}
                              content="Success"
                            />
                          }
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
                <BoxDroppableCandidate>
                  <Droppable droppableId="failed_cv">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="Failed CV"
                          number_candidates={failedCV?.length}
                          list_candidates={failedCV}
                          droppableId={droppableId}
                          Note={
                            <BoxTextSquare
                              boxProps={{
                                sx: {
                                  background: '#FFE4E1',
                                  color: '#DB4E82',
                                },
                              }}
                              content="Failed"
                            />
                          }
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
                <BoxDroppableCandidate>
                  <Droppable droppableId="failed_interview">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="Failed Interview"
                          number_candidates={failedInterview?.length}
                          list_candidates={failedInterview}
                          droppableId={droppableId}
                          Note={
                            <BoxTextSquare
                              boxProps={{
                                sx: {
                                  background: '#FFE4E1',
                                  color: '#DB4E82',
                                },
                              }}
                              content="Failed"
                            />
                          }
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>

                <BoxDroppableCandidate>
                  <Droppable droppableId="offer_lost">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="OFFERED LOST"
                          number_candidates={offer_lost?.length}
                          list_candidates={offer_lost}
                          droppableId={droppableId}
                          Note={
                            <BoxTextSquare
                              boxProps={{
                                sx: {
                                  background: '#FFE4E1',
                                  color: '#DB4E82',
                                },
                              }}
                              content="Failed"
                            />
                          }
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
                <BoxDroppableCandidate>
                  <Droppable droppableId="ex_staff">
                    {({ innerRef, droppableId }) => {
                      return (
                        <BoxCandidateJob
                          title="EX-STAFF"
                          number_candidates={ex_staff?.length}
                          list_candidates={ex_staff}
                          droppableId={droppableId}
                        />
                      )
                    }}
                  </Droppable>
                </BoxDroppableCandidate>
              </DragDropProvider>
            </FlexBox>
          </Scrollbar>
        </InfiniteScroll>

        {openChangeStatus && (
          <ChangeStatusModal
            open={openChangeStatus}
            setOpen={setOpenChangeStatus}
            candidateId={candidateSelected?.id as string}
            id={rowId.current}
            rowData={rowData.current}
            statusCurrent={candidateSelected?.status as CandidateStatusEnum}
            defaultStatus={destination}
            onSuccess={refetch}
          />
        )}

        {openCreate && (
          <ApplyJobModalDetail
            open={openCreate}
            setOpen={setOpenCreate}
            jobDetail={jobDetail}
            onSuccess={() => {
              refetch()
            }}
          />
        )}
      </Box>
    </DivWrapperProcess>
  )
}

export default GeneralInformationHiring
