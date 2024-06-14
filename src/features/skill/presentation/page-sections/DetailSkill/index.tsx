import BaseModal from 'shared/components/modal'
import { Box, FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useGetSkill from '../../providers/hooks/useGetSkill'
import Scrollbar from 'shared/components/ScrollBar'
import { Text13md, Tiny12md } from 'shared/components/Typography'
import { innerHTMLTextArea } from 'shared/components/genarateInnerHTML'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from 'shared/components/icons/EditIcon'

interface IDetailSkillModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  handleOpenEdit: (value: string) => void,
}

function DetailSkillModal({ open, setOpen, id, handleOpenEdit }: IDetailSkillModal) {
  const { formData  } = useGetSkill({
    id: id,
  })

  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <Box>
        <BaseModal.Header
          title={'Skill details'}
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
          <Box padding={2}>
            <FlexBox flexDirection={'column'} gap={2}>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <Tiny12md color={'grey.500'}>Name</Tiny12md>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <Text13md color={'grey.900'} fontWeight={600}>
                        {formData?.name}
                      </Text13md>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
              <FlexBox gap={2}>
                <FormControl fullWidth>
                  <Box>
                    <Tiny12md color={'grey.500'}>Description</Tiny12md>
                    <FlexBox
                      alignItems={'center'}
                      gap={1}
                      width={'100%'}
                      marginTop={1}
                    >
                      <Text13md color={'grey.900'} fontWeight={600}>
                        {innerHTMLTextArea(formData?.description ?? '')}
                      </Text13md>
                    </FlexBox>
                  </Box>
                </FormControl>
              </FlexBox>
            </FlexBox>
          </Box>
        </Scrollbar>
      </Box>
    </BaseModal.Wrapper>
  )
}

export default DetailSkillModal