import React, { useState } from 'react'
import styles from './chart.module.css'

type Label = {
  title: string
  color: string
}

export type FunnelStep = {
  title: string
  color: string
}

type FunnerChart = {
  labels: Label[]
  funnelStep: FunnelStep[]
  width: number
  height?: number
}

function FunnelChart(props: FunnerChart) {
  const { labels, funnelStep, width, height } = props
  const [isHover, setIsHover] = useState<number | null>(null)
  const [isHidden, setIsHidden] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  })

  const handleMouseEnter = (e: React.MouseEvent, step: FunnelStep) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      content: step.title,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      x: e.clientX,
      y: e.clientY,
    }))
  }

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: '' })
  }

  const handleMouseHover = (index: number) => {
    setIsHover(index)
  }

  function handleHidden(index: number) {
    setIsHidden((prev) => {
      if (index === prev) {
        return null
      }
      return index
    })
  }

  const newFunnelStep = funnelStep.filter((_, index) => index !== isHidden)
  const borderTopWidth = width <= 200 ? '30px' : '45px'
  return (
    <div className={styles.chart_funnel}>
      <div
        className={styles.funnel_outer}
        style={{
          margin: '0 auto',
          maxWidth: width,
          height: height,
        }}
      >
        <ul
          style={{
            width: '100%',
          }}
        >
          {newFunnelStep.map((step, index) => (
            <li
              className={styles.funnel_step}
              key={index}
              onMouseEnter={(e) => handleMouseEnter(e, step)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                opacity: isHover !== null && isHover !== index ? '0.2' : '1',
              }}
            >
              <span
                style={{
                  width: `calc(100% - ${38 * index}px)`,
                  borderTopColor: step.color,
                  // borderTopWidth: borderTopWidth,
                }}
              >
                <p>{step.title}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
      {tooltip.visible && (
        <div
          className={styles.tooltip}
          style={{
            left: 100,
            top: 100,
          }}
        >
          {tooltip.content}
        </div>
      )}
      <div className={styles.label_chart_container}>
        {labels.map((label, index) => (
          <button
            className={styles.label}
            key={index}
            onMouseOver={() => handleMouseHover(index)}
            onMouseLeave={() => setIsHover(null)}
            style={{
              opacity: isHidden === index ? 0.3 : 1,
            }}
          >
            <div
              className={styles.color_label}
              style={{ backgroundColor: label.color }}
            ></div>
            <p className={styles.label_p}>{label.title}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FunnelChart
