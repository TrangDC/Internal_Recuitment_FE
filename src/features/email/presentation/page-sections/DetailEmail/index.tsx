import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import useEmailDetail from 'features/email/hooks/useEmailDetail'
import { ChipLimit } from 'shared/components/chip-stack'
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
import { replaceLink } from 'features/email/shared/utils'

interface IDetailEmailModal {
  id: string
}

function DetailEmailModal({ id }: IDetailEmailModal) {
  const { email_detail } = useEmailDetail(id as string)

  return (
    <Box padding={'24px 16px'}>
      <FlexBox flexDirection={'column'} gap={2.5}>
        <FlexBox>
          <FormControl fullWidth>
            <FlexBox gap={0.25} flexDirection={'column'}>
              <Tiny12md color={'grey.500'}>Event</Tiny12md>
              <Text13md color={'grey.900'} fontWeight={600}>
                {email_detail.event}
              </Text13md>
            </FlexBox>
          </FormControl>
        </FlexBox>
        <FlexBox>
          <FormControl fullWidth>
            <FlexBox flexDirection={'column'} gap={0.25}>
              <Tiny12md color={'grey.500'}>Send to</Tiny12md>
              <Text13md color={'grey.900'} fontWeight={600}>
                <ChipLimit
                  chips={email_detail?.send_to ?? []}
                  show_tooltip={false}
                />
              </Text13md>
            </FlexBox>
          </FormControl>
        </FlexBox>
        <FlexBox>
          <FormControl fullWidth>
            <FlexBox flexDirection={'column'} gap={0.25}>
              <Tiny12md color={'grey.500'}>Cc</Tiny12md>
              <Text13md color={'grey.900'} fontWeight={600}>
                <ChipLimit chips={email_detail?.cc ?? []} />
              </Text13md>
            </FlexBox>
          </FormControl>
        </FlexBox>

        <FlexBox>
          <FormControl fullWidth>
            <FlexBox gap={0.25} flexDirection={'column'}>
              <Tiny12md color={'grey.500'}>Email subject</Tiny12md>
              <Text13md color={'grey.900'} fontWeight={600}>
                {GenerateInnerHTML({ innerHTML: email_detail?.subject })}
              </Text13md>
            </FlexBox>
          </FormControl>
        </FlexBox>

        <FlexBox>
          <FormControl fullWidth>
            <FlexBox flexDirection={'column'} gap={0.25}>
              <Tiny12md color={'grey.500'}>Email content</Tiny12md>
              <Text13md color={'grey.900'} fontWeight={600}>
                {GenerateInnerHTML({
                  innerHTML: replaceLink(email_detail?.content ?? ''),
                })}
              </Text13md>
            </FlexBox>
          </FormControl>
        </FlexBox>

        <FlexBox>
          <FormControl fullWidth>
            <FlexBox flexDirection={'column'} gap={0.25}>
              <Tiny12md color={'grey.500'}>Email signature</Tiny12md>
              <Text13md color={'grey.900'} fontWeight={600}>
                {GenerateInnerHTML({
                  innerHTML: replaceLink(email_detail?.signature ?? ''),
                })}
              </Text13md>
            </FlexBox>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </Box>
  )
}

export default DetailEmailModal
