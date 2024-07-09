import { useTranslation } from 'react-i18next'
import CollapseGroup from 'shared/components/collapse/CollapseGroup'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13md } from 'shared/components/Typography'
import {
  ActionPermission,
  CustomPermission,
} from '../../interfaces/permissionStructure'
import CheckIcon from 'shared/components/icons/Check'

interface IListCheckBoxDetailProps {
  hiddenBorder?: boolean
  customPermission: CustomPermission
  value: ActionPermission
}

function ListCheckBoxDetail(props: IListCheckBoxDetailProps) {
  const { customPermission, hiddenBorder, value } = props
  const {
    description,
    for_all = false,
    for_owner = false,
    for_team = false,
    title,
  } = customPermission
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
        {for_owner && shouldCheck('for_owner') && (
          <CheckIcon
            sx={{
              height: '24px',
              width: '24px',
              color: 'primary.600',
              cursor: 'pointer',
            }}
          />
        )}
      </CollapseGroup.CollapseBodyColumn>
      <CollapseGroup.CollapseBodyColumn align="left" width={'16%'}>
        {for_team && shouldCheck('for_team') && (
          <CheckIcon
            sx={{
              height: '24px',
              width: '24px',
              color: 'primary.600',
              cursor: 'pointer',
            }}
          />
        )}
      </CollapseGroup.CollapseBodyColumn>
      <CollapseGroup.CollapseBodyColumn align="left" width={'16%'}>
        {for_all && shouldCheck('for_all') && (
          <CheckIcon
            sx={{
              height: '24px',
              width: '24px',
              color: 'primary.600',
              cursor: 'pointer',
            }}
          />
        )}
      </CollapseGroup.CollapseBodyColumn>
    </CollapseGroup.CollapseRow>
  )
}
export default ListCheckBoxDetail
