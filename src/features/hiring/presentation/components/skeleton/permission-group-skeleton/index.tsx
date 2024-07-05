import { Skeleton } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { useState } from 'react'

function PermissionGroupSkeleton() {
  const [open, setOpen] = useState(true)
  return (
    <CollapseGroup.CollapseContainer open={open} setOpen={setOpen} title={''}>
      <CollapseGroup.CollapseHeader
        sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}
      >
        <CollapseGroup.CollapseHeaderColumn>
          Name
        </CollapseGroup.CollapseHeaderColumn>
        <CollapseGroup.CollapseHeaderColumn align="left">
          Owned Only
        </CollapseGroup.CollapseHeaderColumn>
        <CollapseGroup.CollapseHeaderColumn align="left">
          Team Only
        </CollapseGroup.CollapseHeaderColumn>
        <CollapseGroup.CollapseHeaderColumn align="left">
          Everything
        </CollapseGroup.CollapseHeaderColumn>
      </CollapseGroup.CollapseHeader>
      <CollapseGroup.CollapseBody>
        {[...Array(8)].map(() => {
          return (
            <CollapseGroup.CollapseRow
              key={uuidv4()}
              sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}
            >
              <CollapseGroup.CollapseBodyColumn width={'40%'}>
                <Skeleton />
              </CollapseGroup.CollapseBodyColumn>
              <CollapseGroup.CollapseBodyColumn align="left" width={'20%'}>
                <Skeleton />
              </CollapseGroup.CollapseBodyColumn>
              <CollapseGroup.CollapseBodyColumn align="left" width={'20%'}>
                <Skeleton />
              </CollapseGroup.CollapseBodyColumn>
              <CollapseGroup.CollapseBodyColumn align="left" width={'20%'}>
                <Skeleton />
              </CollapseGroup.CollapseBodyColumn>
            </CollapseGroup.CollapseRow>
          )
        })}
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}
export default PermissionGroupSkeleton
