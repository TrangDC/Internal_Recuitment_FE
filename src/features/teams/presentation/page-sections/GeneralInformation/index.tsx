import { Box } from '@mui/material'
import { BoxWrapperContainer } from 'features/teams/presentation/providers/styles/style'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import ChipField from 'shared/components/input-fields/ChipField'
import useTeamDetail from '../../providers/hooks/useTeamDetail'
import useTextTranslation from 'shared/constants/text'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import EditIcon from 'shared/components/icons/EditIcon'
import useActionTable from '../../providers/hooks/useActionTable'
import EditTeamModal from '../EditTeamModal'

const GeneralInformation = () => {
  const { id } = useParams()
  const { teamDetail } = useTeamDetail(id as string);
  const translation = useTextTranslation();

  const {
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable()

  return (
    <BoxWrapperContainer>
      <FlexBox justifyContent={'space-between'}>
      <FlexBox flexDirection={'column'} gap={'20px'}> 
        <Box>
          <SpanText>{translation.COMMON.name}</SpanText>
          <TinyText>{teamDetail?.name}</TinyText>
        </Box>
        <Box>
          <FlexBox>
          </FlexBox>
          <FlexBox flexDirection={'column'}>
            <SpanText>{translation.MODLUE_TEAMS.team_manager}</SpanText>
            <FlexBox gap={'10px'} flexWrap={'wrap'}>
                {teamDetail?.members?.map((member, idx) =>  <ChipField sx={{
                  backgroundColor: '#F1F9FF',
                  '& span': {
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#121625'
                  }
                }} key={idx} label={member.name} />)}
            </FlexBox>
          </FlexBox>
        </Box>
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
                handleOpenEdit(id as string, teamDetail)
              }}
            />
      </Box>
      </FlexBox>
      {openEdit && (
        <EditTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
    </BoxWrapperContainer>
  )
}

export default GeneralInformation
