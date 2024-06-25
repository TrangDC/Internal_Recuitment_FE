import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import { columns } from '../providers/constants/columns'
import useJobTable from '../providers/hooks/useJobTable'
import useActionTable from '../providers/hooks/useActionTable'
import { DivHeaderWrapper } from '../providers/styles'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import useTextTranslation from 'shared/constants/text'
import Jobs from 'shared/components/icons/Jobs'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import StatusJobAutoComplete from 'shared/components/autocomplete/status-job-autocomplete'
import CloseIcon from 'shared/components/icons/CloseIcon'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import {
  CloseJobModal,
  CreateJobModal,
  DeleteJobModal,
  EditJobModal,
} from '../page-sections'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { JobStatus } from 'shared/class/job-status'
import SearchInput from 'shared/components/table/components/SearchInput'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import useFilterJobs from '../providers/hooks/useFilterJobs'
import FlexBox from 'shared/components/flexbox/FlexBox'

const { STATUS_STATE } = JobStatus

const JobsList = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openStatus,
    setOpenStatus,
    handleOpenStatus,
    rowId,
    setOpenEdit,
  } = useActionTable()

  const navigate = useNavigate()
  const { useFilterReturn, useSearchListReturn } = useFilterJobs()
  const { dataFilterWithValue, controlFilter } = useFilterReturn
  const { search, searchRef, handleSearch } = useSearchListReturn
  const { useTableReturn } = useJobTable({
    filters: dataFilterWithValue,
    search: search,
  })

  const translation = useTextTranslation()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/job-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'Close job',
        onClick: (id) => {
          handleOpenStatus(id)
        },
        title: (rowData) => {
          return rowData.status === STATUS_STATE.OPENED
            ? 'Close job'
            : 'Reopen Job'
        },
        disabled: (rowData) => {
          if (rowData?.status !== STATUS_STATE.OPENED) return false
          if (
            rowData?.is_able_to_close &&
            rowData.status === STATUS_STATE.OPENED
          )
            return false
          return true
        },
        Icon: <CloseIcon />,
      },
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
        disabled: (rowData) => {
          return rowData.status === STATUS_STATE.CLOSED
        },
      },
      {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    ],
    columns,
  })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Jobs} textLable={translation.MODLUE_JOBS.jobs} />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <FlexBox>
            {' '}
            <ControllerFilter
              control={controlFilter}
              title="Team"
              keyName={'team_ids'}
              Node={({ onFilter, value }) => (
                <TeamsAutoComplete
                  name="team"
                  multiple={true}
                  value={value}
                  onCustomChange={(data) =>
                    onFilter(
                      data.map((value) => ({
                        label: value.name,
                        value: value.id,
                      }))
                    )
                  }
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Team',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Status"
              keyName={'status'}
              Node={({ onFilter, value }) => (
                <StatusJobAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => onFilter(data)}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Priority"
              keyName={'priority'}
              Node={({ onFilter, value }) => (
                <PriorityAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => onFilter(data)}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Priority',
                    autoFocus: true,
                  }}
                />
              )}
            />
          </FlexBox>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by Team's name"
              onSearch={handleSearch}
            />
            <ButtonAdd
              Icon={Add}
              textLable={translation.MODLUE_JOBS.add_a_new_job}
              onClick={() => setOpenCreate(true)}
            />
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={colummTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateJobModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}

      {openStatus && (
        <CloseJobModal
          open={openStatus}
          setOpen={setOpenStatus}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default JobsList
