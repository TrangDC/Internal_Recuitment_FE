import { Box, Divider } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Tooltip from 'shared/components/tooltip'
import {
  H3,
  Small,
  Span,
  Text13md,
  Text13sb,
} from 'shared/components/Typography'
import { format } from 'date-fns'
import Cake from 'shared/components/icons/Cake'
import Address from 'shared/components/icons/Address'
import { useMemo, useState } from 'react'
import { ChipLimit } from 'shared/components/chip-stack'
import { CANDIDATE_SOURCE_LABEL } from 'shared/components/autocomplete/candidate-source-auto-complete'
import { renderReferenceValueByType } from 'features/auditTrails/presentation/providers/helper'
import dayjs from 'dayjs'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { downloadOneFile } from 'features/candidatejob/shared/helper'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import DescriptionIcon from '@mui/icons-material/Description'
import { ButtonSwage } from '../../components/ButtonSware'
import MailIcon from '@mui/icons-material/Mail'
import { ContainerLeft } from '../../components/Container'
import Scrollbar from 'shared/components/ScrollBar'
import { useCandidateInforContext } from 'features/candidates/shared/context/CandidateInformation'
import CreateCandidateNoteModal from '../CreateCandidateNoteModal'
import CreateHistoryCallModal from '../CreateHistoryCallModal'
import AvatarUpload from 'shared/components/upload/AvatarUpload'

const CandidateProfile = () => {
  const { candidateInfor, avatar } = useCandidateInforContext()
  const attachments = candidateInfor?.attachments ?? []
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  const [open, setOpen] = useState(false)
  const [openHistoryCall, setOpenHistoryCall] = useState(false)

  const [showMore, setShowMore] = useState(false)
  const candidate_skills = useMemo(() => {
    if (!candidateInfor?.entity_skill_types) return []
    const skill_types = candidateInfor.entity_skill_types
    return skill_types
      ? skill_types.flatMap((type) => {
          return type.entity_skills.map((skill) => skill.name)
        })
      : []
  }, [candidateInfor])
  const MAX_LENGTH = 30
  const description = candidateInfor?.description || ''
  const isLongText = description.length > MAX_LENGTH

  return (
    <ContainerLeft>
      <Box height={'200px'}>
        <AvatarUpload readonly url={avatar} />
        <H3
          sx={{
            textAlign: 'center',
            padding: '15px 0',
          }}
        >
          {candidateInfor?.name}
        </H3>
        <FlexBox gap={2} justifyContent={'center'}>
          <Tooltip title="Add a new note">
            <ButtonSwage onClick={() => setOpen(true)}>
              <DescriptionIcon
                sx={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: 'primary.600',
                }}
              />
            </ButtonSwage>
          </Tooltip>

          <Tooltip title="Add a new call">
            <ButtonSwage onClick={() => setOpenHistoryCall(true)}>
              <LocalPhoneIcon
                sx={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: 'primary.600',
                }}
              />
            </ButtonSwage>
          </Tooltip>
        </FlexBox>
      </Box>
      <Divider
        sx={{
          margin: '15px 0',
        }}
        orientation="horizontal"
        variant="middle"
        flexItem
      />
      <Box height={'calc(80vh - 250px)'}>
        <Scrollbar>
          <FlexBox flexDirection={'column'}>
            <FlexBox
              alignItems={'center'}
              gap={1}
              sx={{
                margin: '4px 0',
                cursor: 'pointer',
              }}
            >
              <LocalPhoneIcon
                sx={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: 'grey.500',
                }}
              ></LocalPhoneIcon>
              <Small>{candidateInfor?.phone}</Small>
              {/* <FileCopyIcon sx={{ color: 'grey.500', fontSize: '16px' }} /> */}
            </FlexBox>
            <FlexBox
              alignItems={'center'}
              gap={1}
              sx={{
                margin: '4px 0',
                cursor: 'pointer',
              }}
            >
              <MailIcon
                sx={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: 'grey.500',
                }}
              ></MailIcon>
              <Small>{candidateInfor?.email}</Small>
              {/* <FileCopyIcon sx={{ color: 'grey.500', fontSize: '16px' }} /> */}
            </FlexBox>
            <FlexBox
              gap={1}
              sx={{
                margin: '4px 0',
              }}
            >
              <Cake
                sx={{
                  fontSize: '18px',
                }}
              ></Cake>
              <Small>
                {candidateInfor?.dob &&
                  format(new Date(candidateInfor?.dob), 'dd/MM/yyyy')}
              </Small>
            </FlexBox>
            <FlexBox
              alignItems={'center'}
              gap={1}
              sx={{
                margin: '4px 0',
              }}
            >
              <Address
                sx={{
                  fontSize: '18px',
                }}
              ></Address>
              <Small>{candidateInfor?.country}</Small>
            </FlexBox>
          </FlexBox>
          <FlexBox
            sx={{
              margin: '15px 0',
            }}
          >
            <ChipLimit chips={candidate_skills} limit={3} />
          </FlexBox>
          <FlexBox
            flexDirection={'column'}
            sx={{
              margin: '8px 0',
            }}
          >
            <Span>Candidate Source</Span>
            <Text13sb>
              {candidateInfor &&
                CANDIDATE_SOURCE_LABEL[candidateInfor?.reference_type]}
            </Text13sb>
          </FlexBox>
          <FlexBox
            flexDirection={'column'}
            sx={{
              margin: '8px 0',
            }}
          >
            <Span>Recruit Channel</Span>
            <Text13sb>
              {candidateInfor &&
                renderReferenceValueByType(
                  candidateInfor?.reference_type,
                  candidateInfor?.reference_value
                )}
            </Text13sb>
          </FlexBox>
          <FlexBox
            flexDirection={'column'}
            sx={{
              margin: '8px 0',
            }}
          >
            <Span>Recruiter</Span>
            <Text13sb>{candidateInfor?.reference_user?.name}</Text13sb>
          </FlexBox>
          <FlexBox
            flexDirection={'column'}
            sx={{
              margin: '8px 0',
            }}
          >
            <Span>Recruit time</Span>
            <Text13sb>
              {dayjs(candidateInfor?.recruit_time).format('DD/MM/YYYY')}
            </Text13sb>
          </FlexBox>

          {candidateInfor?.description && (
            <FlexBox
              flexDirection={'column'}
              sx={{
                margin: '8px 0',
              }}
            >
              <Span>Descriptions</Span>

              <Text13sb>
                {showMore
                  ? description
                  : `${description.substring(0, MAX_LENGTH)}`}
                {isLongText && (
                  <Text13md
                    onClick={() => setShowMore(!showMore)}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {showMore ? 'See less' : 'See more'}
                  </Text13md>
                )}
              </Text13sb>
            </FlexBox>
          )}
          {candidateInfor?.attachments && (
            <FlexBox
              flexWrap={'wrap'}
              gap={'10px'}
              sx={{
                margin: '8px 0',
              }}
            >
              {attachments.map((item, idx) => (
                <Box sx={{ minWidth: '183px' }} key={idx}>
                  <ShowFile
                    name={item.document_name}
                    onClick={() => {
                      if (item) {
                        downloadOneFile(item, handleGetUrlDownload)
                      }
                    }}
                    IconEnd={<DownloadIcon />}
                  />
                </Box>
              ))}
            </FlexBox>
          )}
        </Scrollbar>
      </Box>
      {open && <CreateCandidateNoteModal open={open} setOpen={setOpen} />}
      {openHistoryCall && (
        <CreateHistoryCallModal
          open={openHistoryCall}
          setOpen={setOpenHistoryCall}
        />
      )}
    </ContainerLeft>
  )
}

export default CandidateProfile
