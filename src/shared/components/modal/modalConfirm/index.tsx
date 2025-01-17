import BaseModal from 'shared/components/modal'
import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import React, { useState } from 'react'
import WarningIcon from 'shared/components/icons/WarningIcon'
import AppButton from 'shared/components/buttons/AppButton'
import { TinyText } from 'shared/components/form/styles'

interface IEditRecord {
  children: string | React.ReactNode
  callbackSubmit?: () => void
  title: string
  disabled?: boolean
}

function ModalConfirm({
  children,
  callbackSubmit,
  title,
  disabled = false,
}: IEditRecord) {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenModal = () => {
    !disabled && setOpen(true)
  }

  const handleSubmit = () => {
    callbackSubmit && callbackSubmit()
    setOpen(false)
  }

  return (
    <>
      <Box onClick={handleOpenModal}>{children}</Box>
      <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={600}>
        <BaseModal.Header
          title={'Warning'}
          setOpen={setOpen}
          Icon={<WarningIcon />}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2}>
            <FlexBox
              justifyContent={'center'}
              alignItems={'center'}
              marginTop={1}
            >
              <TinyText sx={{ fontSize: 15, width: '100%' }}>
                {title}
              </TinyText>
            </FlexBox>
          </FlexBox>
        </BaseModal.ContentMain>
        <BaseModal.Footer>
          <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
            <AppButton
              variant="outlined"
              size="small"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#2499EF !important',
                color: 'white !important',
              }}
            >
              OK
            </AppButton>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </>
  )
}

export default ModalConfirm
