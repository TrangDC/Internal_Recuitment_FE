import {
  DateFieldBody,
  DateFieldDivison,
  DateFieldInformation,
  StyleChip,
} from '../../providers/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny } from 'shared/components/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { TinyText } from 'shared/components/form/styles'
import {
  convertStringToArray,
  getLastString,
} from 'shared/utils/convert-string'
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
          <Tiny>
            {convertStringToArray(module).length > 2
              ? t(module)
              : t(getLastString(module))}
          </Tiny>
          <StyleChip label={type} sx={{ backgroundColor: '#ffaf46' }} />
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
            const { record_value } = renderTextRecord(item.field, item.value)

            return (
              <FlexBox key={idx} gap={'8px'}>
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <ArrowForwardIcon />
                  <TinyText>{record_value}</TinyText>
                </DateFieldDivison>
              </FlexBox>
            )
          })}
        </FlexBox>
      </DateFieldInformation>
    </DateFieldBody>
  )
}

export default AuditTrailsCreate
