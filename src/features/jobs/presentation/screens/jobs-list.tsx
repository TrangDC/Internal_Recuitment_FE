import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useJobTable from '../providers/hooks/useJobTable'
import CreateJobModal from '../page-sections/CreateJobModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditJobModal from '../page-sections/EditJobModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import { DivFilter, DivHeaderWrapper } from '../providers/styles'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteJobModal from '../page-sections/DeleteJobModal'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { KeyboardEventHandler, useState } from 'react'
import { BaseRecord, baseInstance } from 'shared/interfaces'
import { getValueOfObj, transformListItem } from 'shared/utils/utils'
import useTextTranslation from 'shared/constants/text'
import Jobs from 'shared/components/icons/Jobs'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonFieldFilter from 'shared/components/input-fields/ButtonFieldFilter'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import StatusJobAutoComplete from 'shared/components/autocomplete/status-job-autocomplete'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import { isEmpty } from 'lodash'
import CloseIcon from 'shared/components/icons/CloseIcon'
import CloseJobModal from '../page-sections/CloseJobModal'
import { STATUS_STATE } from 'shared/constants/constants'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'

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
    rowData,
    setOpenEdit,
  } = useActionTable()

  const navigate = useNavigate()

  const { useTableReturn } = useJobTable()
  const { handleFreeWord, handleFilter } = useTableReturn
  const translation = useTextTranslation()

  const [teams, setTeams] = useState<BaseRecord[]>([])
  const [status, setStatus] = useState<BaseRecord>()
  const [priority, setPriority] = useState<BaseRecord>()
  const [searchField, setSearchField] = useState('')

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
        onClick: (id, rowData) => {
          handleOpenStatus(id, rowData)
        },
        title: (rowData) => {
          return rowData.status === STATUS_STATE.OPENED
            ? 'Close job'
            : 'Reopen Job'
        },
        disabled: (rowData) => {
          return !(
            rowData?.is_able_to_close && rowData.status === STATUS_STATE.OPENED
          )
        },
        Icon: <CloseIcon />,
      },
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
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

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Jobs} textLable={translation.MODLUE_JOBS.jobs} />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <DivFilter>
            <ButtonFieldFilter<baseInstance>
              inputLabel={'Team'}
              listSelected={teams}
              setListSelected={setTeams}
              showLabel={'name'}
              onChange={(data) => {
                //@ts-ignore
                const ids = transformListItem(data, 'id')
                handleFilter('team_ids', !isEmpty(ids) ? ids : null)
              }}
              node={
                <TeamsAutoComplete
                  name="team"
                  multiple={true}
                  value={transformListItem(teams, 'id')}
                  onCustomChange={(data) => {
                    setTeams(data)
                  }}
                  onChange={(value) => {
                    handleFilter('team_ids', !isEmpty(value) ? value : null)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              }
            />
            <ButtonFieldFilter<baseInstance>
              inputLabel={'Status'}
              listSelected={status as BaseRecord}
              setListSelected={setStatus}
              onChange={(data) => {
                //@ts-ignore
                const status = transformListItem(data, 'id')
                handleFilter('status', !isEmpty(status) ? status : null)
              }}
              node={
                <StatusJobAutoComplete
                  multiple={false}
                  value={status && getValueOfObj({ key: 'value', obj: status })}
                  onChange={(data) => {
                    handleFilter(
                      'status',
                      getValueOfObj({ key: 'value', obj: data as IOption })
                    )
                    setStatus(data as IOption)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              }
            />
            {/* pirority */}
            <ButtonFieldFilter<baseInstance>
              inputLabel={'Priority'}
              listSelected={priority as BaseRecord}
              setListSelected={setPriority}
              onChange={(data) => {
                //@ts-ignore
                const priority = transformListItem(data, 'id')
                handleFilter('priority', !isEmpty(priority) ? priority : null)
              }}
              node={
                <PriorityAutoComplete
                  multiple={false}
                  value={
                    priority && getValueOfObj({ key: 'value', obj: priority })
                  }
                  onChange={(data) => {
                    const priority = getValueOfObj({
                      key: 'value',
                      obj: data as IOption,
                    })
                    handleFilter('priority', Number(priority))
                    setPriority(data as IOption)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Priority',
                    autoFocus: true,
                  }}
                />
              }
            />
          </DivFilter>

          <DivHeaderWrapper>
            <CustomTextField
              id="outlined-basic"
              label={'Search by Job title'}
              variant="outlined"
              size="small"
              sx={{ width: '400px', fontSize: '13px' }}
              onKeyUp={handleFreeWorld}
              onChange={(e) => setSearchField(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon
                        sx={{ fontSize: '16px' }}
                        onClick={() => {
                          handleFreeWord('name', searchField)
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          rowData={rowData.current}
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
          rowData={rowData.current}
        />
      )}
    </Box>
  )
}

export default JobsList
