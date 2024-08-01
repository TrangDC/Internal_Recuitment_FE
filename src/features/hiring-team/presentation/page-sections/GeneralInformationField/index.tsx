import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import ChipField from 'shared/components/input-fields/ChipField'
import useTextTranslation from 'shared/constants/text'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import EditIcon from 'shared/components/icons/EditIcon'
import EditTeamModal from '../EditTeamModal'
import Cant from 'features/authorization/presentation/components/Cant'
import useActionTable from 'features/hiring-team/hooks/table/useActionTable'
import { BoxWrapperContainer } from 'features/hiring-team/shared/constants/styles/style'
import useTeamHiringDetail from 'features/hiring-team/hooks/crud/useTeamHiringDetail'

const GeneralInformationField = () => {
  const { id } = useParams()
  const { teamDetail } = useTeamHiringDetail(id as string)
  const translation = useTextTranslation()
  const { handleOpenEdit, openEdit, rowId, setOpenEdit } = useActionTable()

  return (
    <BoxWrapperContainer>
      <FlexBox justifyContent={'space-between'}>
        <FlexBox flexDirection={'column'} gap={2.5}>
          <FlexBox alignItems={'baseline'} gap={6.25}>
            <Box>
              <SpanText>{translation.COMMON.name}</SpanText>
              <TinyText>{teamDetail?.name}</TinyText>
            </Box>
            <Box>
              <FlexBox></FlexBox>
              <FlexBox flexDirection={'column'}>
                <SpanText>{translation.MODLUE_TEAMS.team_manager}</SpanText>
                <FlexBox gap={'10px'} flexWrap={'wrap'}>
                  {teamDetail?.managers?.map((manager, idx) => (
                    <ChipField
                      sx={{
                        backgroundColor: '#F1F9FF',
                        '& span': {
                          fontWeight: 500,
                          fontSize: '14px',
                          color: '#121625',
                        },
                      }}
                      key={idx}
                      label={manager.name}
                    />
                  ))}
                </FlexBox>
              </FlexBox>
            </Box>
          </FlexBox>

          <FlexBox alignItems={'baseline'} gap={6.25} flexWrap={'wrap'}>
            {teamDetail?.approvers?.map((approve) => {
              return (
                <Box>
                  <SpanText>Approver {approve.order_id}</SpanText>
                  <TinyText>{approve.user.name}</TinyText>
                </Box>
              )
            })}
          </FlexBox>

          <FlexBox alignItems={'baseline'} gap={6.25}>
            <Box>
              <SpanText>Description</SpanText>
              <TinyText>{teamDetail?.description}</TinyText>
            </Box>
          </FlexBox>
        </FlexBox>
        <Box>
          <Cant
            module="HIRING_TEAMS"
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
        <EditTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
    </BoxWrapperContainer>
  )
}

export default GeneralInformationField
