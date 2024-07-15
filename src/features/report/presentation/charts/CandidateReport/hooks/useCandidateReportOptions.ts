import { useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import _ from 'lodash'
import { renderTooltip } from '../styles'
import { getPercentage } from 'shared/utils/convert-string'

function useCandidateReportOptions(labels: string[]): ApexOptions {
  const theme = useTheme()
  return {
    chart: { background: 'transparent', fontFamily: 'Montserrat' },
    colors: ['#2CC5BD', '#A798FF', '#FFAF46', '#FF5084', '#5CBAFE'],
    dataLabels: { enabled: false },
    labels,
    legend: {
      show: false,
      position: 'bottom',
      fontSize: '12px',
      fontWeight: 500,
      markers: {
        // width: 0,
        strokeWidth: 0,
      },
      formatter(legendName, opts) {
        const seriesIndex = opts.seriesIndex
        const total = opts.w.globals.series.reduce(
          (acc: number, value: number) => acc + value,
          0
        )
        const percentages = opts.w.globals.series.map((value: number) => {
          const percentage = (value / total) * 100
          return percentage % 1 >= 0.5
            ? _.ceil(percentage)
            : _.floor(percentage)
        })
        return `${legendName}: <b>${opts.w.globals.series[opts.seriesIndex]} (${percentages[seriesIndex]}%)</b>`
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '80',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '12px',
              fontWeight: 500,
              color: '#4D607A',
            },
            value: {
              fontSize: '24px',
              fontWeight: 600,
              color: '#0B0E1E',
              offsetY: 3,
            },
          },
        },
      },
    },
    states: {
      active: { filter: { type: 'none' } },
      hover: { filter: { type: 'none' } },
    },
    stroke: { width: 2 },
    theme: { mode: theme.palette.mode },
    tooltip: {
      fillSeriesColor: false,
      theme: 'light',
      custom(options) {
        const colors = options.w.globals.colors
        const labels = options.w.globals.labels
        const series = options.series
        const total = series.reduce((acc: number, series: number) => {
          return acc + series
        }, 0)
        const rows = series.map((item: number, index: number) => {
          return {
            title: labels[index],
            count: item,
            percentage: `${getPercentage(item, total)}%`,
            color: colors[index],
          }
        })
        return renderTooltip({
          rows: [...rows],
        })
      },
    },
  }
}

export default useCandidateReportOptions
