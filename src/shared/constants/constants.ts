import { Theme } from '@mui/material'

export const THEMES = { LIGHT: 'light', DARK: 'dark' }

export const lightTheme = (theme: Theme) => theme.palette.mode === 'light'

export const secondarySideBarWidth = 215
export const secondarySideBarGap = 80

export const SORT_BY = {
    DESC: 'DESC',
    ASC: 'ASC',
}

export const LOCATION_STATE = {
    HA_NOI: 'Ha noi',
    DA_NANG: 'Da Nang',
    HO_CHI_MINH: 'Ho Chi Minh',
    JAPAN: 'Japan'
}

interface baseInstanceState {
    [key: string]: string,
}

export const SALARY_DATA = {
    RANGE: 'Range',
    UP_TO: 'Up to',
    MINIMUM: 'Minimum',
    NEGOTITATION: 'Negotitation',
}

export const CURRENCY_DATA: baseInstanceState = {
    VND: 'VND',
    USD: 'USD',
    JPY: 'JPY',
}

export const LOCATION_DATA: baseInstanceState = {
    HA_NOI: 'Ha Noi',
    DA_NANG: 'Da Nang',
    HO_CHI_MINH: 'Ho Chi Minh',
    JAPAN: 'Japan',
}
