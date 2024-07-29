import { UseActionInterviewReturn } from 'features/calendars/hooks/calendar/useActionInterview'
import { ReactNode, createContext, useContext, useMemo } from 'react'

interface InitialState {
  useActionInterviewReturn: UseActionInterviewReturn
}

interface CalendarProviderProps {
  useActionInterviewReturn: UseActionInterviewReturn
  children: ReactNode
}

const CalendarContext = createContext<InitialState>({
  useActionInterviewReturn: {} as UseActionInterviewReturn,
})

function CalendarProvider(props: CalendarProviderProps) {
  const { useActionInterviewReturn, children } = props
  const value = useMemo(
    () => ({
      useActionInterviewReturn,
    }),
    [useActionInterviewReturn]
  )
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useContextCalendar = () => useContext(CalendarContext)

export default CalendarProvider
