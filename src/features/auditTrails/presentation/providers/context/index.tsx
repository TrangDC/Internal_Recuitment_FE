import dayjs from 'dayjs'
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'
import { convertDateToISOString } from 'shared/utils/utils'
import useAuditTrails, { AuditTrailsJob } from '../hooks/useAuditTrails'
import { ModuleAuditTrails } from '../../page-sections/HistoryLog'

export type FilterAuditTrails = {
  fromDate: string
  toDate: string
}

export type FreeWordAuditTrails = {
  recordChange: string
}

interface InitialState {
  total_data: {
    total_current: number
    total: number
  }
  variable: {
    filter: FilterAuditTrails
    freeWord: FreeWordAuditTrails
  }
  data: AuditTrailsJob[]
  actions: {
    handleFreeWord: (item: Partial<FreeWordAuditTrails>) => void
    handleChangeFromDate: (date: Date | null) => void
    handleChangeToDate: (date: Date | null) => void
    fetchNextPage: () => void
  }
}

interface IAuditTrailProps {
  children: ReactNode
  id: string
  module: ModuleAuditTrails
}

const AuditTrailsContext = createContext<InitialState>({
  total_data: {
    total_current: 0,
    total: 0,
  },
  data: [],
  variable: {
    filter: {
      fromDate: convertDateToISOString(dayjs('2023-01-01').toDate()),
      toDate: convertDateToISOString(dayjs().endOf('date').toDate()),
    },
    freeWord: {
      recordChange: '',
    },
  },
  actions: {
    handleFreeWord: () => {},
    handleChangeFromDate: () => {},
    handleChangeToDate: () => {},
    fetchNextPage: () => {}
  },
})

function AuditTrailsProvider(props: IAuditTrailProps) {
  const { children, id, module } = props

  const [filter, setFilter] = useState<FilterAuditTrails>({
    fromDate: convertDateToISOString(dayjs('2023-01-01').toDate()),
    toDate: convertDateToISOString(dayjs().endOf('date').toDate()),
  })

  const [freeWord, setFreeWord] = useState<FreeWordAuditTrails>({
    recordChange: '',
  })

  //actions
  const handleFreeWord = (item: Partial<FreeWordAuditTrails>) => {
    setFreeWord((prev) => ({ ...prev, ...item }))
  }

  const handleChangeFromDate = (date: Date | null) => {
    const start_form = date ? date : dayjs('2023-01-01').toDate()
    if (!dayjs(start_form).isValid()) return
    setFilter((prev) => ({
      ...prev,
      fromDate: convertDateToISOString(start_form),
    }))
  }

  const handleChangeToDate = (date: Date | null) => {
    const to_date = date ? date : dayjs().endOf('date').toDate()
    if (!dayjs(to_date).isValid()) return
    setFilter((prev) => ({
      ...prev,
      toDate: convertDateToISOString(to_date),
    }))
  }

  const {
    auditTrails_history,
    totalRecord,
    fetchNextPage,
  } = useAuditTrails({
    module,
    recordId: id,
    variable: {
      filter,
      freeWord,
    },
  })

  return (
    <AuditTrailsContext.Provider
      value={{
        data: auditTrails_history,
        total_data: {
          total: totalRecord,
          total_current: auditTrails_history?.length,
        },
        variable: {
          filter: filter,
          freeWord: freeWord,
        },
        actions: {
          handleFreeWord,
          handleChangeFromDate,
          handleChangeToDate,
          fetchNextPage
        },
      }}
    >
      {children}
    </AuditTrailsContext.Provider>
  )
}

export const useContextAuditTrails = () => useContext(AuditTrailsContext)

export default AuditTrailsProvider
