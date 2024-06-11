import SettingList from 'features/setting/presentation/screens/setting-list'
import HelmetComponent from 'shared/components/helmet'

function SettingPage() {
  return (
    <HelmetComponent title='[TREC] Settings'>
       <SettingList />
    </HelmetComponent>
  )
  
}
export default SettingPage
