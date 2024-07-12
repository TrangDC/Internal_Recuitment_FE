import EmailTemplate from 'features/email/presentation/screens/email-list'
import HelmetComponent from 'shared/components/helmet'

function EmailPage() {
  return (
    <HelmetComponent title='[TREC] Email notification setting'>
       <EmailTemplate />
    </HelmetComponent>
  )
}
export default EmailPage
