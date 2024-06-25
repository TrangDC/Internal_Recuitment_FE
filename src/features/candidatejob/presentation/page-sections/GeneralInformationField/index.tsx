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

const GeneralInformationField = ({
  candidateDetail,
}: {
  candidateDetail: Candidate
}) => {
  const { id } = useParams()

  const translation = useTextTranslation()
  const { handleOpenEdit, openEdit, rowId, rowData, setOpenEdit } =
    useActionTable<Candidate>()

  const handleCopyClipBoard = (content: string) => {
    navigator.clipboard.writeText(content)
    ToastCopyClipBoard()
  }

  return (
    <DivWrapperField>
      <FlexBox justifyContent={'space-between'}>
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
          </FlexBox>
        </FlexBox>
        <Box>
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
        </Box>
      </FlexBox>
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
    </DivWrapperField>
  )
}

export default GeneralInformationField
