import {
  DateFieldBody,
  DateFieldDivison,
  DateFieldInformation,
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
      <DateFieldInformation>
        <FlexBox alignItems={'center'} gap={'8px'}>
          {/* <Tiny>{t(module)}</Tiny> */}
          <StyleChip label={type} sx={{backgroundColor: "#5CBAFE"}}/>
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
             const old_value = renderTextRecord(item.field, item.value.oldValue).record_value
             const new_value = renderTextRecord(item.field, item.value.newValue).record_value

            return (
              <FieldRecord key={idx}>
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <FieldOld>
                    {old_value}
                  </FieldOld>
                  <ArrowForwardIcon sx={{color: '#2499EF !important'}}/>
                  <TinyText fontWeight={500}>{new_value}</TinyText>
                </DateFieldDivison>
              </FieldRecord>
            )
          })}
        </FlexBox>
      </DateFieldInformation>
    </DateFieldBody>
  )
}

export default AuditTrailsUpdate
