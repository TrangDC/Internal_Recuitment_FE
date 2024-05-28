import dayjs from 'dayjs'
import { HeaderProps } from 'react-big-calendar'
import { H5, Text13md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'

function CustomHeaders(props: HeaderProps) {
  const { date } = props
  const day = dayjs(date).format('DD')
  const week = dayjs(date).format('ddd')
  return (
    <FlexBox flexDirection={'column'}>
      <Text13md
        justifyContent={'start'}
        fontSize={11}
        color={'grey.500'}
        lineHeight={'13.41px'}
        fontFamily={'Montserrat'}
      >
        {week.toUpperCase()}
      </Text13md>
      <H5 fontFamily={'Montserrat'}>{day}</H5>
    </FlexBox>
  )
}

export default CustomHeaders
