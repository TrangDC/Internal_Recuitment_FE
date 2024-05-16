import { Box } from '@mui/material'
import { BoxWrapperContainer } from 'features/teams/presentation/providers/styles/style'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import ChipField from 'shared/components/input-fields/ChipField'
import useTeamDetail from '../../providers/hooks/useTeamDetail'
import useTextTranslation from 'shared/constants/text'

const GeneralInformation = () => {
  const { id } = useParams()
  const { teamDetail } = useTeamDetail(id as string);
  const translation = useTextTranslation();

  return (
    <BoxWrapperContainer>
      <FlexBox flexDirection={'column'} gap={'20px'}>
        <Box>
          <SpanText>{translation.COMMON.name}</SpanText>
          <TinyText>{teamDetail?.name}</TinyText>
        </Box>
        <Box>
          <FlexBox flexDirection={'column'}>
            <SpanText>{translation.MODLUE_TEAMS.team_manager}</SpanText>
            <FlexBox gap={'10px'} flexWrap={'wrap'}>
                {teamDetail?.members?.map((member, idx) =>  <ChipField key={idx} label={member.name} />)}
            </FlexBox>
          </FlexBox>
        </Box>
      </FlexBox>
    </BoxWrapperContainer>
  )
}

export default GeneralInformation
