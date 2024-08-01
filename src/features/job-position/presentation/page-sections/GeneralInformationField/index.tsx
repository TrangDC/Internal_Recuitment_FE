import { Box } from '@mui/material'
import { DivWrapperField } from 'features/job-position/shared/constants/styles/style'
import { useParams } from 'react-router-dom'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { SpanText, TinyText } from 'shared/components/form/styles'
import useTextTranslation from 'shared/constants/text'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import EditIcon from 'shared/components/icons/EditIcon'
import EditJobPositionModal from '../EditJobPositionModal'
import useJobPosition from 'features/job-position/hooks/useJobPosition'
import useActionTable from 'features/job-position/hooks/useActionTable'
import Cant from 'features/authorization/presentation/components/Cant'

const GeneralInformationField = () => {
    const { id } = useParams()
    const { job_position } = useJobPosition(id as string)
    const translation = useTextTranslation()
  
    const { handleOpenEdit, openEdit, rowId, setOpenEdit } = useActionTable()
  
    return (
      <DivWrapperField>
        <FlexBox justifyContent={'space-between'} >
          <FlexBox gap={7.5}>
            <Box>
              <SpanText>{translation.COMMON.name}</SpanText>
              <TinyText>{job_position?.name}</TinyText>
            </Box>
            <Box>
              <SpanText>Description</SpanText>
              <TinyText>{job_position?.description}</TinyText>
            </Box>
          </FlexBox>
          <Box>
            <Cant
              module="JOB_POSITION"
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
          <EditJobPositionModal
            open={openEdit}
            setOpen={setOpenEdit}
            id={rowId.current}
          />
        )}
      </DivWrapperField>
    )
}

export default GeneralInformationField