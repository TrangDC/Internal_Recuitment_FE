import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Fragment } from 'react'
import BaseModal from 'shared/components/modal'
import TabCustomize from 'shared/components/tab'
import DetailEmail from '../DetailEmail'
import CloseIcon from '@mui/icons-material/Close'
import HistoryLog from '../HistoryLog'
import Cant from 'features/authorization/presentation/components/Cant'
import EditIcon from 'shared/components/icons/EditIcon'

interface ITabEmailDetail {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
  handleOpenModalEdit: (id: string) => void
}

export default function TabEmailDetail({
  open,
  setOpen,
  id,
  handleOpenModalEdit,
}: ITabEmailDetail) {
  const renderItem = [
    {
      label: 'Information',
      Component: () => <DetailEmail id={id} />,
    },
    { label: 'History Log', Component: () => <HistoryLog id={id} /> },
  ]

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1200}>
        <BaseModal.Header
          title="Email template details"
          setOpen={setOpen}
          EndHeader={
            <FlexBox>
              <Cant
                module={'EMAIL_TEMPLATE'}
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
