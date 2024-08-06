import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { innerHTMLTextArea } from 'shared/components/genarateInnerHTML'
import useGetTypeSkill from 'features/skillType/hooks/crud/useGetTypeSkill'
interface IDetailSkillTypeModal {
  id: string
}

function DetailSkillTypeModal({
  id,
}: IDetailSkillTypeModal) {
  const { formData } = useGetTypeSkill({
    id: id,
  })

  return (
    <Scrollbar sx={{ maxHeight: '500px' }}>
    <Box padding={'16px 32px'}>
      <FlexBox flexDirection={'column'} gap={2}>
        <FlexBox gap={2}>
          <FormControl fullWidth>
            <Box>
              <Tiny12md color={'grey.500'}>Name</Tiny12md>
              <FlexBox
                alignItems={'center'}
                gap={1}
                width={'100%'}
                marginTop={1}
              >
                <Text13md color={'grey.900'} fontWeight={600}>
                  {formData?.name}
                </Text13md>
              </FlexBox>
            </Box>
          </FormControl>
        </FlexBox>
        <FlexBox gap={2}>
          <FormControl fullWidth>
            <Box>
              <Tiny12md color={'grey.500'}>Description</Tiny12md>
              <FlexBox
                alignItems={'center'}
                gap={1}
                width={'100%'}
                marginTop={1}
              >
                <Text13md color={'grey.900'} fontWeight={600}>
                  {innerHTMLTextArea(formData?.description ?? '')}
                </Text13md>
              </FlexBox>
            </Box>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </Box>
  </Scrollbar>
  )
}

export default DetailSkillTypeModal
