import { View } from 'react-big-calendar'
import { Event } from 'react-big-calendar'

export interface IButtonToolBarList {
  view: View
  title: string
}

export type EventColor = {
  id: number
  backgroundColor: string
  color: string
}

export type EventStyles = {
  colorId: number
}

interface CustomResource {
  id: string
  styles?: EventStyles
}
export type RangeDate = {
  start: Date
  end: Date
}

export interface CalendarEvent extends Event {
  allDay?: boolean
  resource?: CustomResource
  title?: React.ReactNode | undefined
  start?: Date | undefined
  end?: Date | undefined
}
