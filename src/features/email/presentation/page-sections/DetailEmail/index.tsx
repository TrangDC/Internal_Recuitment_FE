import BaseModal from 'shared/components/modal'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from 'shared/components/icons/EditIcon'
import { DATA_KEYWORD_TEMPLATE, IDetailModal } from 'shared/interfaces'
import { Email } from 'features/email/domain/interfaces'
import useEmailDetail from 'features/email/hooks/useEmailDetail'
import { ChipLimit } from 'shared/components/chip-stack'
import useGetEmailKeyWord from 'features/email/hooks/useGetEmailKeyWord'
import { replaceTemplate } from 'shared/utils/utils'
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
interface IDetailEmailModal extends IDetailModal<Email> {
  handleOpenEdit: (value: string) => void
}

function DetailEmailModal({
  open,
  setOpen,
  id,
  handleOpenEdit,
}: IDetailEmailModal) {
  const { email_detail } = useEmailDetail(id)

  const { options_keyWord } = useGetEmailKeyWord()

  const previewData = (content: string, data: DATA_KEYWORD_TEMPLATE[]) => {
    const stringHTML = replaceTemplate(content ?? '', data)

    return GenerateInnerHTML({
      innerHTML: stringHTML,
    })
  }

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <Box>
        <BaseModal.Header
          title={'Email template details'}
          setOpen={setOpen}
          EndHeader={
            <FlexBox gap={1}>
              <EditIcon
                sx={{
                  height: '24px',
                  width: '24px',
                  color: '#82868C',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handleOpenEdit(id)
                }}
              />

              <CloseIcon
                sx={{
                  height: '24px',
                  width: '24px',
                  color: '#82868C',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                }}
              />
            </FlexBox>
          }
        ></BaseModal.Header>
        <Scrollbar sx={{ maxHeight: '500px' }}>
          <Box padding={'16px 32px'}>
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
                      {previewData(email_detail?.subject as string, options_keyWord)}
                    </Text13md>
                  </FlexBox>
                </FormControl>
              </FlexBox>

              <FlexBox>
                <FormControl fullWidth>
                  <FlexBox flexDirection={'column'} gap={0.25}>
                    <Tiny12md color={'grey.500'}>Email content</Tiny12md>
                    <Text13md color={'grey.900'} fontWeight={600}>
                      {previewData(email_detail?.content as string, options_keyWord)}
                    </Text13md>
                  </FlexBox>
                </FormControl>
              </FlexBox>

              <FlexBox>
                <FormControl fullWidth>
                  <FlexBox flexDirection={'column'} gap={0.25}>
                    <Tiny12md color={'grey.500'}>Email signature</Tiny12md>
                    <Text13md color={'grey.900'} fontWeight={600}>
                      {previewData(email_detail?.signature as string, options_keyWord)}
                    </Text13md>
                  </FlexBox>
                </FormControl>
              </FlexBox>
            </FlexBox>
          </Box>
        </Scrollbar>
      </Box>
    </BaseModal.Wrapper>
  )
}

export default DetailEmailModal
