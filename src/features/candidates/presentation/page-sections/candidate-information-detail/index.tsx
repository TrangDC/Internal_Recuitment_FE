import TabCustomize from 'shared/components/tab'
import CandidateGeneral from '../CandidateGeneral'
import CandidateActivities from '../CandidateActivities'
import { ContainerMain } from '../../components/Container'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkPermissionTabCandidateDetail from 'features/candidates/permission/utils/checkPermissionTabCandidateDetail'

const CandidateInformationDetail = () => {
  const { role } = useAuthorization()
  const renderItem = [
    { label: 'General', Component: CandidateGeneral },
    { label: 'Activities', Component: CandidateActivities },
  ]
  const newTabs = checkPermissionTabCandidateDetail(role, renderItem)
  return (
    <ContainerMain
      sx={{
        border: '1px solid #e3e6eb',
      }}
    >
      <TabCustomize
        renderItem={newTabs}
        TabListProps={{
          TabIndicatorProps: {
            style: {
              backgroundColor: 'transparent',
            },
          },
        }}
        tabWrapperSx={{
          fontSize: '15px',
          color: '#4D607A',
          backgroundColor: 'white',
          '&.Mui-selected': {
            color: '#00508A',
            fontWeight: '500',
            borderBottom: 'none',
          },
        }}
        tabPanelSx={{
          borderRadius: '0px',
          boxShadow: 'none',
        }}
      ></TabCustomize>
    </ContainerMain>
  )
}

export default CandidateInformationDetail
