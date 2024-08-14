import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import BoxTextSquare from 'shared/components/utils/boxText'
import { Box } from '@mui/material'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularLoading } from '../styles'
import { useEffect, useState } from 'react'
import { removeEmptyInObject } from 'shared/utils/utils'
import { DragDropProvider } from 'shared/components/dnd'
import Droppable from 'shared/components/dnd/components/Droppable'
import BoxCandidateJob from './BoxCandidateJob'
import { ENABLED_CHANGE_STATUS } from 'features/application/shared/constants'
import { toast } from 'react-toastify'
import { CandidateStatusEnum } from 'shared/schema'
import Candidate from 'shared/schema/database/candidate'
import useActionTable from 'features/candidatejob/hooks/table/useActionTable'
import CandidateJobDB from 'shared/schema/database/candidate_job'
import { ChangeStatusModal } from 'features/candidatejob/presentation/page-sections'
import { BoxDroppableCandidate } from 'features/application/shared/styles'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'

const CandidateJob = () => {
  const {
    data,
    show_more,
    total_data: { total_current },
    actions: { handleFetchNextPage, handleUpdateStatus },
  } = useContextChangeStatus()

  const { applied, interviewing, offering, hired, failedCV, failedInterview, offer_lost, ex_staff } =
    data

  //change status hiring process
  const [candidateSelected, setCandidateSelected] = useState<Candidate>()
  const [destination, setDestination] = useState<string>('')

  const {
    handleOpenChangeStatus,
    openChangeStatus,
    setOpenChangeStatus,
    rowData,
    rowId,
  } = useActionTable<CandidateJobDB>()

  const { actions, action_filter } = useContextChangeStatus()
  const { handleFilter, handleFreeWord } = actions
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { search } = useSearchListReturn

  const handleSearchFreeWorld = (value: string) => {
    handleFreeWord({
      candidate_email: value,
      candidate_name:value
    })
  }

  const { dataFilterWithValue } = useFilterReturn

  useEffect(() => {
    const { page_job, ...dataFilter } = dataFilterWithValue

    handleFilter({
      ...removeEmptyInObject(dataFilter),
    })
  }, [JSON.stringify(dataFilterWithValue)])

  useEffect(() => {
    handleSearchFreeWorld(search?.candidate_email)
  }, [search])

  return (
    <Box sx={{ padding: 1.5 }}>
      <InfiniteScroll
        dataLength={total_current}
        next={handleFetchNextPage}
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
                    `Cannot move candidate from ${application_data?.[data?.status as CandidateStatusEnum]?.label} to ${application_data?.[destinationId as CandidateStatusEnum]?.label}`
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
          onSuccess={handleUpdateStatus}
        />
      )}
    </Box>
  )
}

export default CandidateJob
