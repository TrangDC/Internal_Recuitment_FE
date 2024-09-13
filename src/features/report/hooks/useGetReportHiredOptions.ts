import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import { getPercentage, styleToString } from 'shared/utils/convert-string'
import { calculateColumnTotal } from 'shared/utils/chart'
import _ from 'lodash'
import { bStyle, spanStyle } from '../presentation/charts/RecruitmentApplication/style'
import { renderTooltip, renderTooltipHired } from '../presentation/charts/CandidateReport/styles'

interface UseGetReportHiredOptionsProps {
  categories: string[]
}

function useGetReportHiredOptions(
  props: UseGetReportHiredOptionsProps
) {
  const { categories } = props
  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        type: 'bar',
        stacked: true,
        fontFamily: 'Montserrat',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          borderRadiusWhenStacked: 'last', // 'all', 'last'
          dataLabels: {
            total: {
              enabled: false,
            },
          },
          columnWidth: 16,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: categories,
        labels: {
          rotate: 0,  
          formatter: function (val) {
            if (val.length > 10) { 
              return val.substring(0, 5) + '...';
            }

            return val;
          },
          style: {
            fontSize: '12px',
            fontFamily: 'Montserrat',
          },
        },  
      },
      legend: {
        fontSize: '12',
        position: 'bottom',
        horizontalAlign: 'left',
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
      fill: {
        opacity: 1,
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: [
        '#FFAF46',
        '#5CBAFE',
        '#2CC5BD',
        '#A798FF',
        '#1F84EB',
        '#FF5084',
        '#82868C',
      ],
      tooltip: {
        fillSeriesColor: false,
        theme: 'light',
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
          const totalRows = {
            title: 'Total',
            count: total,
            percentage: ``,
            color: '#0B0E1E',
            lable: lable,
          }
          const reverseRow = _.reverse(rows)
          return renderTooltipHired({
            rows: [...reverseRow, totalRows],
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

export default useGetReportHiredOptions
