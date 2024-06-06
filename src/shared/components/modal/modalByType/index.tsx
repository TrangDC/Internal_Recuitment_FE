import FailedModal from '../modalFailed'
import SuccessModal from '../modalSuccess'
import WarningModal from '../modalWarning'

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  content?: string
  type: 'failed' | 'success' | 'warning'
  onSubmit?: () => void
}

export type ModalType = {
  content: string
  type: 'failed' | 'success'
  open: boolean
  title: string
  onSubmit?: () => void
}

const ModalConfirmType = ({
  type,
  content = '',
  onSubmit,
  ...props
}: Props) => {
  switch (type) {
    case 'failed':
      return <FailedModal {...props} content={content} />
    case 'success':
      return <SuccessModal {...props} onSubmit={onSubmit} />
    case 'warning':
      return <WarningModal {...props} content={content} onSubmit={onSubmit} />
    default:
      return <div>Modal is not valid</div>
  }
}

export default ModalConfirmType
