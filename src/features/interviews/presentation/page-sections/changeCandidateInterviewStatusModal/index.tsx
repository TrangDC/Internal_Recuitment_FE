import ConfirmModal from 'shared/components/modal/ConfirmModal'
import { UpdateCandidateInterviewStatusInput } from 'features/calendars/domain/interfaces'
import useChangeInterviewStatus from 'features/calendars/hooks/useChangeInterviewStatus'
import useGraphql from 'features/interviews/domain/graphql/graphql'

interface ICreateInterviewModal {
  id: string
  open: boolean
  setOpen: (value: boolean) => void
  onSuccess?: () => void
  updateTo: 'done' | 'cancelled'
}

function ChangeCandidateInterviewStatusModal({
  open,
  setOpen,
  onSuccess,
  id,
  updateTo,
}: ICreateInterviewModal) {
  const { updateCandidateInterviewStatus, queryKey } = useGraphql()
  const { useEditReturn, handleChangeStatus } =
    useChangeInterviewStatus<UpdateCandidateInterviewStatusInput>({
      id: id,
      editBuildQuery: updateCandidateInterviewStatus,
      queryKey: [queryKey],
      onSuccess: () => {
        setOpen(false)
        onSuccess?.()
      },
    })
  const { isPending } = useEditReturn

  return (
    <ConfirmModal
      open={open}
      setOpen={setOpen}
      title={`Do you want to ${updateTo} this interview?`}
      listButton={[
        {
          title: 'Cancel',
          handleClick: () => setOpen(false),
        },
      ]}
      buttonMain={[
        {
          title: 'Confirm',
          isLoading: isPending,
          handleClick() {
            handleChangeStatus({
              status: updateTo,
            })
          },
        },
      ]}
    />
  )
}

export default ChangeCandidateInterviewStatusModal
