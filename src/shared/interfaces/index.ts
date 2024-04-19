import { SortDirection } from "@mui/material"

export type BaseRecord = {
  [key: string]: any
}

export interface IconSortProps {
  type: false | SortDirection
} 

export interface baseInstance {
  id: number,
  name: string,
}
