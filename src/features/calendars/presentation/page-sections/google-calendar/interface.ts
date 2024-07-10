import { View } from 'react-big-calendar'
import { Event } from 'react-big-calendar'
import User from 'shared/schema/database/user'

export interface IButtonToolBarList {
  view: View
  title: string
}

export type EventColor = {
  id: number
  backgroundColor: string
  color: string
  borderColor: string
}

export type EventStyles = {
  colorId: number
}

interface CustomResource {
  id: string
  styles?: EventStyles
  teamId:string
  interviewer:User[]
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
