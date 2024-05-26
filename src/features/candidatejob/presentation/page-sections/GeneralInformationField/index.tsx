import { Box, Grid, styled } from '@mui/material'
import { H3, Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { DivField } from '../../providers/styles'
import useCandidateDetail from '../../providers/hooks/useCandidateDetail'
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

const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const GeneralInformationField = ({candidateDetail}: {candidateDetail: Candidate}) => {
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FlexBox justifyContent={'space-between'}>
            <H3>{candidateDetail.name}</H3>
            <ButtonAdd
              Icon={EditIcon}
              textLable={'Edit'}
              icon_style={{
                '& path': {
                  fill: 'white',
                },
              }}
              onClick={() => {
                handleOpenEdit(id as string, candidateDetail)
              }}
            />
          </FlexBox>
        </Grid>
        <Grid item xs={12}>
          <FlexBox gap={'60px'}>
            <DivField>
              <FlexBox alignItems={'flex-end'} gap={'10px'}>
                <Box>
                  <Span>{translation.COMMON.email}</Span>
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
                  <Span>{translation.COMMON.phone_number}</Span>
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
              <Span>{translation.COMMON.dob}</Span>
              <Tiny>
                {candidateDetail.dob &&
                  format(new Date(candidateDetail.dob), 'dd/MM/yyyy')}
              </Tiny>
            </DivField>
          </FlexBox>
        </Grid>
      </Grid>
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
    </DivWrapperField>
  )
}

export default GeneralInformationField
