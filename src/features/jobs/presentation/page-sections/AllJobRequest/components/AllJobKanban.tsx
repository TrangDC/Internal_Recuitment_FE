import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { Box } from '@mui/material'
import { useContextKanbanJob } from '../context/KanbanJobContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularLoading } from '../styles'
import { DragDropProvider } from 'shared/components/dnd'
import { ENABLED_CHANGE_STATUS_JOB } from 'features/application/shared/constants'
import { toast } from 'react-toastify'
import BoxKanbanJob from './BoxKanbanJob'
import { JobStatus } from 'shared/class/job-status'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import CloseJobModal from '../../CloseJobModal'
import ReopenJobModal from '../../ReopenModal'
import CancelModal from '../../CancelModal'
import { cloneDeep } from 'lodash'
import HiringJob from 'shared/schema/database/hiring_job'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import checkReopenJobPermission from 'features/permissions/jobs/checkReopenJobPermission'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkCloseJobPermission from 'features/permissions/jobs/checkCloseJobPermission'
import checkCancelJobPermission from 'features/permissions/jobs/checkCancelJobPermission'

const { STATUS_HIRING_JOB, STATUS_STYLE } = JobStatus
const AllJobKanban = () => {
  const {
    data,
    show_more,
    total_data: { total_current },
    actions: { fetchNextPage },
  } = useContextKanbanJob()
  const { role, user } = useAuthorization()
  const { cancelled, closed, opened, pending_approvals } = data
  const { handleFailed } = usePopup()

  const {
    openCancel,
    setOpenCancel,
    handleOpenCancel,
    openClose,
    setOpenClose,
    handleOpenClose,
    openReopen,
    setOpenReopen,
    handleOpenReopen,
    rowId,
  } = useActionTable()

  return (
    <Box sx={{ padding: 1.5 }}>
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
                const cloneData = cloneDeep(data) as HiringJob
                const inTeam =
                  user?.teamId === cloneData.hiring_team.id ||
                  user?.rectTeamId === cloneData?.rec_team?.id
                const recInChargeId = cloneData?.rec_in_charge?.id
                const isOwner = user?.id === cloneData?.user?.id
                const isRecInCharge = user?.id === recInChargeId
                if (!destinationId) return
                //get list status is enabled dragging for each status hiring process
                const listChange = ENABLED_CHANGE_STATUS_JOB[cloneData?.status]

                switch (cloneData.status) {
                  case STATUS_HIRING_JOB.OPENED:
                    if (destinationId === STATUS_HIRING_JOB.CANCELLED) {
                      if (!cloneData.is_able_to_cancel) {
                        handleFailed({
                          title: 'Failed to cancel request',
                          content:
                            'Job request cannot be cancelled as there is a hired candidate.',
                        })
                        return
                      }
                      const hasOpenPermission = checkCancelJobPermission({
                        inTeam,
                        role,
                        isOwner,
                      })
                      if (hasOpenPermission) handleOpenCancel(cloneData.id)
                      return
                    }
                    if (destinationId === STATUS_HIRING_JOB.CLOSED) {
                      const hasOpenPermission = checkCloseJobPermission({
                        inTeam,
                        isRequester: isOwner,
                        isRecInCharge,
                        role,
                      })
                      if (hasOpenPermission) handleOpenClose(cloneData.id)
                      return
                    }
                    break

                  case STATUS_HIRING_JOB.PENDING_APPROVALS:
                    if (destinationId === STATUS_HIRING_JOB.CANCELLED) {
                      const hasOpenPermission = checkCancelJobPermission({
                        inTeam,
                        role,
                        isOwner,
                      })
                      if (hasOpenPermission) handleOpenCancel(cloneData.id)
                      return
                    }
                    break

                  case STATUS_HIRING_JOB.CLOSED:
                    if (destinationId === STATUS_HIRING_JOB.OPENED) {
                      const hasOpenPermission = checkReopenJobPermission({
                        inTeam,
                        role,
                        isOwner,
                      })
                      if (hasOpenPermission) handleOpenReopen(cloneData.id)
                      return
                    }
                    break

                  default:
                    break
                }

                if (!listChange.includes(destinationId)) {
                  toast.error(
                    `Cannot move job request from ${STATUS_STYLE[cloneData?.status]?.text} to ${STATUS_STYLE[destinationId]?.text}`
                  )
                  return
                }
              }}
            >
              <BoxKanbanJob
                title="PENDING APPROVALS"
                number_jobs={pending_approvals?.length}
                list_job={pending_approvals}
                droppableId={'pending_approvals'}
              />
              <BoxKanbanJob
                title="OPENING"
                number_jobs={opened?.length}
                list_job={opened}
                droppableId={'opened'}
              />
              <BoxKanbanJob
                title="CLOSED"
                number_jobs={closed?.length}
                list_job={closed}
                droppableId={'closed'}
              />
              <BoxKanbanJob
                title="CANCELLED"
                number_jobs={cancelled?.length}
                list_job={cancelled}
                droppableId={'cancelled'}
              />
            </DragDropProvider>
          </FlexBox>
        </Scrollbar>
      </InfiniteScroll>

      {openClose && (
        <CloseJobModal
          open={openClose}
          setOpen={setOpenClose}
          id={rowId.current}
        />
      )}

      {openReopen && (
        <ReopenJobModal
          open={openReopen}
          setOpen={setOpenReopen}
          id={rowId.current}
        />
      )}

      {openCancel && (
        <CancelModal
          open={openCancel}
          setOpen={setOpenCancel}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default AllJobKanban
