import { IconButton, InputAdornment } from '@mui/material'
import {
  DivFilter,
  DivHeaderWrapper,
} from 'features/candidates/presentation/providers/styles'
import { Fragment, KeyboardEventHandler, useState } from 'react'
import JobFilter from 'shared/components/button-filter/job-filter'
import PriorityFilter from 'shared/components/button-filter/priority-filter'
import SkillFilter from 'shared/components/button-filter/skill-filter'
import TeamFilter from 'shared/components/button-filter/team-filter'
import { CustomTextField } from 'shared/components/form/styles'
import SearchIcon from 'shared/components/icons/SearchIcon'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import { isEmpty } from 'lodash'
import useTextTranslation from 'shared/constants/text'
import { Add } from '@mui/icons-material'
import useActionTable from '../../../providers/hooks/useActionTable'
import CreateJobModal from '../../CreateJobModal'
import { BtnPrimary } from 'shared/styles'
import { Span } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ApplyJobModal from '../../ApplyJobCandidate'

const FilterCandidate = () => {
  const translation = useTextTranslation()
  const [searchField, setSearchField] = useState('')
  const { openCreate, setOpenCreate, openCreateApply, setOpenCreateApply } =
    useActionTable()
  const { handleFilter, handleFreeWord, handleAddCandidate } = useContextChangeStatus()

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      handleFreeWord({
        job_title: searchField,
      })
    }
  }

  return (
    <Fragment>
      <DivFilter>
        <JobFilter
          onChange={({ ids }) => {
            handleFilter({
              hiring_job_id: !isEmpty(ids) ? ids : null,
            })
          }}
        />

        <TeamFilter
          onChange={({ ids }) => {
            handleFilter({ team_id: !isEmpty(ids) ? ids : null })
          }}
        />

        <PriorityFilter
          onChange={({ id }) => {
            handleFilter({ priority: id ? Number(id) : null })
          }}
        />

        <SkillFilter
          onChange={({ ids }) => {
            handleFilter({ skill_id: !isEmpty(ids) ? ids : null })
          }}
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
                      handleFreeWord({
                        job_title: searchField,
                      })
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FlexBox gap={1} alignItems={'center'}>
          <BtnPrimary onClick={() => setOpenCreateApply(true)}>
            <Span>Apply candidate to a job</Span>
          </BtnPrimary>
          <ButtonAdd
            Icon={Add}
            textLable={translation.MODLUE_JOBS.add_a_new_job}
            onClick={() => setOpenCreate(true)}
          />
        </FlexBox>
      </DivHeaderWrapper>

      {openCreate && (
        <CreateJobModal open={openCreate} setOpen={setOpenCreate} />
      )}

      {openCreateApply && (
        <ApplyJobModal open={openCreateApply} setOpen={setOpenCreateApply} onSuccess={handleAddCandidate}/>
      )}
    </Fragment>
  )
}

export default FilterCandidate
