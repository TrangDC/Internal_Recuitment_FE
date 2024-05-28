import FailedModal from '../modalFailed'
import SuccessModal from '../modalSuccess'

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  content?: string
  type: 'failed' | 'success'
  onSubmit?: () => void
}

export type ModalType = {
    content: string,
    type: 'failed' | 'success',
    open: boolean,
    title: string,
    onSubmit?: () => void,
}

const ModalConfirmType = ({ type, content = '', onSubmit, ...props }: Props) => {
    switch (type) {
    case 'failed':
      return <FailedModal {...props} content={content} />
    case 'success':
      return <SuccessModal {...props} onSubmit={onSubmit}/>
  }
}

export default ModalConfirmType
