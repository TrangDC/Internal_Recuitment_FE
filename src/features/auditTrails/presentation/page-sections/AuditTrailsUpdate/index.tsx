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
          <Tiny>{t(module)}</Tiny>
          <StyleChip label={type} sx={{backgroundColor: "#5CBAFE"}}/>
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={'8px'}>
          {data.map((item, idx) => {
            return (
              <FlexBox key={idx} gap={'8px'} alignItems={'center'}>
                <TinyText>{t(item.field)}: </TinyText>
                <DateFieldDivison>
                  <Tiny>
                    {t(item.field) === 'Description' ? (
                      <GenerateInnerHTML innerHTML={item.value.oldValue} />
                    ) : (
                      item.value.oldValue
                    )}
                  </Tiny>
                  <ArrowForwardIcon />
                  <TinyText> {t(item.field) === 'Description' ? (
                      <GenerateInnerHTML innerHTML={item.value.newValue} />
                    ) : (
                      item.value.newValue
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

export default AuditTrailsUpdate
