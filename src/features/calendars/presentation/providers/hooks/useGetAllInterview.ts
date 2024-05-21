import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/calendars/domain/graphql'
import {
  CandidateInterview,
  FilterCalendar,
} from 'features/calendars/domain/graphql/interfaces'
import { useMemo, useState } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
  CalendarEvent,
  RangeDate,
} from '../../page-sections/google-calendar/interface'
import { isArray } from 'lodash'
import randomColor from '../../page-sections/google-calendar/functions'

function useGetAllInterview() {
  const { getAllCandidateInterview4Calendar, queryKey } = useGraphql()
  const [dateRange, setDateRange] = useState<FilterCalendar>()
  const { isLoading, data } = useQuery({
    queryKey: [dateRange, queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(
        getAllCandidateInterview4Calendar.query,
        { filter: dateRange }
      ),
  })
  let interviewerList: CandidateInterview[] = []
  if (data && isRight(data)) {
    const response = unwrapEither(data)
    const sortData =
      response?.[getAllCandidateInterview4Calendar.operation]?.edges?.map(
        (item: any) => item?.node
      ) ?? []
    interviewerList = sortData
  }

  const myEvents: CalendarEvent[] = useMemo(() => {
    return interviewerList.map((o) => ({
      resource: {
        id: o.id,
        styles: {
          colorId: randomColor(),
        },
      },
      title: o.title,
      start: new Date(o.start_from),
      end: new Date(o.end_at),
    }))
  }, [interviewerList])

  function handlePagination(range: Date[] | RangeDate) {
    if (isArray(range)) {
      setDateRange({
        from_date: range[0].toISOString(),
        to_date: range[range.length - 1].toISOString(),
      })
    } else {
      setDateRange({
        from_date: range.start.toISOString(),
        to_date: range.end.toISOString(),
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
