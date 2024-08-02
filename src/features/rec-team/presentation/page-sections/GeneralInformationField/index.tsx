import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useTextTranslation from 'shared/constants/text'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import EditIcon from 'shared/components/icons/EditIcon'
import Cant from 'features/authorization/presentation/components/Cant'
import useActionTable from 'features/hiring-team/hooks/table/useActionTable'
import { BoxWrapperContainer } from 'features/hiring-team/shared/constants/styles/style'
import useRecTeamDetail from 'features/rec-team/hooks/crud/useRecTeamDetail'
import EditRecTeamModal from '../EditRecModal'

const GeneralInformationField = () => {
  const { id } = useParams()
  const { rec_team_detail } = useRecTeamDetail(id as string)

  const translation = useTextTranslation()
  const { handleOpenEdit, openEdit, rowId, setOpenEdit } = useActionTable()

  return (
    <BoxWrapperContainer>
      <FlexBox justifyContent={'space-between'}>
        <FlexBox flexDirection={'column'} gap={2.5}>
          <FlexBox alignItems={'baseline'} gap={6.25}>
            <Box>
              <SpanText>{translation.COMMON.name}</SpanText>
              <TinyText>{rec_team_detail?.name}</TinyText>
            </Box>
            <Box>
              <FlexBox></FlexBox>
              <FlexBox flexDirection={'column'}>
                <SpanText>Leader</SpanText>
                <TinyText>{rec_team_detail?.leader?.name}</TinyText>
              </FlexBox>
            </Box>
          </FlexBox>

          <FlexBox alignItems={'baseline'} gap={6.25}>
            <Box>
              <SpanText>Description</SpanText>
              <TinyText>{rec_team_detail?.description}</TinyText>
            </Box>
          </FlexBox>
        </FlexBox>
        <Box>
          <Cant
            module="REC_TEAMS"
            checkBy={{
              compare: 'hasAny',
              permissions: [
                'EDIT.everything',
                'EDIT.ownedOnly',
                'EDIT.teamOnly',
              ],
            }}
          >
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
          </Cant>
        </Box>
      </FlexBox>
      {openEdit && (
        <EditRecTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
    </BoxWrapperContainer>
  )
}

export default GeneralInformationField
