import BaseModal from 'shared/components/modal'
import { Controller } from 'react-hook-form'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { Button } from '@mui/material'
import useCreateTeam from '../providers/hooks/useCreateTeam'

interface ICreateTeamModal {
  open: boolean
  setOpen: (value: boolean) => void
}

function CreateTeamModal({ open, setOpen }: ICreateTeamModal) {
  const { onSubmit, useFormReturn } = useCreateTeam()
  const { control } = useFormReturn
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title="Create team"
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <AppTextField {...field} size="small" />}
        />
        <Controller
          name="code"
          control={control}
          render={({ field }) => <AppTextField {...field} size="small" />}
        />
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <Button onClick={onSubmit} variant="contained">
          Create
        </Button>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default CreateTeamModal
