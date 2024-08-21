import HistoryLogAuditTrails from 'features/auditTrails/presentation/page-sections/HistoryLog'
import AppButton from 'shared/components/buttons/AppButton'
import FlexBox from 'shared/components/flexbox/FlexBox'
import BaseModal from 'shared/components/modal'
import useTextTranslation from 'shared/constants/text'

interface DetailCandidateHistoryCallModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  id: string
}

function DetailCandidateHistoryCallModal({
  open,
  setOpen,
  id,
}: DetailCandidateHistoryCallModalProps) {
  const translation = useTextTranslation()
  return (
    <BaseModal.Wrapper open={open} setOpen={setOpen}>
      <BaseModal.Header
        title={'History log'}
        setOpen={setOpen}
      ></BaseModal.Header>
      <BaseModal.ContentMain>
        <HistoryLogAuditTrails module="candidate_history_calls" id={id} />
      </BaseModal.ContentMain>
      <BaseModal.Footer>
        <FlexBox gap={'10px'} justifyContent={'end'} width={'100%'}>
          <AppButton
            variant="outlined"
            size="small"
            onClick={() => setOpen(false)}
          >
            {translation.COMMON.cancel}
          </AppButton>
        </FlexBox>
      </BaseModal.Footer>
    </BaseModal.Wrapper>
  )
}

export default DetailCandidateHistoryCallModal
