import {
  DateFieldBody,
  DateFieldDivison,
  FieldOld,
  FieldRecord,
  StyleChip,
} from '../../providers/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny } from 'shared/components/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { TinyText } from 'shared/components/form/styles'
import { renderTextRecord } from '../../providers/functions'
import { getLastString } from 'shared/utils/convert-string'

interface Props {
  data: {
    field: string
    value: {
      oldValue: string
      newValue: string
    }
  }[]
  type: 'Create' | 'Update' | 'Delete'
  module: string
}

const AuditTrailsUpdate = ({ data, type, module }: Props) => {
  const { t } = useTranslation()
  return (
    <DateFieldBody>
      <FlexBox flexDirection={'column'} gap={'8px'}>
        <FlexBox alignItems={'flex-start'} flexDirection={'column'}>
          <Tiny sx={{ textDecoration: 'underline' }}>{t(module)}</Tiny>
          <StyleChip label={type} sx={{ backgroundColor: '#5CBAFE' }} />
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
            const isDescription = getLastString(item.field) === 'description'

            const old_value = renderTextRecord(
              item.field,
              item.value.oldValue,
              data
            ).record_value
            const new_value = renderTextRecord(
              item.field,
              item.value.newValue,
              data
            ).record_value

            return (
              <FieldRecord
                key={idx}
                sx={{
                  order: isDescription ? 99 : 'inherit',
                }}
              >
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <FieldOld>{old_value}</FieldOld>
                  <ArrowForwardIcon sx={{ color: '#2499EF !important' }} />
                  <TinyText fontWeight={500}>{new_value}</TinyText>
                </DateFieldDivison>
              </FieldRecord>
            )
          })}
        </FlexBox>
      </FlexBox>
    </DateFieldBody>
  )
}

export default AuditTrailsUpdate
