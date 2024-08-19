import { H3, Text15sb, Tiny12md } from 'shared/components/Typography'
import { BoxCandidateInfor } from '../../components/Container'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Divider } from '@mui/material'
import { CandidateCertificate } from 'shared/schema/database/candidate'
import dayjs from 'dayjs'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { downloadOneFile } from 'features/candidatejob/shared/helper'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'

type CertificatesProps = {
  certificates: CandidateCertificate[]
}

function Certificates({ certificates }: CertificatesProps) {
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  return (
    <BoxCandidateInfor>
      <H3 sx={{ color: 'primary.800', fontWeight: 500 }} marginBottom={1}>
        Certificates
      </H3>
      <FlexBox flexDirection={'column'}>
        {certificates.map((certificate, index) => (
          <FlexBox flexDirection="column" gap={1} key={certificate.id}>
            <Text15sb color={'grey.900'}>{certificate.name}</Text15sb>
            <FlexBox>
              <Tiny12md>Achieved date:</Tiny12md>
              <Tiny12md>
                {dayjs(certificate.achieved_date).format('MMM YYYY')}
              </Tiny12md>
            </FlexBox>
            <FlexBox>
              <Tiny12md>Score:</Tiny12md>
              <Tiny12md>{certificate.score}</Tiny12md>
            </FlexBox>
            <FlexBox flexDirection={'column'}>
              <Tiny12md marginBottom={1}>Attachment:</Tiny12md>
              <FlexBox>
                {certificate.attachments.map((attachment) => (
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
            {index !== certificates.length - 1 && (
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

export default Certificates
