import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/calendars/domain/graphql'
import {
  CandidateInterview,
  FilterCalendar,
} from 'features/calendars/domain/interfaces'
import { useMemo, useState } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
  CalendarEvent,
  RangeDate,
} from '../../page-sections/google-calendar/interface'
import { isArray } from 'lodash'
import randomColor, {
  convertToRootDate,
} from '../../page-sections/google-calendar/functions'
import dayjs from 'dayjs'
import { convertFromUTC, convertToUTC } from 'shared/utils/date'

function useGetAllInterview() {
  const { getAllCandidateInterview4Calendar, queryKey } = useGraphql()
  const startOfMonth = dayjs().startOf('month').startOf('week').toISOString()
  const endOfMonth = dayjs().endOf('month').endOf('week').toISOString()
  const [dateRange, setDateRange] = useState<FilterCalendar>({
    interview_date_from: startOfMonth,
    interview_date_to: endOfMonth,
  })
  const { isLoading, data } = useQuery({
    queryKey: [queryKey, JSON.stringify(dateRange)],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(
        getAllCandidateInterview4Calendar.query,
        { filter: dateRange }
      ),
  })

  const myEvents: CalendarEvent[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData: CandidateInterview[] =
        response?.[getAllCandidateInterview4Calendar.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      return sortData.map((o) => {
        const interview_date = convertFromUTC(
          new Date(o.interview_date)
        ).toDate()
        const from = convertFromUTC(new Date(o.start_from)).toDate()
        const to = convertFromUTC(new Date(o.end_at)).toDate()
        const { newEnd, newStart } = convertToRootDate(from, to, interview_date)
        return {
          resource: {
            id: o.id,
            styles: {
              colorId: randomColor(),
            },
          },
          title: o.title,
          start: newStart,
          end: newEnd,
        }
      })
    }
    return []
  }, [data])

  function handlePagination(range: Date[] | RangeDate) {
    if (isArray(range)) {
      if (range.length === 1) {
        let endOfDay = dayjs(range[range.length - 1]).endOf('day')
        setDateRange({
          interview_date_from: range[0].toISOString(),
          interview_date_to: endOfDay.toISOString(),
        })
      } else {
        let endOfDay = dayjs(range[range.length - 1]).endOf('day')
        setDateRange({
          interview_date_from: convertToUTC(range[0]).toISOString(),
          interview_date_to: endOfDay.toISOString(),
        })
      }
    } else {
      setDateRange({
        interview_date_from: range.start.toISOString(),
        interview_date_to: range.end.toISOString(),
      })
    }
  }

  return {
    myEvents,
    isLoading,
    handlePagination,
  }
}

export default useGetAllInterview
