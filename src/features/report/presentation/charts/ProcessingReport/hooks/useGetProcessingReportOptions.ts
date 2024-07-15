import { SxProps } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import { getPercentage, styleToString } from 'shared/utils/convert-string'

const spanStyle: SxProps = {
  fontSize: '12px',
  fontWeight: 500,
}

function makeStylePercentagesLabel(color: string): string {
  return styleToString({
    color: color,
  })
}

function useGetProcessingReportOptions() {
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
          distributed: true,
          horizontal: true,
          borderRadius: 10,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      colors: ['#FFAF46', '#5CBAFE', '#2CC5BD', '#A798FF'],
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
        width: 12,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [
          'Invited to interview',
          'Interviewing',
          'Done',
          'Cancelled',
        ],
      },
      legend: {
        show: false,
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        theme: 'light',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter() {
              return ''
            },
          },
          formatter(val, opts) {
            const labels = opts.w.globals.labels
            const colors = opts.w.globals.colors
            const dataPointIndex = opts.dataPointIndex
            const color = colors[dataPointIndex]
            const total = opts.series[0].reduce((acc: number, n: number) => {
              return acc + n
            }, 0)
            const percentages = opts.series[0].map((value: number) => {
              return getPercentage(value, total)
            })
            return `<span style="${makeStylePercentagesLabel(color)}">${percentages[dataPointIndex]}%</span><span style="${styleToString(spanStyle)}"> ${labels[dataPointIndex]}</span> <b>${val}</b>`
          },
        },
      },
    }
  }, [])
  return {
    options,
  }
}
export default useGetProcessingReportOptions
