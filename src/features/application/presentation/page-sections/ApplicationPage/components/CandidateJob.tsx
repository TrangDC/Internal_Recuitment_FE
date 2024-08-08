import FlexBox from 'shared/components/flexbox/FlexBox'
import BoxCandidate from './BoxCandidate'
import Scrollbar from 'shared/components/ScrollBar'
import BoxTextSquare from 'shared/components/utils/boxText'
import { Box } from '@mui/material'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularLoading } from '../styles'
import { useEffect } from 'react'
import { removeEmptyInObject } from 'shared/utils/utils'

const CandidateJob = () => {
  const {
    data,
    show_more,
    total_data: { total_current },
    actions: { handleFetchNextPage },
  } = useContextChangeStatus()

  const { applied, interviewing, offering, hired, kiv, offer_lost, ex_staff } =
    data

  const { actions, action_filter } = useContextChangeStatus()
  const { handleFilter, handleFreeWord } = actions
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { search } = useSearchListReturn

  const handleSearchFreeWorld = (value: string) => {
    handleFreeWord({
      job_title: value,
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
    handleSearchFreeWorld(search?.hiring_job)
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
            <BoxCandidate
              title="APPLIED"
              number_candidates={applied?.length}
              status="applied"
              list_candidates={applied}
            />

            <BoxCandidate
              title="INTERVIEWING"
              number_candidates={interviewing?.length}
              status="interviewing"
              list_candidates={interviewing}
            />
            <BoxCandidate
              title="OFFERING"
              number_candidates={offering?.length}
              status="offering"
              list_candidates={offering}
            />
            <BoxCandidate
              title="HIRED"
              number_candidates={hired?.length}
              status="hired"
              list_candidates={hired}
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
            <BoxCandidate
              title="KIV"
              number_candidates={kiv?.length}
              status="kiv"
              list_candidates={kiv}
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
            <BoxCandidate
              title="OFFERED LOST"
              number_candidates={offer_lost?.length}
              status="offer_lost"
              list_candidates={offer_lost}
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
            <BoxCandidate
              title="EX-STAFF"
              number_candidates={ex_staff?.length}
              status="ex_staff"
              list_candidates={ex_staff}
            />
          </FlexBox>
        </Scrollbar>
      </InfiniteScroll>
    </Box>
  )
}

export default CandidateJob
