import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AppButton from 'shared/components/buttons/AppButton'
import ButtonEdit from 'shared/components/buttons/buttonEdit'
import CustomWarningIcon from 'shared/components/icons/warning'
import BaseModal from 'shared/components/modal'
import useStoreData, {
  StorageFilter,
} from 'shared/components/table/hooks/useStoreData'
import { H4 } from 'shared/components/Typography'

type ConfirmUpdateModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  onConfirm: (note: string) => void
  loading: boolean
  roleId: string
  name: string
}

type UserFilter = {
  role_id: string[]
}

function ConfirmUpdateModal(props: ConfirmUpdateModalProps) {
  const { open, setOpen, onConfirm, loading, roleId, name } = props
  const navigate = useNavigate()
  const { handleFilterStorage } = useStoreData()

  function handleNavigateToUser() {
    const newData: StorageFilter<UserFilter> = {
      filter: {
        role_id: [
          {
            label: name,
            value: roleId,
          },
        ],
      },
      search: {
        name: '',
      },
    }
    handleFilterStorage('users', newData)
    navigate('/dashboard/users')
  }
  return (
    <BaseModal.Wrapper
      open={open}
      setOpen={setOpen}
      maxWidth={700}
      handleClose={() => setOpen(false)}
    >
      <BaseModal.Header
        title={'Update confirmation'}
        Icon={<CustomWarningIcon />}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <Box flex={1} display={'flex'} flexDirection={'column'}>
          <H4 color={'#0B0E1E'} marginBottom={'8px'}>
            This role’s permission is applied to users. Do you want to: Also
            update permission for the related user according to the changes in
            this role’s permission
          </H4>
        </Box>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <AppButton
          variant="outlined"
          size="small"
          onClick={handleNavigateToUser}
        >
          Related users
        </AppButton>
        <ButtonEdit
          loading={loading}
          data-testid="btn-submit"
          handlesubmit={onConfirm}
          disabled={false}
        >
          Submit
        </ButtonEdit>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ConfirmUpdateModal
