import { SxProps } from '@mui/material'
import { styleToString } from 'shared/utils/convert-string'

export const tooltipStyled: SxProps = {
  backgroundColor: 'white',
  borderRadius: '6px',
  padding: '8px 12px 8px 8px',
  width: '196px',
  position: 'relative',
  boxShadow: '0px 0px 20px 0px #28293D33',
}

export const ulStyled: SxProps = {
  listStyle: 'none',
}

export const dotStyled = (color: string): SxProps => ({
  backgroundColor: color,
  width: '4px',
  height: '4px',
  borderRadius: '50%',
})

export const containerTextStyled: SxProps = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  height: '20px',
}

export const nameStyled: SxProps = {
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14.63px',
}

export const countStyled: SxProps = {
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '21px',
}

export const percentageStyled = (color: string): SxProps => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '14.63px',
  color: color,
})

const arrowStyle: SxProps = {
  position: 'fixed',
  bottom: '-3px', // Adjust based on tooltip position
  left: '50%',
  transform: 'translateX(-50%)',
  width: 200,
  height: 200,
  zIndex: 'auto',
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '6px solid red', // Same as the tooltip background color
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Match the tooltip boxShadow for consistency
}

type Rows = {
  percentage: string
  title: string
  count: number
  color: string
}

type RenderTooltipParams = {
  rows: Rows[]
}

export function renderTooltip(prams: RenderTooltipParams) {
  const { rows } = prams
  const listItems = rows
    .map(
      (item) => `
        <li>
          <div style="${styleToString(containerTextStyled)}">
            <div style="${styleToString(dotStyled(item.color))}"></div>
            ${item.percentage && `<div style="${styleToString(percentageStyled(item.color))}">${item.percentage}</div>`}
            <div style="${styleToString(nameStyled)}">${item.title}</div>
            <div style="${styleToString(countStyled)}">${item.count}</div>
          </div>
        </li>
      `
    )
    .join('')
  return `
    <div style="${styleToString(tooltipStyled)}">
        <ul style="${styleToString(ulStyled)}"> 
           ${listItems}
        </ul>
    </div>
    <div style="${styleToString(arrowStyle)}"></div>
    `
}
