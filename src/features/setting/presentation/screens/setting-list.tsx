import { Box } from '@mui/material'
import Settings from 'shared/components/icons/Settings'
import { H4 } from 'shared/components/Typography'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'

const TeamList = () => {
  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen Icon={Settings} textLable={'Setting'} />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <H4>Setting</H4>
        </HeadingWrapper>
      </BoxWrapperOuterContainer>
    </Box>
  )
}

export default TeamList
