import { Box } from '@mui/system'
import { columns } from '../../providers/constants/columns'
import useCandidateTable from '../../providers/hooks/useCandidateTable'
import useActionTable from '../../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { useMemo, useState } from 'react'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import RemoveBlackListIcon from 'shared/components/icons/RemoveBlackListIcon'
import FlexBox from 'shared/components/flexbox/FlexBox'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import {
  BlackListCandidateModal,
  CreateCandidateModal,
  DeleteCandidateModal,
  EditCandidateModal,
} from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useFilterCandidates from '../../providers/hooks/useFilterCandidates'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import SearchInput from 'shared/components/table/components/SearchInput'
import CandidateSourceAutoComplete from 'shared/components/autocomplete/candidate-source-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import ControllerDateRange from 'shared/components/table/components/tooltip-filter/ControllerDateRange'
import AppDateRangePicker from 'shared/components/input-fields/AppDateRangePicker'
import SkillTypeAutoComplete from 'shared/components/autocomplete/skill-type-autocomplete'
import dayjs from 'dayjs'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'

const BlackList = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    rowId,
    setOpenEdit,
    openBlackList,
    handleOpenBlackList,
    setOpenBlackList,
  } = useActionTable<Candidate>()
  const is_black_list = true
  const navigate = useNavigate()
  const { useFilterReturn, useSearchListReturn } = useFilterCandidates({
    is_black_list,
  })
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { handleSearch, search, searchRef } = useSearchListReturn
  const showFailedReason = useMemo(() => {
    return (
      dataFilterWithValue.status === STATUS_CANDIDATE.KIV ||
      dataFilterWithValue.status === STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [dataFilterWithValue])

  const { useTableReturn } = useCandidateTable({
    filters: {
      is_black_list,
      ...dataFilterWithValue,
    },
    search,
  })
  const translation = useTextTranslation()

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/candidate-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'edit',
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'edit',
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: 'Remove from blacklist',
        Icon: <RemoveBlackListIcon />,
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
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox width={'100%'}>
            <ControllerFilter
              control={controlFilter}
              keyName="status"
              title="Status"
              Node={({ onFilter, value }) => (
                <CandidateStatusAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => {
                    onFilter(data)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              )}
            />
            {showFailedReason && (
              <ControllerFilter
                control={controlFilter}
                keyName="failed_reason"
                title="Failed reason"
                Node={({ onFilter, value }) => (
                  <FailedReasonAutoComplete
                    multiple={true}
                    value={value}
                    onChange={(data) => {
                      onFilter(data)
                    }}
                    open={true}
                    disableCloseOnSelect={true}
                    textFieldProps={{
                      label: 'Failed reason',
                      autoFocus: true,
                    }}
                  />
                )}
              />
            )}

            <ControllerFilter
              control={controlFilter}
              keyName="reference_uid"
              title="By recruiter"
              Node={({ onFilter, value }) => (
                <InterViewerAutoComplete
                  multiple={true}
                  value={value}
                  name="reference_uid"
                  onCustomChange={(data) => {
                    onFilter(
                      data.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    )
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'By recruiter',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerDateRange
              control={controlFilter}
              keyNameFrom="recruit_time_from_date"
              keyNameTo="recruit_time_to_date"
              title="Recruit time"
              Node={({ onFilterFrom, onFilterTo, fromValue, toValue }) => (
                <AppDateRangePicker
                  setFromDate={(date) =>
                    onFilterFrom({
                      label: date?.format('DD/MM/YYYY') ?? '',
                      value: date?.toISOString() ?? '',
                    })
                  }
                  setToDate={(date) =>
                    onFilterTo({
                      label: date?.format('DD/MM/YYYY') ?? '',
                      value: date?.toISOString() ?? '',
                    })
                  }
                  fromDate={fromValue ? dayjs(fromValue) : null}
                  toDate={toValue ? dayjs(toValue) : null}
                />
              )}
            />

            <ControllerFilter
              control={controlFilter}
              title="Skill type"
              keyName={'skill_type_ids'}
              Node={({ onFilter, value }) => (
                <SkillTypeAutoComplete
                  name="skill_type"
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
                    label: 'Skill type',
                    autoFocus: true,
                  }}
                />
              )}
            />

            <ControllerFilter
              control={controlFilter}
              title="Skill"
              keyName={'skill_ids'}
              Node={({ onFilter, value }) => (
                <SkillAutoComplete
                  name="skill"
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
                    label: 'Skill',
                    autoFocus: true,
                  }}
                />
              )}
            />

            <ControllerFilter
              control={controlFilter}
              title="Candidate source"
              keyName={'reference_type'}
              Node={({ onFilter, value }) => (
                <CandidateSourceAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => {
                    onFilter(data)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Candidate source',
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
              placeholder="Search by name, email, phone"
              onSearch={handleSearch}
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
        <CreateCandidateModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDelete && (
        <DeleteCandidateModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
      {openBlackList && (
        <BlackListCandidateModal
          open={openBlackList}
          setOpen={setOpenBlackList}
          id={rowId.current}
        />
      )}
    </DivContainerWrapper>
  )
}

export default BlackList
