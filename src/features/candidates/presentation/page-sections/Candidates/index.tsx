import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../../shared/constants/columns'
import useCandidateTable from '../../../hooks/table/useCandidateTable'
import useActionTable from '../../../hooks/table/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../../shared/styles'
import { useMemo } from 'react'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import CandidateStatusAutoComplete, {
  application_data,
  options_status_new,
} from 'shared/components/autocomplete/candidate-status-auto-complete'
import { BlackListCandidateModal, DeleteCandidateModal } from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import useFilterCandidates from '../../../hooks/table/useFilterCandidates'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import SearchInput from 'shared/components/table/components/SearchInput'
import ControllerDateRange from 'shared/components/table/components/tooltip-filter/ControllerDateRange'
import dayjs from 'dayjs'
import AppDateRangePicker from 'shared/components/input-fields/AppDateRangePicker'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import SkillTypeAutoComplete from 'shared/components/autocomplete/skill-type-autocomplete'
import CandidateSourceAutoComplete from 'shared/components/autocomplete/candidate-source-auto-complete'
import Cant from 'features/authorization/presentation/components/Cant'
import useBuildActionTableCandidate from '../../../hooks/table/useBuildActionTableCandidate'
import Candidate from 'shared/schema/database/candidate'
import AppMenuButton from 'shared/components/buttons/AppMenuButton'
import { useNavigate } from 'react-router-dom'
import AiIcon from 'shared/components/icons/Ai'
import ImportCVModal from '../ImportCVModal'

const Candidates = () => {
  const navigate = useNavigate()
  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    rowId,
    openBlackList,
    handleOpenBlackList,
    setOpenBlackList,
    setOpenImportCV,
    openImportCV,
  } = useActionTable<Candidate>()
  const is_black_list = false
  const { useFilterReturn, useSearchListReturn } = useFilterCandidates({
    is_black_list,
  })
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { handleSearch, search, searchRef } = useSearchListReturn
  const { useTableReturn } = useCandidateTable({
    filters: {
      is_black_list,
      ...dataFilterWithValue,
    },
    search,
  })
  const showFailedReason = useMemo(() => {
    return (
      dataFilterWithValue.status === application_data.failed_cv.value ||
      dataFilterWithValue.status === application_data.failed_interview.value ||
      dataFilterWithValue.status === application_data.offer_lost.value
    )
  }, [dataFilterWithValue])

  const { actions } = useBuildActionTableCandidate({
    handleOpenBlackList,
    handleOpenDelete,
  })
  const { columnTable } = useBuildColumnTable({
    actions: actions,
    columns,
  })

  function handleNavigate() {
    navigate('/dashboard/create-candidate')
  }

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox width={'100%'} gap={'16px'}>
            <ControllerFilter
              control={controlFilter}
              keyName="status"
              title="Status"
              Node={({ onFilter, value }) => (
                <CandidateStatusAutoComplete
                  multiple={false}
                  options={options_status_new}
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
            {/* add */}
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
                  setFromDate={(date) => {
                    onFilterFrom({
                      label: date?.format('DD/MM/YYYY') ?? '',
                      value: date?.toISOString() ?? '',
                    })
                  }}
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
            <FlexBox gap={'10px'}>
              <Cant
                module="CANDIDATES"
                checkBy={{
                  compare: 'hasAny',
                  permissions: ['CREATE.everything'],
                }}
              >
                <AppMenuButton
                  options={[
                    {
                      Icon: <Add />,
                      title: 'Create new',
                      onClick() {
                        handleNavigate()
                      },
                    },
                    {
                      Icon: (
                        <AiIcon sx={{ fontSize: '15px', color: 'grey.500' }} />
                      ),
                      title: 'Import CV by AI',
                      onClick() {
                        setOpenImportCV(true)
                      },
                    },
                  ]}
                  title="Add a new candidate"
                  buttonProps={{
                    startIcon: <Add />,
                  }}
                />
              </Cant>
            </FlexBox>
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={columnTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>
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
      {openImportCV && (
        <ImportCVModal
          open={openImportCV}
          openWarning={false}
          setOpen={setOpenImportCV}
          title="Import CV"
          onSuccess={(data) => {
            navigate('/dashboard/create-candidate', {
              state: data,
            })
          }}
        />
      )}
    </DivContainerWrapper>
  )
}

export default Candidates
