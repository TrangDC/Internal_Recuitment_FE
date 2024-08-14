import { H3, Text15sb, Tiny12md } from 'shared/components/Typography'
import { BoxCandidateInfor } from '../../components/Container'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Divider } from '@mui/material'
import { CandidateEducate } from 'shared/schema/database/candidate'
import dayjs from 'dayjs'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { downloadOneFile } from 'features/candidatejob/shared/helper'

type EducationProps = {
  educations: CandidateEducate[]
}

function Education({ educations }: EducationProps) {
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  return (
    <BoxCandidateInfor>
      <H3 sx={{ color: 'primary.800', fontWeight: 500 }} marginBottom={1}>
        Education
      </H3>
      {educations.map((education, index) => (
        <FlexBox flexDirection={'column'} width={'100%'} key={education.id}>
          <Text15sb color={'#2A2E37'} marginBottom={'4px'}>
            {education.school_name}
          </Text15sb>
          <Tiny12md color={'#2A2E37'} marginBottom={'4px'}>
            {education.major}
          </Tiny12md>
          <Tiny12md color={'grey.500'} marginBottom={'4px'}>
            {dayjs(education.start_date).format('MMM YYYY')} -{' '}
            {dayjs(education.end_date).format('MMM YYYY')}
          </Tiny12md>
          <Tiny12md color={'grey.500'} marginBottom={'8px'}>
            {education.location}
          </Tiny12md>
          <Tiny12md color={'grey.500'} marginBottom={'8px'}>
            {education.gpa}
          </Tiny12md>
          <FlexBox flexDirection={'column'}>
            <Tiny12md marginBottom={1}>Attachment:</Tiny12md>
            <FlexBox>
              {education.attachments.map((attachment) => (
                <ShowFile
                  key={attachment.id}
                  name={attachment.document_name}
                  IconEnd={
                    <DownloadIcon
                      onClick={() => {
                        if (attachment) {
                          downloadOneFile(attachment, handleGetUrlDownload)
                        }
                      }}
                    />
                  }
                  containerSx={{
                    width: 'auto',
                  }}
                />
              ))}
            </FlexBox>
          </FlexBox>
          {index !== educations.length - 1 && (
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
    </BoxCandidateInfor>
  )
}

export default Education
