import useGetKabanJob from 'features/jobs/hooks/crud/useGetKabanjob'
import useFilterJobs from 'features/jobs/hooks/table/useFilterJobs'
import { customInterface } from 'features/jobs/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { MutableRefObject, ReactNode, createContext, useContext } from 'react'
import { REC_IN_CHARGE_STATE } from 'shared/components/autocomplete/rec-in-charge-auto-complete/hooks/useRecInCharge'
import { ISearchData } from 'shared/components/table/hooks/useSearchList'
import { UseFilterReturn } from 'shared/components/table/interface'
import HiringJob from 'shared/schema/database/hiring_job'

interface InitialState {
  data: {
    pending_approvals: HiringJob[]
    opened: HiringJob[]
    closed: HiringJob[]
    cancelled: HiringJob[]
  }
  total_data: {
    total_current: number
    total: number
  }
  show_more: boolean
  actions: {
    fetchNextPage: () => void
    refetch: () => void
  }
  action_filter: {
    useFilterReturn: UseFilterReturn<typeof customInterface>
    useSearchListReturn: {
      search: ISearchData
      handleSearch: () => void
      searchRef: MutableRefObject<null>
    }
  }
}

interface KanbanProps {
  children: ReactNode
}

const KanbanJobContext = createContext<InitialState>({
  data: {
    pending_approvals: [],
    cancelled: [],
    closed: [],
    opened: [],
  },
  total_data: {
    total_current: 0,
    total: 0,
  },
  show_more: false,
  actions: {
    fetchNextPage: () => {},
    refetch: () => {},
  },
  action_filter: {
    //@ts-ignore
    useFilterReturn: {},
    //@ts-ignore
    useSearchListReturn: {},
  },
})

function KanbanJobProvider(props: KanbanProps) {
  const { children } = props

  const { useFilterReturn, useSearchListReturn } = useFilterJobs()
  const { dataFilterWithValue } = useFilterReturn
  const { search } = useSearchListReturn

  const recInChargeIds =
    Array.isArray(dataFilterWithValue.rec_in_charge_ids) &&
    !isEmpty(dataFilterWithValue.rec_in_charge_ids)
      ? dataFilterWithValue.rec_in_charge_ids.filter(
          (recInCharge) => recInCharge !== REC_IN_CHARGE_STATE.unassigned
        )
      : undefined

  const filter_job = {
    created_by_ids: dataFilterWithValue?.created_by_ids,
    hiring_team_ids: dataFilterWithValue?.hiring_team_ids,
    job_position_ids: dataFilterWithValue?.job_position_ids,
    location: dataFilterWithValue?.location,
    priorities: dataFilterWithValue?.priorities,
    rec_in_charge_ids: recInChargeIds,
    rec_team_ids: dataFilterWithValue?.rec_team_ids,
    skill_ids: dataFilterWithValue?.skill_ids,
    status: dataFilterWithValue?.status,
    unassigned: dataFilterWithValue?.unassigned,
  }

  const { data, total_data, show_more, actions } = useGetKabanJob({
    filter: filter_job,
    freeWord: search,
  })

  return (
    <KanbanJobContext.Provider
      value={{
        data,
        total_data,
        show_more,
        actions,
        action_filter: {
          useFilterReturn,
          useSearchListReturn,
        },
      }}
    >
      {children}
    </KanbanJobContext.Provider>
  )
}

export const useContextKanbanJob = () => useContext(KanbanJobContext)

export default KanbanJobProvider
