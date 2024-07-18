import { SxProps } from '@mui/material'
import _ from 'lodash'

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getLastString = (string: string, character: string = '.') => {
  const parts = string.split(character)

  return _.last(parts) || ''
}

export const convertStringToArray = (
  string: string,
  character: string = '.'
) => {
  return string.split(character)
}

export const styleToString = (style: SxProps): string => {
  return style
    ? Object.entries(style)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          return `${cssKey}: ${value}`
        })
        .join('; ')
    : ''
}

export const getPercentage = (value: number, total: number) => {
  const percentage = (value / total) * 100
  const roundedPercentage = parseFloat(percentage.toFixed(2))
  return isNaN(roundedPercentage) ? 0 : roundedPercentage
}
