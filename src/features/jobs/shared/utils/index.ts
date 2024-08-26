import { JobDescriptionData } from "features/jobs/domain/interfaces";

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
