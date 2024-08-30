import { Timeline, timelineItemClasses } from '@mui/lab'
import { Box } from '@mui/material'
import { Text15md } from 'shared/components/Typography'
import ApproverItem, { ApproveStatus } from '../components/ApproverItem'
import Scrollbar from 'shared/components/ScrollBar'
import HiringJobStep from 'shared/schema/database/hiring_job_step'
import { useMemo } from 'react'

type ApprovalProcessProps = {
  steps: HiringJobStep[]
}

function ApprovalProcess({ steps }: ApprovalProcessProps) {
  const approvalSteps = useMemo(() => {
    return steps.map((step) => ({
      nameApprover: step.approver.name,
      emailApprover: step.approver.work_email,
      status: step.status,
    }))
  }, [steps])
  return (
    <Box paddingBottom={2}>
      <Box width={280} padding={'16px 24px 24px 24px'}>
        <Text15md color={'primary.800'}>Approval process</Text15md>
      </Box>
      <Box height={300}>
        <Scrollbar>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {approvalSteps.map((item, index) => (
              <ApproverItem
                emailApprover={item.emailApprover}
                index={index + 1}
                nameApprover={item.nameApprover}
                status={item.status as ApproveStatus}
                lastItem={approvalSteps.length - 1 === index}
              />
            ))}
          </Timeline>
        </Scrollbar>
      </Box>
    </Box>
  )
}

export default ApprovalProcess
