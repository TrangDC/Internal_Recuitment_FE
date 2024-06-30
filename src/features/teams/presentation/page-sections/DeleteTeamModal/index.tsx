import BaseModal from 'shared/components/modal'
import { FormControl } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import useTextTranslation from 'shared/constants/text'
import AppTextField from 'shared/components/input-fields/AppTextField'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonLoading from 'shared/components/buttons/ButtonLoading'
import { Fragment, useState } from 'react'
import useDeleteTeam from 'features/teams/hooks/useDeleteTeam'

interface IDeleteTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function DeleteTeamModal({ open, setOpen, id }: IDeleteTeamModal) {
  const [note, setNote] = useState('')
  const { onDelete, isPending } = useDeleteTeam({
    id: id,
    onSuccess: () => {
      setOpen(false)
    },
  })

  const translation = useTextTranslation()

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen}>
        <BaseModal.Header
          title={translation.MODLUE_TEAMS.delete_team}
          setOpen={setOpen}
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px">
          <FlexBox flexDirection={'column'} gap={2}>
            <FlexBox
              justifyContent={'center'}
              alignItems={'center'}
              marginTop={1}
            >
              <FormControl fullWidth>
                <AppTextField
                  label={'Description'}
                  size="small"
                  fullWidth
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  multiline
                  minRows={4}
                />
              </FormControl>
            </FlexBox>
          </FlexBox>
        </BaseModal.ContentMain>
        <BaseModal.Footer>
          <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
            <AppButton
              variant="outlined"
              size="small"
              onClick={() => setOpen(false)}
            >
              {translation.COMMON.cancel}
            </AppButton>
            <ButtonLoading
              variant="contained"
              size="small"
              loading={isPending}
              handlesubmit={() => onDelete({ note })}
            >
              Submit
            </ButtonLoading>
          </FlexBox>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    </Fragment>
  )
}

export default DeleteTeamModal
