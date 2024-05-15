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
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
import { TinyText } from 'shared/components/form/styles'

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
          <Tiny>{t(module)}</Tiny>
          <StyleChip label={type} sx={{backgroundColor: "#ffaf46"}}/>
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
            return (
              <FlexBox key={idx} gap={'8px'}>
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <ArrowForwardIcon />
                  <TinyText> {t(item.field) === 'Description' ? (
                      <GenerateInnerHTML innerHTML={item.value} />
                    ) : (
                      item.value
                    )}</TinyText>
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
