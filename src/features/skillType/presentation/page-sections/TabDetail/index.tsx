import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Fragment } from 'react'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import CloseIcon from '@mui/icons-material/Close'
import HistoryLog from '../HistoryLog'
import Cant from 'features/authorization/presentation/components/Cant'
import EditIcon from 'shared/components/icons/EditIcon'
import DetailSkillType from '../DetailSkillType'

interface ITabSkillTypeDetail {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  handleOpenModalEdit: (id: string) => void
}

export default function TabSkillTypeDetail({
  open,
  setOpen,
  id,
  handleOpenModalEdit,
}: ITabSkillTypeDetail) {
  const renderItem = [
    {
      label: 'Information',
      Component: () => <DetailSkillType id={id} />,
    },
    { label: 'History Log', Component: () => <HistoryLog id={id} /> },
  ]

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1200}>
        <BaseModal.Header
          title="Skill type details"
          setOpen={setOpen}
          EndHeader={
            <FlexBox>
              <Cant
                module={'SKILL_TYPES'}
                checkBy={{
                  compare: 'hasAny',
                  permissions: [
                    'EDIT.everything',
                    'EDIT.ownedOnly',
                    'EDIT.teamOnly',
                  ],
                }}
              >
                <EditIcon
                  sx={{
                    height: '24px',
                    width: '24px',
                    color: '#82868C',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setOpen(false)
                    handleOpenModalEdit(id)
                  }}
                />
              </Cant>
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
        <BaseModal.ContentMain maxHeight="500px" sxContentMain={{ padding: 0 }}>
          <Box sx={{ width: '100%' }}>
            <TabCustomize
              renderItem={renderItem}
              TabListProps={{ orientation: 'vertical' }}
            />
          </Box>
        </BaseModal.ContentMain>
      </BaseModal.Wrapper>
    </Fragment>
  )
}
