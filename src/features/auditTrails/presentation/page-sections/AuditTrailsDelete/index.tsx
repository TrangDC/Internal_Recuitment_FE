import {
  DateFieldBody,
  DateFieldDivison,
  DateFieldInformation,
  FieldRecord,
  StyleChip,
} from '../../providers/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny } from 'shared/components/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
import { TinyText } from 'shared/components/form/styles'
import { renderTextRecord } from '../../providers/functions'

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
      <DateFieldInformation>
        <FlexBox alignItems={'center'} gap={'8px'}>
          {/* <Tiny>{t(module)}</Tiny> */}
          <StyleChip label={type} sx={{ backgroundColor: '#82868c' }} />
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
            const { record_value } = renderTextRecord(item.field, item.value)

            return (
              <FieldRecord key={idx}>
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <ArrowForwardIcon />
                  <TinyText>{record_value}</TinyText>
                </DateFieldDivison>
              </FieldRecord>
            )
          })}
        </FlexBox>
      </DateFieldInformation>
    </DateFieldBody>
  )
}

export default AuditTrailsCreate
