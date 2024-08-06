import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetSkill from '../../../hooks/crud/useGetSkill'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { innerHTMLTextArea } from 'shared/components/genarateInnerHTML'

interface IDetailSkillModal {
  id: string
}

function DetailSkillModal({
  id,
}: IDetailSkillModal) {
  const { formData } = useGetSkill({
    id: id,
  })

  return (
    <Box padding={'16px 32px'} width={'100%'}>
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

        <FormControl fullWidth>
          <Box>
            <Tiny12md color={'grey.500'}>Type</Tiny12md>
            <FlexBox
              alignItems={'center'}
              gap={1}
              width={'100%'}
              marginTop={1}
            >
              <Text13md color={'grey.900'} fontWeight={600}>
                {formData?.skill_type?.name}
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
  )
}

export default DetailSkillModal
