import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Text13md } from 'shared/components/Typography'
import DownIcon from 'shared/components/icons/DownIcon'

type ButtonTooltipProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  title: string
}

function ButtonTooltip({ handleClick, title }: Readonly<ButtonTooltipProps>) {
  const { t } = useTranslation()
  return (
    <Button
      endIcon={
        <DownIcon sx={{ marginLeft: '-4px', width: '12px', height: '12px' }} />
      }
      sx={{
        height: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0px 5px',
        minWidth: 'auto !important',
      }}
      onClick={handleClick}
    >
      <Text13md color={'#00508A'}>{t(title)}</Text13md>
    </Button>
  )
}

export default ButtonTooltip
