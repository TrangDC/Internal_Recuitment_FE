import BaseModal from 'shared/components/modal'
import { Box, Button, Grid } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { CustomeButtonCancel } from 'shared/components/form/styles'
import useTextTranslation from 'shared/constants/text'
import AppTextField from 'shared/components/input-fields/AppTextField'
import React, { useState } from 'react'

interface IEditRecord {
  children: string | React.ReactNode,
  callbackSubmit?: (reason: string) => void;
}

function UpdateRecord({
  children,
  callbackSubmit,
}: IEditRecord) {
  const translation = useTextTranslation()
  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setReason(e.target.value)
  }

  const handleSubmit = () => {
    callbackSubmit && callbackSubmit(reason)
    setOpen(false)
  }

  return (
    <>
      <Box onClick={handleOpenModal}>{children}</Box>
      <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={600}>
        <BaseModal.Header
          title={translation.COMMON.update_record}
          setOpen={setOpen}
          subTitle={translation.COMMON.sub_title_update_record}
        ></BaseModal.Header>
        <Box maxHeight="500px" sx={{padding: '20px 30px'}}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <AppTextField
                  label={translation.COMMON.description}
                  fullWidth
                  multiline
                  minRows={2}
                  onChange={handleChangeReason}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <BaseModal.Footer>
          <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
            <CustomeButtonCancel
              type="button"
              variant="contained"
              onClick={() => setOpen(false)}
              sx={{width: '50%'}}
            >
              {translation.COMMON.cancel}
            </CustomeButtonCancel>
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{width: '50%'}}
              onClick={handleSubmit}
            >
              {translation.COMMON.save}
            </Button>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </>
  )
}

export default UpdateRecord
