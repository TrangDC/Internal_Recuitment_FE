import { createContext, FC, ReactNode, useState, useEffect } from 'react'
import { FormState } from 'react-hook-form'
import ConfirmModal from 'shared/components/modal/ConfirmModal'
import { BaseRecord } from 'shared/interfaces/common'

export interface ConfirmableModalContextState {
  confirmOnClose: boolean
  onOpenConfirm?: () => void
}

const ConfirmableModalContext = createContext<ConfirmableModalContextState>({
  confirmOnClose: false,
})

export interface ConfirmableModalProviderProps {
  children: ReactNode
  actionCloseModal: (value: boolean) => void
  formState: FormState<BaseRecord>
}

const ConfirmableModalProvider: FC<ConfirmableModalProviderProps> = (props) => {
  const { actionCloseModal, formState } = props
  const [confirmOnClose, setConfirmOnClose] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  function onOpenConfirm() {
    if (confirmOnClose) {
      return setOpenConfirm(true)
    }
    return actionCloseModal(false)
  }

  const buttonMains = [
    {
      title: 'Discard',
      handleClick: () => {
        actionCloseModal(false)
      },
    },
  ]

  const buttonSecondary = [
    {
      title: 'Cancel',
      handleClick: () => {
        setOpenConfirm(false)
      },
    },
  ]

  useEffect(() => {
    setConfirmOnClose(formState.isDirty)
  }, [formState])
  return (
    <ConfirmableModalContext.Provider
      value={{
        confirmOnClose,
        onOpenConfirm,
      }}
    >
      {props.children}
      {openConfirm && (
        <ConfirmModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          title="Discard unsaved changes?"
          buttonMain={buttonMains}
          listButton={buttonSecondary}
        />
      )}
    </ConfirmableModalContext.Provider>
  )
}

export { ConfirmableModalContext, ConfirmableModalProvider }
