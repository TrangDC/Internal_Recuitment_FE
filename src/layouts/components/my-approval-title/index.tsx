import useCountJobPending from './hooks/useCountJobPending'
import { BoxCircle } from 'shared/styles'
import { TinyText } from 'shared/components/form/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'

const MyApprovalTitle = () => {
  const { totalRecord } = useCountJobPending()

  return (
    <FlexBox gap={0.75}>
      My approvals
      <BoxCircle>
        <TinyText>{totalRecord}</TinyText>
      </BoxCircle>
    </FlexBox>
  )
}

export default MyApprovalTitle
