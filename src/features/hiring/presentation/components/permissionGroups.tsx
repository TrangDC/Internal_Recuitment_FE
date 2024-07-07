import { Text13md } from 'shared/components/Typography'
import AppCheckBox from 'shared/components/AppCheckBox'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import { roleTemplateInformation } from 'shared/constants/permission'
import { PermissionGroup } from 'shared/hooks/permissions/interface/response'

type PermissionSectionProps = {
  permissionGroup: PermissionGroup
}

function PermissionGroups(props: PermissionSectionProps) {
  const { permissionGroup } = props
  const [open, setOpen] = useState(true)
  const { control, setValue } = useFormContext()
  const { t } = useTranslation()
  const key = 'entity_permissions'
  function onCheck(role: string, check: boolean, name: string) {
    if (role === 'everything') {
      if (check) {
        setValue(`${name}.ownedOnly`, true)
        setValue(`${name}.teamOnly`, true)
      } else {
        setValue(`${name}.everything`, false)
      }
    } else if (role === 'teamOnly') {
      if (check) {
        setValue(`${name}.ownedOnly`, true)
      } else {
        setValue(`${name}.everything`, false)
      }
    } else if (role === 'ownedOnly') {
      if (!check) {
        setValue(`${name}.everything`, false)
        setValue(`${name}.teamOnly`, false)
      }
    }
    setValue(`${name}.${role}`, check, { shouldDirty: true })
  }
  const permissions = permissionGroup.permissions
  return (
    <CollapseGroup.CollapseContainer
      open={open}
      setOpen={setOpen}
      title={<Text13md color={'grey.900'}>{t(permissionGroup.title)}</Text13md>}
    >
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
        {permissions.map((permission, index) => {
          const permissionId = permission.id
          const keyName = `${key}.${permissionId}`
          const description =
            roleTemplateInformation[permission.title].description
          return (
            <CollapseGroup.CollapseRow
              key={permission.id}
              sx={
                index !== permissions.length - 1
                  ? { borderBottom: '1px solid', borderColor: 'grey.200' }
                  : {}
              }
            >
              <CollapseGroup.CollapseBodyColumn width={'40%'}>
                <FlexBox flexDirection={'column'}>
                  <Text13md>{t(permission.title)}</Text13md>
                  <Text13md color={'#4D607A'}>{description}</Text13md>
                </FlexBox>
              </CollapseGroup.CollapseBodyColumn>
              <CollapseGroup.CollapseBodyColumn align="left" width={'20%'}>
                {permission.for_owner && (
                  <Controller
                    control={control}
                    name={`${keyName}.ownedOnly`}
                    defaultValue={false}
                    render={({ field }) => (
                      <AppCheckBox
                        checked={field.value}
                        onChange={(_, checked) =>
                          onCheck('ownedOnly', checked, `${keyName}`)
                        }
                      />
                    )}
                  />
                )}
              </CollapseGroup.CollapseBodyColumn>
              <CollapseGroup.CollapseBodyColumn align="left" width={'20%'}>
                {permission.for_team && (
                  <Controller
                    control={control}
                    name={`${keyName}.teamOnly`}
                    defaultValue={false}
                    render={({ field }) => (
                      <AppCheckBox
                        checked={field.value}
                        onChange={(_, checked) =>
                          onCheck('teamOnly', checked, `${keyName}`)
                        }
                      />
                    )}
                  />
                )}
              </CollapseGroup.CollapseBodyColumn>
              <CollapseGroup.CollapseBodyColumn align="left" width={'20%'}>
                {permission.for_all && (
                  <Controller
                    control={control}
                    name={`${keyName}.everything`}
                    defaultValue={false}
                    render={({ field }) => (
                      <AppCheckBox
                        checked={field.value}
                        onChange={(_, checked) =>
                          onCheck('everything', checked, `${keyName}`)
                        }
                      />
                    )}
                  />
                )}
              </CollapseGroup.CollapseBodyColumn>
            </CollapseGroup.CollapseRow>
          )
        })}
      </CollapseGroup.CollapseBody>
    </CollapseGroup.CollapseContainer>
  )
}
export default PermissionGroups
