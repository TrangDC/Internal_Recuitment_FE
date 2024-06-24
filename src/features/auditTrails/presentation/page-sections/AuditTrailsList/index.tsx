import { Box, Grid } from '@mui/material'
import AuditTrailsCreate from '../AuditTraiilsCreate'
import AuditTrailsDelete from '../AuditTrailsDelete'
import AuditTrailsUpdate from '../AuditTrailsUpdate'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'

type Record = {
  create: {
    field: string
    value: string
  }[]
  delete: {
    field: string
    value: string
  }[]
  update: {
    field: string
    value: {
      oldValue: string
      newValue: string
    }
  }[]
  sub_module: Record[] | null
  module: string
}

interface Props {
  record_changes: Record[] | Record
}

const AuditTrailsList = ({ record_changes }: Props) => {
  const auditTrailsData: Record[] = useMemo(() => {
    return Array.isArray(record_changes) ? record_changes : [record_changes]
  }, [record_changes])

  return (
    <Box>
      {!isEmpty(auditTrailsData) &&
        auditTrailsData?.map((record: Record, idx) => {
          return (
            <Grid container key={idx}>
              {!isEmpty(record?.create) && (
                <Grid item xs={12} md={6}>
                  <AuditTrailsCreate
                    module={record.module}
                    data={record?.create}
                    type="Create"
                  />
                </Grid>
              )}

              {!isEmpty(record?.update) && (
                <Grid item xs={12} md={6}>
                  <AuditTrailsUpdate
                    module={record.module}
                    data={record?.update}
                    type="Update"
                  />
                </Grid>
              )}

              {!isEmpty(record?.delete) && (
                <Grid item xs={12} md={6}>
                  <AuditTrailsDelete
                    module={record.module}
                    data={record?.delete}
                    type="Delete"
                  />
                </Grid>
              )}

              {!isEmpty(record?.sub_module) && record?.sub_module && (
                <Grid item xs={12}>
                  <AuditTrailsList record_changes={record?.sub_module} />
                </Grid>
              )}
            </Grid>
          )
        })}
    </Box>
  )
}

export default AuditTrailsList
