import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { IConfirmModal } from './interface'
import { v4 as uuidv4 } from 'uuid'
import BaseModal from '.'
import Scrollbar from '../ScrollBar'
import ButtonLoading from '../buttons/ButtonLoading'
import AppButton from '../buttons/AppButton'
import { H4 } from '../Typography'
import CustomWarningIcon from '../icons/warning'
const ConfirmModal: FC<IConfirmModal> = ({
  open,
  setOpen,
  title,
  listButton,
  Icon = <CustomWarningIcon />,
  maxWidth = 560,
  buttonMain,
  subContent,
  middleContent,
  content,
  handleClose,
}) => {
  const { t } = useTranslation()
  return (
    <BaseModal.Wrapper
      open={open}
      setOpen={setOpen}
      maxWidth={maxWidth}
      handleClose={handleClose}
    >
      <BaseModal.Header
        title={title}
        Icon={Icon}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <Box flex={1} display={'flex'} flexDirection={'column'}>
          <H4 color={'#0B0E1E'} marginBottom={'8px'}>
            {t(content || '')}
          </H4>
          <Scrollbar sx={{ maxHeight: '300px' }}>
            {middleContent && middleContent}
          </Scrollbar>
          <H4 color={'#0B0E1E'} marginTop={1}>
            {t(subContent || '')}
          </H4>
        </Box>
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        {listButton?.map((item) => (
          <ButtonLoading
            key={uuidv4()}
            variant="outlined"
            handlesubmit={item.handleClick}
            loading={item.isLoading ?? false}
            startIcon={item.startIcon}
            endIcon={item.endIcon}
          >
            {t(item.title)}
          </ButtonLoading>
        ))}
        {buttonMain ? (
          buttonMain.map((item) => (
            <ButtonLoading
              key={uuidv4()}
              variant="contained"
              handlesubmit={item.handleClick}
              loading={item.isLoading ?? false}
            >
              {t(item.title)}
            </ButtonLoading>
          ))
        ) : (
          <AppButton variant="contained" onClick={() => setOpen(false)}>
            {t('Confirm')}
          </AppButton>
        )}
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default ConfirmModal
