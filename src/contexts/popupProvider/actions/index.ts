import { InitialPopupState } from '..'

export const handleSuccess = (
  payload: Pick<InitialPopupState, 'title' | 'content' | 'onSubmit'>
) => ({ type: 'success', payload })

export const handleFailed = (
  payload: Pick<InitialPopupState, 'title' | 'content' | 'onSubmit'>
) => ({ type: 'failed', payload })

export const handleWarning = (
  payload: Pick<InitialPopupState, 'title' | 'content' | 'onSubmit'>
) => ({ type: 'warning', payload })

export const handleReset = () => ({ type: 'reset' })
