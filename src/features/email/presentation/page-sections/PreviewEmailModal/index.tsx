import BaseModal from 'shared/components/modal'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Scrollbar from 'shared/components/ScrollBar'
import { DATA_KEYWORD_TEMPLATE, IDetailModal } from 'shared/interfaces'
import GenerateInnerHTML from 'shared/components/genarateInnerHTML'
import { TextWrapper } from 'features/email/shared/constants/styles/style'
import useGetEmailKeyWord from 'features/email/hooks/useGetEmailKeyWord'
import { replaceTemplate } from 'shared/utils/utils'
import EmailTemplate from 'shared/schema/database/email_template'

function PreviewEmailModal({
  open,
  setOpen,
  rowData,
}: IDetailModal<Partial<EmailTemplate>>) {
  const { options_keyWord } = useGetEmailKeyWord({})
  const previewData = (content: string, data: DATA_KEYWORD_TEMPLATE[]) => {
    const stringHTML = replaceTemplate(content, data)

    return GenerateInnerHTML({
      innerHTML: stringHTML,
    })
  }



  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1400}>
      <Box>
        <BaseModal.Header
          title={'Preview Email template'}
          setOpen={setOpen}
        ></BaseModal.Header>
        <Scrollbar sx={{ maxHeight: '500px' }}>
          <Box padding={'16px 32px'}>
            <FlexBox flexDirection={'column'} gap={2.5}>
              <FlexBox>
                <TextWrapper>
                  {previewData(rowData?.subject as string, options_keyWord)}
                </TextWrapper>
              </FlexBox>

              <FlexBox>
                <TextWrapper>
                  {previewData(rowData?.content as string, options_keyWord)}
                </TextWrapper>
              </FlexBox>

              <FlexBox>
                <TextWrapper>
                  {previewData(rowData?.signature as string, options_keyWord)}
                </TextWrapper>
              </FlexBox>
            </FlexBox>
          </Box>
        </Scrollbar>
      </Box>
    </BaseModal.Wrapper>
  )
}

export default PreviewEmailModal
