import { ReactNode, createContext, useContext, useMemo } from 'react'

interface InitialState {
  setOpenCreateInterView: (open: boolean) => void
  handleDeleteEvent: (id: string) => void
}

interface CalendarProviderProps {
  setOpenCreateInterView: (open: boolean) => void
  handleDeleteEvent: (id: string) => void
  children: ReactNode
}

const CalendarContext = createContext<InitialState>({
  setOpenCreateInterView(open) {
    console.log(open)
  },
  handleDeleteEvent(id) {
    console.log(id)
  },
})

function CalendarProvider(props: CalendarProviderProps) {
  const { setOpenCreateInterView, children, handleDeleteEvent } = props
  const value = useMemo(
    () => ({
      setOpenCreateInterView,
      handleDeleteEvent,
    }),
    [setOpenCreateInterView, handleDeleteEvent]
  )
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useContextCalendar = () => useContext(CalendarContext)

export default CalendarProvider
