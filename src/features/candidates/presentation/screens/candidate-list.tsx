import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import TabCustomize from 'shared/components/tab'
import Candidates from '../page-sections/Candidates'
import BlackList from '../page-sections/BlackList'
import useTextTranslation from 'shared/constants/text'
import CandidateIcon from 'shared/components/icons/Candidates'
import IconScreen from 'shared/components/utils/IconScreen'

const CandidateList = () => {
  const translation = useTextTranslation()

  const renderItem = [
    { label: translation.MODLUE_CANDIDATES.candidates, Component: Candidates },
    { label: translation.MODLUE_CANDIDATES.blacklist, Component: BlackList },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <FlexBox gap={0.5} alignItems="center">
          <IconScreen
            Icon={CandidateIcon}
            textLable={translation.MODLUE_CANDIDATES.candidates}
          />
        </FlexBox>
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default CandidateList
