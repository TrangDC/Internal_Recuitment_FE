import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import _ from 'lodash'

interface UseCandidateConversationReportOptionsProps {
    //   categories: string[]
}

function useCandidateConversationReportOptions(
    // props: UseCandidateConversationReportOptionsProps
) {
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
                    barHeight: '100%',   
                    distributed: true,
                    horizontal: true,
                    borderRadius: 2,
                    dataLabels: {
                        position: 'top',
                    },
                    // borderRadiusWhenStacked: 'last',
                    // columnWidth: 16,
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return `${val}%`
                },
                offsetX: -30,
                textAnchor: 'start'
            },
            xaxis: {
                type: 'category',
                categories: ['Applied', 'Interviewing', 'Offering', 'Hỉed'],
                stepSize: 20,
                min: 0,
                max: 100,
            },
            yaxis: {
                labels: {
                    show: false
                }
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
                '#FF5084',
                '#2499EF',
                '#7874FE',
            ],
              tooltip: {
                fillSeriesColor: false,
                theme: 'light',
                enabled: false,
              },
        }
    }, [])
    return {
        options,
    }
}

export default useCandidateConversationReportOptions
