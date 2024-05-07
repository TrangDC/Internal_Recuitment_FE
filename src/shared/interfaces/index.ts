import { SortDirection } from "@mui/material"

export type BaseRecord = {
  [key: string]: any
}

export interface IconSortProps {
  type: false | SortDirection
} 

export interface baseInstance {
  value: string,
  name: string,
}

export interface ResponRefreshToken {
  accessToken: string,
  email: string,
  expiresAt: string,
  refreshToken: string,
  tokenType: string,
}
