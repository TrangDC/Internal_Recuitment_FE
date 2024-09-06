import { JobDescriptionData } from 'features/jobs/domain/interfaces'
import { ACTION_JOB_BY_STATUS } from '../constants'
import _ from 'lodash'
import { HiringJobStatus } from 'shared/schema/database/hiring_job'

export function formatJobDescription(data: JobDescriptionData): string {
  return `
    <introduction-component>
      <p>${data.data.introduction}</p>
    </introduction-component>
    <response-component>
      <h3>Responsibilities</h3>
      <ul class="tight" data-tight="true">
        ${data.data.responsibilities.map((res) => `<li><p>${res}</p></li>`).join('')}
      </ul>
    </response-component>
    
    <require-component>
      <h3>Requirements</h3>
      <ul class="tight" data-tight="true">
        ${data.data.requirements.map((req) => `<li><p>${req}</p></li>`).join('')}
      </ul>
    </require-component>
    
    <benefit-component>
      <h3>Benefits</h3>
      <ul class="tight" data-tight="true">
        ${data.data.benefits.map((ben) => `<li><p>${ben}</p></li>`).join('')}
      </ul>
    </benefit-component>
  `
}

type ActionKey = typeof ACTION_JOB_BY_STATUS

export function checkDisabledActionJobButton(
  key: keyof ActionKey,
  status: HiringJobStatus
) {
  const statusList = _.get(ACTION_JOB_BY_STATUS, key)
  const hasStatus = _.filter(statusList, (d) => d === status).length > 0
  return !hasStatus
}
