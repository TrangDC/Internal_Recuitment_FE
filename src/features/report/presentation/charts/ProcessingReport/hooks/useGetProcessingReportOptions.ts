import { SxProps } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import { getPercentage, styleToString } from 'shared/utils/convert-string'
import { bStyle } from '../../RecruitmentTrends/style'
import { renderTooltipProcessing } from '../../CandidateReport/styles'
import { calculateColumnTotal } from 'shared/utils/chart'
import _ from 'lodash'

const spanStyle: SxProps = {
  fontSize: '12px',
  fontWeight: 500,
}

function makeStylePercentagesLabel(color: string): string {
  return styleToString({
    color: color,
  })
}

type useGetProcessingReportOptionsProps = {
  categories: string[]
}

function useGetProcessingReportOptions(props: useGetProcessingReportOptionsProps) {
  const { categories } = props;

  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        type: 'bar',
        height: 380,
        toolbar: {
          show: false,
        },
        fontFamily: 'Montserrat',
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          horizontal: false,
          borderRadius: 2,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      colors: ['#1F84EB', '#BABFC5'],
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: ['#0B0E1E'],
            fontFamily: 'Montserrat',
          },
        },
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: categories,
      },
      legend: {
        fontSize: '12',
        position: 'bottom',
        horizontalAlign: 'center',
        fontWeight: 500,
        offsetX: 10,
        offsetY: 5,
        inverseOrder: false,
        itemMargin: {
          horizontal: 10,
        },
        formatter(legendName, opts) {
          const seriesIndex = opts.seriesIndex
          const total = opts.w.globals.series[seriesIndex].reduce(
            (w: number, cu: number) => {
              return w + cu
            },
            0
          )
          return `<span style="${styleToString(spanStyle)}">${legendName}</span><b style="${styleToString(bStyle)}">${total}</b>`
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        theme: 'light',
        x: {
          show: false,
        },
        // y: {
        //   title: {
        //     formatter() {
        //       return ''
        //     },
        //   },
        //   formatter(val, opts) {
        //     const labels = opts.w.globals.labels
        //     const colors = opts.w.globals.colors
        //     const dataPointIndex = opts.dataPointIndex
        //     const color = colors[dataPointIndex]
        //     const total = opts.series[0].reduce((acc: number, n: number) => {
        //       return acc + n
        //     }, 0)
        //     const percentages = opts.series[0].map((value: number) => {
        //       return getPercentage(value, total)
        //     })
        //     return `<span style="${makeStylePercentagesLabel(color)}">${percentages[dataPointIndex]}%</span><span style="${styleToString(spanStyle)}"> ${labels[dataPointIndex]}</span> <b>${val}</b>`
        //   },
        // },
        custom(options) {
          const dataPointIndex = options.dataPointIndex
          const colors = options.w.globals.colors
          const seriesNames = options.w.globals.seriesNames
          const series = options.series
          const total = calculateColumnTotal(series, dataPointIndex)
          const lable = options.w.config.xaxis.categories[dataPointIndex];

          const rows = series.map((item: number[], index: number) => {
            return {
              title: seriesNames[index],
              count: item[dataPointIndex],
              percentage: `${getPercentage(item[dataPointIndex], total)}%`,
              color: colors[index],
            }
          })

          return renderTooltipProcessing({
            rows: rows,
            lable: lable,
          })
        },
      },
    }

  }, [categories])
  return {
    options,
  }
}
export default useGetProcessingReportOptions
