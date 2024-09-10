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
import { Fragment } from 'react/jsx-runtime'

type FieldValue = {
  field: string
  value: {
    oldValue: string;
    newValue: string;
  };
}

interface Props {
  data: FieldValue[]
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
            if (Array.isArray(item)) {
              return item.map((subItem, idxSub) => {
                return <Fragment key={idxSub}>{ViewValue({ item: subItem, data: item })}</Fragment>
              })
            }

            return <Fragment key={idx}>
              {ViewValue({ item, data })}
            </Fragment>
          })}
        </FlexBox>
      </FlexBox>
    </DateFieldBody>
  )
}

const ViewValue = ({ item, data }: { item: FieldValue, data: FieldValue[] }) => {
  const { t } = useTranslation()

  const isDescription = typeof item.field === 'string' ? getLastString(item.field) === 'description' : false;

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
}

export default AuditTrailsUpdate
