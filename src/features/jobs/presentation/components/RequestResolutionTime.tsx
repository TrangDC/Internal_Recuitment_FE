import { LinkText } from 'shared/components/Typography'
import {
  calculateTimeDifference,
  formatTimeDifference,
} from 'shared/utils/date'

type RequestResolutionTimeProps = {
  time: Date
}

function RequestResolutionTime({ time }: RequestResolutionTimeProps) {
  const timeDiff = calculateTimeDifference(time)
  return (
    <LinkText fontWeight={600} lineHeight={'15.85px'}>
      {formatTimeDifference({
        timeDiff,
        shows: ['years', 'months', 'days', 'hours'],
      })}
    </LinkText>
  )
}

export default RequestResolutionTime
