import { Text13md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { useState } from 'react'
import PermissionGroupSkeleton from '../components/skeleton/permission-group-skeleton'
import AppCollapse from 'shared/components/collapse/AppCollapse'
import PermissionGroups from '../components/permissionGroups'
import _ from 'lodash'
import { PermissionGroup } from 'shared/hooks/permissions/interface/response'
import { groupByPermissionsByGroupType } from 'shared/hooks/permissions/utils/functions'

type PermissionSectionsProps = {
  permissionGroup: PermissionGroup[]
  isGetting: boolean
}

function PermissionSections({
  permissionGroup,
  isGetting,
}: PermissionSectionsProps) {
  const [open, setOpen] = useState(true)
  const groups = groupByPermissionsByGroupType(permissionGroup)
  return (
    <AppCollapse open={open} setOpen={setOpen} title="Permission">
      {Object.keys(groups).map((key) => {
        if (isGetting) return <PermissionGroupSkeleton />
        return (
          <FlexBox flexDirection={'column'} gap={2} key={key}>
            <Text13md fontWeight={700}>{_.upperCase(key)}</Text13md>
            {groups[key].map((item) => (
              <PermissionGroups permissionGroup={item} key={item.id} />
            ))}
          </FlexBox>
        )
      })}
    </AppCollapse>
  )
}

export default PermissionSections
