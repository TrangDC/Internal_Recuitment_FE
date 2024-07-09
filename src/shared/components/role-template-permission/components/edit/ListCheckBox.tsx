import { useTranslation } from 'react-i18next'
import AppCheckBox from 'shared/components/AppCheckBox'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13md } from 'shared/components/Typography'
import { ActionPermission } from '../../interfaces/permissionStructure'

interface IListCheckBoxProps {
  for_owner: boolean
  for_all: boolean
  for_team: boolean
  title: string
  description: string
  value: ActionPermission
  hiddenBorder?: boolean
  disabled?: boolean
  onCheck: (key: 'for_all' | 'for_team' | 'for_owner') => void
}

function ListCheckBox(props: IListCheckBoxProps) {
  const {
    for_owner,
    for_all,
    for_team,
    value,
    description,
    title,
    onCheck,
    hiddenBorder,
    disabled,
  } = props
  const { t } = useTranslation()
  const shouldCheck = (key: string) => {
    if (value?.for_all) return true
    if (value?.for_team && (key === 'for_team' || key === 'for_owner'))
      return true
    if (value?.for_owner && key === 'for_owner') return true
    return false
  }
  return (
    <CollapseGroup.CollapseRow
      sx={
        hiddenBorder
          ? undefined
          : { borderBottom: '1px solid', borderColor: 'grey.200' }
      }
    >
      <CollapseGroup.CollapseBodyColumn width={'50%'}>
        <FlexBox flexDirection={'column'}>
          <Text13md>{t(title)}</Text13md>
          <Text13md color={'#4D607A'}>{description}</Text13md>
        </FlexBox>
      </CollapseGroup.CollapseBodyColumn>
      <CollapseGroup.CollapseBodyColumn align="left" width={'16%'}>
        {for_owner && (
          <AppCheckBox
            checked={shouldCheck('for_owner')}
            onChange={() => onCheck('for_owner')}
            disabled={disabled}
          />
        )}
      </CollapseGroup.CollapseBodyColumn>
      <CollapseGroup.CollapseBodyColumn align="left" width={'16%'}>
        {for_team && (
          <AppCheckBox
            checked={shouldCheck('for_team')}
            onChange={() => onCheck('for_team')}
            disabled={disabled}
          />
        )}
      </CollapseGroup.CollapseBodyColumn>
      <CollapseGroup.CollapseBodyColumn align="left" width={'16%'}>
        {for_all && (
          <AppCheckBox
            checked={shouldCheck('for_all')}
            onChange={() => onCheck('for_all')}
            disabled={disabled}
          />
        )}
      </CollapseGroup.CollapseBodyColumn>
    </CollapseGroup.CollapseRow>
  )
}
export default ListCheckBox
