import { H3, Text15sb, Tiny12, Tiny12md } from 'shared/components/Typography'
import { BoxCandidateInfor } from '../../components/Container'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Divider } from '@mui/material'
import { CandidateExp } from 'shared/schema/database/candidate'
import dayjs from 'dayjs'

type ProfessionalExpProps = {
  exps: CandidateExp[]
}

function ProfessionalExp({ exps }: ProfessionalExpProps) {
  return (
    <BoxCandidateInfor>
      <H3 sx={{ color: 'primary.800', fontWeight: 500 }} marginBottom={1}>
        Professional Experience
      </H3>
      {exps.map((epx, index) => (
        <FlexBox flexDirection={'column'} key={epx.id}>
          <Text15sb color={'#2A2E37'} marginBottom={'4px'}>
            {epx.position}
          </Text15sb>
          <Tiny12md color={'#2A2E37'} marginBottom={'4px'}>
            {epx.company}
          </Tiny12md>
          <Tiny12md color={'grey.500'} marginBottom={'4px'}>
            {dayjs(epx.start_date).format('MMM YYYY')} -{' '}
            {dayjs(epx.end_date).format('MMM YYYY')}
          </Tiny12md>
          <Tiny12md color={'grey.500'} marginBottom={'8px'}>
            {epx.location}
          </Tiny12md>
          <Tiny12 color={'#2A2E37'}>{epx.description}</Tiny12>
          {index !== exps.length - 1 && (
            <Divider
              sx={{
                margin: '15px 0',
              }}
              orientation="horizontal"
              variant="middle"
              flexItem
            />
          )}
        </FlexBox>
      ))}
    </BoxCandidateInfor>
  )
}

export default ProfessionalExp
