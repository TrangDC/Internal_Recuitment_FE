import { Box } from '@mui/system'
import useTextTranslation from 'shared/constants/text'
import IconScreen from 'shared/components/utils/IconScreen'
import TabCustomize from 'shared/components/tab'
import JobOpening from '../page-sections/JobOpening'
import AllJobRequest from '../page-sections/AllJobRequest'
import MicroScope from 'shared/components/icons/Microscope'
import PendingApprovals from '../page-sections/PendingApproval'
import { useLayoutEffect, useState } from 'react'
import { getCountPendingApproval } from 'features/jobs/domain/service'
import { BoxCircle } from 'shared/styles'
import { TinyText } from 'shared/components/form/styles'
import FlexBox from 'shared/components/flexbox/FlexBox'

const JobsList = () => {
  const translation = useTextTranslation()
  const [countPA, setCountPA] = useState<number>(0)

  useLayoutEffect(() => {
    ;(async () => {
      setCountPA(await getCountPendingApproval())
    })()
  }, [])

  const renderItem = [
    { label: 'Opening', Component: JobOpening },
    {
      label: (
        <FlexBox gap={1.25} alignItems={'center'}>
          Pending approvals
          <BoxCircle>
            <TinyText>{countPA}</TinyText>
          </BoxCircle>
        </FlexBox>
      ),
      Component: PendingApprovals,
    },
    { label: 'All job request', Component: AllJobRequest },
  ]

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={MicroScope}
          textLabel={translation.MODLUE_JOBS.jobs}
        />
      </Box>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <TabCustomize renderItem={renderItem} />
      </Box>
    </Box>
  )
}

export default JobsList
