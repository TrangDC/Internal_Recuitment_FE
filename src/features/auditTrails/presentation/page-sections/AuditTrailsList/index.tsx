import { Box, Grid } from '@mui/material'
import AuditTrailsCreate from '../AuditTraiilsCreate'
import AuditTrailsDelete from '../AuditTrailsDelete'
import AuditTrailsUpdate from '../AuditTrailsUpdate'
import { isEmpty } from 'lodash'

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
  module: string,
}

interface Props {
  record_changes: Record[];
}

const AuditTrailsList = ({ record_changes }: Props) => {

  return (
    <Box>
      {!isEmpty(record_changes) &&
        record_changes.map((record: Record, idx) => {
          return (
            <Grid container key={idx}>
              {!isEmpty(record?.create) && (
                <Grid item xs={12} md={6}>
                  <AuditTrailsCreate  module={record.module} data={record?.create} type='Create'/>
                </Grid>
              )}

              {!isEmpty(record?.update) && (
                <Grid item xs={12} md={6}>
                  <AuditTrailsUpdate module={record.module} data={record?.update} type='Update'/>
                </Grid>
              )}

              {!isEmpty(record?.delete) && (
                <Grid item xs={12} md={6}>
                  <AuditTrailsDelete module={record.module} data={record?.delete} type='Delete'/>
                </Grid>
              )}
            </Grid>
          )
        })}
    </Box>
  )
}

export default AuditTrailsList
