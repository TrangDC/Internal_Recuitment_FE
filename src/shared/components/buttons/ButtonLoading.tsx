import { LoadingButton } from '@mui/lab'
import AppButton from './AppButton'
import { FC, ReactNode } from 'react'
import { ButtonProps } from '@mui/material'
import { t } from 'i18next'
interface IButtonLoading extends ButtonProps {
  handlesubmit: () => void
  loading: boolean
  children: ReactNode
}
const ButtonLoading: FC<IButtonLoading> = (props) => {
  const { handlesubmit, loading, children, ...other } = props
  return (
    <>
      {loading ? (
        <LoadingButton
          data-testid="btn-submit"
          variant="contained"
          size="small"
          loading
          disabled
        >
          Please wait...
        </LoadingButton>
      ) : (
        <AppButton
          data-testid="btn-submit"
          variant="contained"
          onClick={handlesubmit}
          {...other}
        >
          {typeof children === 'string' ? t(children) : children}
        </AppButton>
      )}
    </>
  )
}
export default ButtonLoading
