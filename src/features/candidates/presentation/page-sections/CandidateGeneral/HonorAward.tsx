import { H3, Text15sb, Tiny12md } from 'shared/components/Typography'
import { BoxCandidateInfor } from '../../components/Container'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Divider } from '@mui/material'
import { CandidateAward } from 'shared/schema/database/candidate'
import dayjs from 'dayjs'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import ShowFile from 'shared/components/input-fields/ItemFile'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { downloadOneFile } from 'features/candidatejob/shared/helper'

type HonorAwardProps = {
  awards: CandidateAward[]
}

function HonorAward({ awards }: HonorAwardProps) {
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  return (
    <BoxCandidateInfor>
      <H3 sx={{ color: 'primary.800', fontWeight: 500 }} marginBottom={1}>
        Honor/ Awards
      </H3>
      <FlexBox flexDirection={'column'}>
        {awards.map((award, index) => (
          <FlexBox flexDirection="column" gap={1} key={award.id}>
            <Text15sb color={'grey.900'}>{award.name}</Text15sb>
            <FlexBox>
              <Tiny12md>Achieved date: </Tiny12md>
              <Tiny12md>
                {award.achieved_date
                  ? dayjs(award.achieved_date).format('MMM YYYY')
                  : ''}
              </Tiny12md>
            </FlexBox>
            <FlexBox flexDirection={'column'}>
              <Tiny12md marginBottom={1}>Attachment:</Tiny12md>
              <FlexBox>
                {award.attachments.map((attachment) => (
                  <ShowFile
                    key={attachment.id}
                    name={attachment.document_name}
                    onClick={() => {
                      if (attachment) {
                        downloadOneFile(attachment, handleGetUrlDownload)
                      }
                    }}
                    IconEnd={<DownloadIcon />}
                    containerSx={{
                      width: 'auto',
                    }}
                  />
                ))}
              </FlexBox>
            </FlexBox>
            {index !== awards.length - 1 && (
              <Divider
                sx={{
                  margin: '15px 0',
                }}
                orientation="horizontal"
                variant="middle"
                flexItem
              />
            )}
          </FlexBox>
        ))}
      </FlexBox>
    </BoxCandidateInfor>
  )
}

export default HonorAward
