import {
  BoxField,
  BoxFieldContainer,
  BoxTitle,
  DivField,
} from '../../providers/styles'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import PhoneIcon from 'shared/components/icons/PhoneIcon'
import { CandidateStatusItem } from '../../providers/hooks/useCandidatesByJob'

interface Props {
  title: string
  number_candidates: number
  list_candidates: CandidateStatusItem[]
}

const BoxStatusCandidates = ({
  title,
  number_candidates = 0,
  list_candidates = [],
}: Props) => {
  return (
    <DivField>
      <BoxTitle>
        <Span>
          {title} {number_candidates}
        </Span>
      </BoxTitle>
      <BoxField>
        {list_candidates?.map((item) => {
          return (
            <BoxFieldContainer key={item.id}>
              <Span>{item.candidate.name}</Span>
              <FlexBox alignItems={'center'} gap={'6px'}>
                <PhoneIcon /> <Tiny>{item.candidate.phone}</Tiny>
              </FlexBox>
            </BoxFieldContainer>
          )
        })}
      </BoxField>
    </DivField>
  )
}

export default BoxStatusCandidates
