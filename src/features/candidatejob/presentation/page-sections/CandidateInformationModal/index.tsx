import BaseModal from 'shared/components/modal'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetCandidateDetail from '../../providers/hooks/useCandidateDetail'
import Scrollbar from 'shared/components/ScrollBar'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from 'shared/components/icons/EditIcon'
import { TextLabel, TextValue } from '../../providers/styles'
import dayjs from 'dayjs'
import { CANDIDATE_SOURCE_LABEL } from 'shared/components/autocomplete/candidate-source-auto-complete'
import { renderReferenceValueByType } from 'features/auditTrails/presentation/providers/helper'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { downloadOneFile } from '../../providers/helper'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { useMemo } from 'react'
import { ChipLimit } from 'shared/components/chip-stack'

interface ICandidateInformationModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  handleOpenEdit: (value: string) => void
}

function CandidateInformationModal({
  open,
  setOpen,
  id,
  handleOpenEdit,
}: ICandidateInformationModal) {
  const { candidateDetail } = useGetCandidateDetail(id)
  const { handleGetUrlDownload } = useGetUrlGetAttachment()

  const candidate_skills = useMemo(() => {
    if (!candidateDetail.entity_skill_types) return []

    const skill_types = candidateDetail.entity_skill_types
    return skill_types
      ? skill_types.flatMap((type) => {
          return type.entity_skills.map((skill) => skill.name)
        })
      : []
  }, [candidateDetail])

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <Box>
        <BaseModal.Header
          title={'Candidate profile'}
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
            <FlexBox flexDirection={'column'} gap={2}>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Nationality</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {candidateDetail?.country}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Name</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {candidateDetail.name}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Phone number</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {candidateDetail.phone}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>

              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Email</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {candidateDetail.email}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>DOB</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {dayjs(candidateDetail.dob).format('DD/MM/YYYY')}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Candidate Source</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {CANDIDATE_SOURCE_LABEL[candidateDetail.reference_type]}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Recruit chanel</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {renderReferenceValueByType(candidateDetail.reference_type, candidateDetail.reference_value)}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Recruiter</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {candidateDetail.reference_user?.name}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Recruit time</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {dayjs(candidateDetail.recruit_time).format('DD/MM/YYYY')}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Candidate skills</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                      <ChipLimit chips={candidate_skills} />
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <TextLabel>Description</TextLabel>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <TextValue fontWeight={600}>
                        {candidateDetail.description}
                      </TextValue>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                <FlexBox flexWrap={'wrap'} gap={'10px'}>
                  {candidateDetail.attachments.map((item, idx) => {
                    return (
                      <Box sx={{ minWidth: '183px' }} key={idx}>
                        <ShowFile
                          name={item.document_name}
                          IconEnd={
                            <DownloadIcon
                              onClick={() => {
                                downloadOneFile(item, handleGetUrlDownload)
                              }}
                            />
                          }
                        />
                      </Box>
                    )
                  })}
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

export default CandidateInformationModal
