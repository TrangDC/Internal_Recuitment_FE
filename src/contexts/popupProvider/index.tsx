import { createContext, ReactNode, useEffect, useReducer } from 'react'
import {
  handleFailed,
  handleReset,
  handleSuccess,
  handleWarning,
} from './actions'

export type InitialPopupState = {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  content?: string
  type: 'failed' | 'success' | 'warning'
  onSubmit?: () => void
}

// props type
type PopupProviderProps = { children: ReactNode }
// --------------------------------------------------------

const initialState: InitialPopupState = {
  open: false,
  setOpen: () => {
    console.log('open')
  },
  title: '',
  content: '',
  type: 'success',
  onSubmit: () => {
    console.log('submit')
  },
}

const reducer = (state: InitialPopupState, action: any) => {
  switch (action.type) {
    case 'success': {
      return { ...state, ...action.payload, open: true, type: 'success' }
    }
    case 'failed': {
      return { ...state, ...action.payload, open: true, type: 'failed' }
    }
    case 'warning': {
      return { ...state, ...action.payload, open: true, type: 'warning' }
    }
    case 'reset': {
      return { ...initialState }
    }
    case 'setOpen': {
      return { ...state, open: action.payload }
    }
    default: {
      return state
    }
  }
}

const PopupContext = createContext({
  ...initialState,
  dispatchPopup: () => {},
  handleSuccess: (
    payload: Pick<InitialPopupState, 'title' | 'content' | 'onSubmit'>
  ) => {},
  handleFailed: (
    payload: Pick<InitialPopupState, 'title' | 'content' | 'onSubmit'>
  ) => {},
  handleWarning: (
    payload: Pick<InitialPopupState, 'title' | 'content' | 'onSubmit'>
  ) => {},
  handleReset: () => {},
})

export const PopupProvider = ({ children }: PopupProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log("🚀 ~ PopupProvider ~ state:", state)

  const setOpen = (open: boolean) => {
    dispatch({ type: 'setOpen', payload: open })

    if(!open) {
      dispatch({type: 'reset'})
    }
  }

  type ActionCreator<T> = (payload: T) => { type: string; payload?: T }
  const wrapperDispatch = <T,>(fn: ActionCreator<T>) => {
    return (payload: T) => {
      dispatch(fn(payload))
    }
  }

  return (
    <PopupContext.Provider
      value={{
        ...state,
        dispatchPopup: dispatch,
        setOpen,
        handleSuccess: wrapperDispatch(handleSuccess),
        handleFailed: wrapperDispatch(handleFailed),
        handleWarning: wrapperDispatch(handleWarning),
        handleReset: wrapperDispatch(handleReset),
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}

export default PopupContext
