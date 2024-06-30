import { Box } from '@mui/material'
import { H3, Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { DivField, DivWrapperField } from '../../providers/styles'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import useTextTranslation from 'shared/constants/text'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import EditIcon from 'shared/components/icons/EditIcon'
import { Candidate } from 'features/candidates/domain/interfaces'
import useActionTable from 'features/candidates/presentation/providers/hooks/useActionTable'
import EditCandidateModal from 'features/candidates/presentation/page-sections/EditCandidateModal'
import CopyIcon from 'shared/components/icons/CopyIcon'
import { ToastCopyClipBoard } from 'shared/components/toast/toastCopyClipBoard'
import { BtnPrimary } from 'shared/styles'
import CandidateInformationModal from '../CandidateInformationModal'
import { useMemo } from 'react'
import { ChipLimit } from 'shared/components/chip-stack'

const GeneralInformationField = ({
  candidateDetail,
}: {
  candidateDetail: Candidate
}) => {
  const { id } = useParams()

  const translation = useTextTranslation()
  const {
    handleOpenEdit,
    openEdit,
    rowId,
    setOpenEdit,
    openDetail,
    setOpenDetail,
    handleOpenDetail,
  } = useActionTable<Candidate>()

  const handleCopyClipBoard = (content: string) => {
    navigator.clipboard.writeText(content)
    ToastCopyClipBoard({
      type: 'success',
    })
  }

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
    <DivWrapperField>
      <FlexBox justifyContent={'space-between'} gap={1} flexWrap={'wrap'}>
        <FlexBox flexDirection={'column'} gap={'15px'}>
          <H3 sx={{ fontSize: '15px', lineHeight: '18.29px' }}>
            {candidateDetail.name}
          </H3>
          <FlexBox gap={'60px'}>
            <DivField>
              <FlexBox alignItems={'flex-end'} gap={'10px'}>
                <Box>
                  <Span sx={{ fontSize: '12px' }}>Nationality</Span>
                  <Tiny>{candidateDetail.country} </Tiny>
                </Box>
              </FlexBox>
            </DivField>
            <DivField>
              <FlexBox alignItems={'flex-end'} gap={'10px'}>
                <Box>
                  <Span sx={{ fontSize: '12px' }}>
                    {translation.COMMON.email}
                  </Span>
                  <Tiny>{candidateDetail.email} </Tiny>
                </Box>
                <Box lineHeight={0}>
                  <CopyIcon
                    sx={{
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onClick={() => {
                      handleCopyClipBoard(candidateDetail.email)
                    }}
                  />
                </Box>
              </FlexBox>
            </DivField>
            <DivField>
              <FlexBox alignItems={'flex-end'} gap={'10px'}>
                <Box>
                  <Span sx={{ fontSize: '12px' }}>
                    {translation.COMMON.phone_number}
                  </Span>
                  <Tiny>{candidateDetail.phone}</Tiny>
                </Box>
                <Box lineHeight={0}>
                  <CopyIcon
                    sx={{
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onClick={() => {
                      handleCopyClipBoard(candidateDetail.phone)
                    }}
                  />
                </Box>
              </FlexBox>
            </DivField>
            <DivField>
              <Span sx={{ fontSize: '12px' }}>{translation.COMMON.dob}</Span>
              <Tiny>
                {candidateDetail.dob &&
                  format(new Date(candidateDetail.dob), 'dd/MM/yyyy')}
              </Tiny>
            </DivField>
            <DivField>
              <Span sx={{ fontSize: '12px' }}>
                {translation.COMMON.created_date}
              </Span>
              <Tiny>
                {candidateDetail?.created_at &&
                  format(
                    new Date(candidateDetail?.created_at),
                    'HH:mm, dd/MM/yyyy'
                  )}
              </Tiny>
            </DivField>
            <DivField>
              <Span sx={{ fontSize: '12px' }}>Candidate skills</Span>
              <Box>
                <ChipLimit chips={candidate_skills} limit={2} />
              </Box>
            </DivField>
          </FlexBox>
        </FlexBox>
        <FlexBox alignItems={'center'} gap={'8px'}>
          <BtnPrimary onClick={() => handleOpenDetail(id as string)}>
            <Span>View profile</Span>
          </BtnPrimary>
          <ButtonAdd
            Icon={EditIcon}
            textLable={'Edit'}
            icon_style={{
              '& path': {
                fill: 'white',
              },
            }}
            onClick={() => {
              handleOpenEdit(id as string)
            }}
          />
        </FlexBox>
      </FlexBox>
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}

      {openDetail && (
        <CandidateInformationModal
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          handleOpenEdit={handleOpenEdit}
        />
      )}
    </DivWrapperField>
  )
}

export default GeneralInformationField
