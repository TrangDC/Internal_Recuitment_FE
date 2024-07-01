import { Box } from '@mui/system'
import { columns } from '../../providers/constants/columns'
import Add from 'shared/components/icons/Add'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import useTextTranslation from 'shared/constants/text'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import CloseIcon from 'shared/components/icons/CloseIcon'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import { JobStatus } from 'shared/class/job-status'
import useActionTable from '../../providers/hooks/useActionTable'
import useJobTable from '../../providers/hooks/useJobTable'
import { DivHeaderWrapper } from '../../providers/styles'
import CreateJobModal from '../CreateJobModal'
import EditJobModal from '../EditJobModal'
import DeleteJobModal from '../DeleteJobModal'
import { CloseJobModal } from '..'
import useFilterJobs from '../../providers/hooks/useFilterJobs'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import StatusJobAutoComplete from 'shared/components/autocomplete/status-job-autocomplete'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SearchInput from 'shared/components/table/components/SearchInput'
import { Fragment } from 'react/jsx-runtime'

const { STATUS_STATE } = JobStatus

const AllJob = () => {
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
    <Fragment>
      <BoxWrapperOuterContainer sx={{marginTop: 0}}>
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
    </Fragment>
  )
}

export default AllJob
