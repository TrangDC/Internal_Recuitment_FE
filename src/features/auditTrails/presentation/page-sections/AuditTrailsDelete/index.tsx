import {
  DateFieldBody,
  DateFieldDivison,
  FieldRecord,
  StyleChip,
} from '../../providers/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { TinyText } from 'shared/components/form/styles'
import { renderTextRecord } from '../../providers/functions'
import { getLastString } from 'shared/utils/convert-string'
import { Tiny } from 'shared/components/Typography'

interface Props {
  data: {
    field: string
    value: string
  }[]
  type: 'Create' | 'Update' | 'Delete'
  module: string
}

const AuditTrailsCreate = ({ data, type, module }: Props) => {
  const { t } = useTranslation()
  return (
    <DateFieldBody>
      <FlexBox flexDirection={'column'} gap={'8px'}>
        <FlexBox alignItems={'flex-start'} flexDirection={'column'}>
        <Tiny sx={{ textDecoration: 'underline' }}>{t(module)}</Tiny>
          <StyleChip label={type} sx={{ backgroundColor: '#82868c' }} />
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
            const isDescription = getLastString(item.field) === 'description'
            const { record_value } = renderTextRecord(
              item.field,
              item.value,
              data
            )

            return (
              <FieldRecord
                key={idx}
                sx={{
                  order: isDescription ? 99 : 'inherit',
                }}
              >
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <ArrowForwardIcon />
                  <TinyText>{record_value}</TinyText>
                </DateFieldDivison>
              </FieldRecord>
            )
          })}
        </FlexBox>
      </FlexBox>
    </DateFieldBody>
  )
}

export default AuditTrailsCreate
