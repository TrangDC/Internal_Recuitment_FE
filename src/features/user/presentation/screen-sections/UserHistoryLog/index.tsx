import { useState } from 'react'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import HistoryLogAuditTrails from 'features/auditTrails/presentation/page-sections/HistoryLog'

interface HistoryLogSectionsDetailProps {
  userId: string
}

function HistoryLogSectionsDetail({ userId }: HistoryLogSectionsDetailProps) {
  const [open, setOpen] = useState(false)

  return (
    <AppCollapse open={open} setOpen={setOpen} title="Update History">
      <HistoryLogAuditTrails module="users" id={userId} />
    </AppCollapse>
  )
}

export default HistoryLogSectionsDetail